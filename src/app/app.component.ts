import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ANAMNESES } from 'src/db-data';
import { Anamnese } from './model/anamnese'
import { AnamneseForm as AnamneseForm } from './model/anamnese-form';
import { SwUpdate } from '@angular/service-worker';

import { AnamneseService } from './services/anamnese.service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { APP_VERSION } from '../app-version';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-anamnese';
  version = APP_VERSION;
  isVideo : boolean = false;
  private swUpdate = inject(SwUpdate);
	needToReload = false;
	swDownloadInProgress = false;
	startPeriodicalUpdateCheck: any = null; // Needed for unit testing
  popupText = '';
	showReloadConfirmationPopup = false;
  readonly FIRST_UPDATE_CHECK = 20 * 1000; // 20 seconds
  readonly UPDATE_CHECK_INTERVAL =  1 * 60 * 1000; // 1 minute

  anamneses = ANAMNESES;
  progresso: number = 0;
  anamneseForm: AnamneseForm = new AnamneseForm();
  anamneseResult: any = [];
  anamneseBackup: any = [];
  texto: string = '';
  numero: string = '';
  data: string = '';
  email: string = '';
  telefone: string = '';
  cpf: string = '';
  escala: number = 5;
  usuarioNome: string = '';
  usuarioCpf: string = '';
  checkboxes = this._formBuilder.group({
    opcao1: false,
    opcao2: false,
    opcao3: false,
    opcao4: false,
    opcao5: false,
    opcao6: false,
    opcao7: false,
    opcao8: false,
    opcao9: false,
  });

  isOpcaoTexto: boolean = false;
  isSim: boolean = false;
  isNao: boolean = false;
  isNaoSei: boolean = false;
  endereco_logradouro: string = '';
  endereco_numero: string = '';
  endereco_complemento: string = '';
  endereco_bairro: string = '';
  endereco_cidade: string = '';
  endereco_uf: string = '';
  endereco_cep: string = '';

  lastDownloadedVideo: string = '';

  /**
	 * Constructor
	 *
	 * @param anamneseService service that handles all Anamnese related tasks
   */
	constructor(
    public anamneseService: AnamneseService,
    private _formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    /* istanbul ignore next */
  }

	ngOnInit() {
    console.log('[AppComponent] =============== Initializing app ===============');
    this.onRecomecar();
    // Catch update related events
    if (window.location.hostname === 'localhost') {
      console.log('Running on localhost domain - skipping Service Worker update checks!');
    } else {
      console.log('Not running on localhost domain - starting Service Worker update checks!');
      this.swUpdate.versionUpdates.subscribe((event) => {
			switch (event.type) {
				case 'VERSION_DETECTED':
					console.log(`[AppComponent] New Service Worker version detected. Downloading ...`);
					this.swDownloadInProgress = true;
					break;

				case 'VERSION_READY':
					console.log(`[AppComponent] New Service Worker version is ready to use. Asking user to reload ...`);
					this.needToReload = true;
					this.popupText = 'Uma nova versão do questionário está disponível. Por favor, recarregue a página para concluir a atualização do software!';
					this.showReloadConfirmationPopup = true;
					this.swDownloadInProgress = false;
					break;

				/* istanbul ignore next */
				case 'VERSION_INSTALLATION_FAILED':
					console.log(`[AppComponent] Failed to install new Service Worker!`);
					break;
			  }
      });

      /* istanbul ignore next */
      this.swUpdate.unrecoverable.subscribe((event) => {
        console.log(`[AppComponent] An error occured during Service Worker update. Please reload the app manually!`);
      });

      // Check for new Service Worker after FIRST_UPDATE_CHECK ms and then periodically after
      // every UPDATE_CHECK_INTERVAL ms
      this.startPeriodicalUpdateCheck = () => {
        timer(this.FIRST_UPDATE_CHECK, this.UPDATE_CHECK_INTERVAL).subscribe(async () => {
          if (this.swDownloadInProgress) {
            console.log(`[AppComponent] Skipping Service Worker update check. Download in progress!`);
            return;
          }

          /* istanbul ignore next */
          try {
            // According to the spec, a service worker will not run after the user did a hard refresh
            // (SHIFT-F5).This strange behavior also means that we can't start the
            // update check for the Service Worker. There is a workaround described here, on how to
            // un-register and then re-register the Service Worker after a hard reload in order to get
            // running:
            // See https://stackoverflow.com/questions/51597231/register-service-worker-after-hard-refresh
            // Nevertheless the Service Worker doesn't seem to run as it should after this procedure. Even
            // though it should then be registered, notification popups don't work. There is an error telling
            // that there is no Service Worker registration. So the only way to get it working properly is,
            // to ask the user to reload again after SHIFT-F5 (hard reload) was pressed. Very ugly!
            if (!navigator.serviceWorker.controller) {
              console.log(`[AppComponent] Service Worker is not running! User probably did a hard refresh (SHIFT-F5)!`);
              console.log(`[AppComponent] Unregistering existing Service Worker ...`);
              const registrations = await navigator.serviceWorker.getRegistrations();
              await Promise.all(registrations.map((r) => r.unregister()));

              console.log(`[AppComponent] Trying to re-registering Service Worker ...`);
              const registration = await navigator.serviceWorker.register('ngsw-worker.js');

              if (registration) {
                console.log(`[AppComponent] Successfully re-registered Service Worker.`);
                console.log(
                  `[AppComponent] Service Worker is not fully functional yet (e.g. popups don't work)! Asking user to reload ...`
                );
                //this.needToReload = true;
                //this.popupText = 'Por favor, recarregue a página para concluir a atualização do software!';
                //this.showReloadConfirmationPopup = true;
              } else {
                console.log(`[AppComponent] Failed to re-register Service Worker.`);
                return;
              }
            }

            console.log(`[AppComponent] Checking for Service Worker update ...`);

            this.swUpdate.checkForUpdate().then((updateFound) => {
              if (!updateFound) {
                console.log(
                  `[AppComponent] Service Worker is up to date${
                    this.needToReload ? ' (reload pending!!)' : ''
                  }. Next check in ${this.UPDATE_CHECK_INTERVAL / 60000} minutes.`
                );
              } else {
                // Don't do anything if a new Service Worker update was already
                // signaled by an event. The problem is that after doing a hard reload
                // (SHIFT-F5) and then re-registering the Service Worker, the events do not
                // fire (only after F5). In that case we handle the update here.
                if (!this.swDownloadInProgress && !this.needToReload) {
                  console.log(`[AppComponent] Downloaded new Service Worker version. Asking user to reload ...`);
                  this.needToReload = true;
                  this.popupText = 'Por favor, recarregue a página para concluir a atualização do software!';
                  this.showReloadConfirmationPopup = true;
                }
              }
            });
          } catch (err) {
            console.log(`[AppComponent] Failed to check for Service Worker update: ${err}`);
          }
        });
      };

      this.startPeriodicalUpdateCheck();
    }
	}

	/* istanbul ignore next */
	reloadPage = () => {
		// Need for unit testing
		location.reload();
	};

	/**
	 * Handle result of Service Worker update popup
	 * @param event Service Worker update popup result
	 */
	handleServiceWorkerUpdatePopupResult(event: any): void {
		if (event.confirm) {
			console.log('[AppComponent] User confirmed app reload.');
			this.reloadPage();
		} else {
			console.log('[AppComponent] User denied app reload.');
			this.showReloadConfirmationPopup = false;
		}
	}

  findAnamneseById(id:number) {
    return ANAMNESES.find((anamnese: { id: number; }) => anamnese.id === id);
  }

  onRecomecar() : void {
    console.log('onRecomecar');
    this.progresso = 0;
    this.anamneseForm = new AnamneseForm(this.anamneses[0]);
    this.isVideo = this.anamneseForm.video.includes('.mp4');
    this.anamneseResult = [];
    this.anamneseBackup = [];
    this.usuarioNome = '';
    this.usuarioCpf = '';
    this.reset();

    // TESTS
    //this.anamneseService.getAnamneses().subscribe(data => {
    //    let anam:Anamnese[] = data;
    //    console.log(JSON.stringify(anam));
    //});
  }

  reset() : void {
    this.texto = '';
    this.cpf = '';
    this.numero = '';
    this.data = '';
    this.email = '';
    this.telefone = '';
    this.escala = 5;
    this.checkboxes.setValue({opcao1: false, opcao2: false, opcao3: false, opcao4: false, opcao5: false, opcao6: false, opcao7: false, opcao8: false, opcao9: false});
    this.isOpcaoTexto = false;
    this.isSim = false;
    this.isNao = false;
    this.isNaoSei = false;
    this.endereco_logradouro = '';
    this.endereco_numero = '';
    this.endereco_complemento = '';
    this.endereco_bairro = '';
    this.endereco_cidade = '';
    this.endereco_uf = '';
    this.endereco_cep = '';
  }

  salvar() : void {
    console.log('Salvando registro: \n' + JSON.stringify(this.anamneseResult));
    const anamnese = new Anamnese();
    anamnese.name = encodeURIComponent(this.usuarioNome);
    anamnese.cpf = encodeURIComponent(this.usuarioCpf);
    anamnese.answers = encodeURIComponent(JSON.stringify(this.anamneseResult));
    this.anamneseService.addAnamnese(anamnese).subscribe(() => {
    //alert("Anamnese salva com sucesso!");
    console.log('Anamnese salva com sucesso!');
    });
  }

  updateBackup(id:number, confidential: number, answer:string) : void {
    var question = {
        id: id,
        confidential: confidential,
        answer: answer
    };

    const indexToReplace = this.anamneseBackup.findIndex((a: { id: number; }) => a.id === id);
    if (indexToReplace !== -1) {
      this.anamneseBackup.splice(indexToReplace, 1, question);
    } else {
      this.anamneseBackup.push(question);
    }
  }

  updateAnamnese(id:number, confidential: number, answer:string) : void {
    var question = {
        id: id,
        confidential: confidential,
        answer: answer
    };

    this.anamneseResult.push(question);

    this.updateBackup(id, confidential, answer);

    console.log(JSON.stringify(this.anamneseResult));
  }


  // Função para obter a URL do vídeo com base no ID da anamnese
  downloadBackgroundVideo(video:string) {
    if (video === this.lastDownloadedVideo)
      return;

    this.lastDownloadedVideo = video;
    this.http.get('./assets/videos/' + video, { responseType: 'blob' }).subscribe({
      next: () => console.log('Vídeo ' + video + ' pré-carregado pelo Service Worker'),
      error: (err) => console.error('Erro ao pré-carregar vídeo ' + video, err)
    });
  }

  // Dispara o download dos próximos vídeos em background.
  downloadNextVideos(id:number) : void {
    const anamneseForm = new AnamneseForm(this.findAnamneseById(id));
    if (anamneseForm.informacao) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.informacao));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.usuario) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.usuario));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.endereco) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.endereco));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.texto) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.texto));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcaoTexto) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcaoTexto));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.sim) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.sim));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.nao) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.nao));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.naosei) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.naosei));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.escala) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.escala));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.numero) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.numero));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.data) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.data));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.cpf) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.cpf));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.email) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.email));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.telefone) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.telefone));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.checkbox) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.checkbox));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcao1) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcao1));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcao2) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcao2));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcao3) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcao3));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcao4) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcao4));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcao5) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcao5));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcao6) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcao6));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcao7) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcao7));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcao8) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcao8));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
    if (anamneseForm.opcao9) {
      const nextAnamneseForm = new AnamneseForm(this.findAnamneseById(anamneseForm.opcao9));
      this.downloadBackgroundVideo(nextAnamneseForm.video);
    }
  }

  nextQuestionAnamnese(id:number) : void {
    this.reset();
    this.downloadNextVideos(id);
    this.anamneseForm = new AnamneseForm(this.findAnamneseById(id));
    this.isVideo = this.anamneseForm.video.includes('.mp4');
    this.progresso = this.anamneses.findIndex((obj: any) => obj.id === this.anamneseForm.id) / (this.anamneses.length - 1) * 100;
    this.progresso = parseFloat(this.progresso.toFixed(0));
    console.log(`Next question: ` +  id );

    const existAnswer = this.anamneseBackup.find((a: { id: number; }) => a.id === id);
    if (existAnswer) {
      if (this.anamneseForm.usuario) {
        if (existAnswer.answer.includes('|')) {
          const [nome, cpf] = existAnswer.answer.split('|');
          this.texto = nome;
          this.cpf = cpf;
        }
      } else if (this.anamneseForm.endereco) {
        if (existAnswer.answer.includes('|')) {
          const [cep, logradouro, numero, complemento, bairro, cidade, uf] = existAnswer.answer.split('|');
          this.endereco_cep = cep;
          this.endereco_logradouro = logradouro;
          this.endereco_numero = numero;
          this.endereco_complemento = complemento;
          this.endereco_bairro = bairro;
          this.endereco_cidade = cidade;
          this.endereco_uf = uf;
        }
      } else if (this.anamneseForm.texto) {
        if (existAnswer.answer === this.anamneseForm.opcaoTexto_desc) {
          this.isOpcaoTexto = true;
        } else {
          this.texto = existAnswer.answer;
        }
      } else if (this.anamneseForm.sim) {
        if (existAnswer.answer === 'SIM') {
          this.isSim = true;
        } else if (existAnswer.answer === 'NÃO') {
          this.isNao = true;
        } else if (existAnswer.answer === 'NÃO SEI') {
          this.isNaoSei = true;
        }
      } else if (this.anamneseForm.opcao1 && !this.anamneseForm.checkbox) {
        if (existAnswer.answer === this.anamneseForm.opcao1_desc) {
          this.checkboxes.value.opcao1 = true;
        } else if (existAnswer.answer === this.anamneseForm.opcao2_desc) {
          this.checkboxes.value.opcao2 = true;
        } else if (existAnswer.answer === this.anamneseForm.opcao3_desc) {
          this.checkboxes.value.opcao3 = true;
        } else if (existAnswer.answer === this.anamneseForm.opcao4_desc) {
          this.checkboxes.value.opcao4 = true;
        } else if (existAnswer.answer === this.anamneseForm.opcao5_desc) {
          this.checkboxes.value.opcao5 = true;
        } else if (existAnswer.answer === this.anamneseForm.opcao6_desc) {
          this.checkboxes.value.opcao6 = true;
        } else if (existAnswer.answer === this.anamneseForm.opcao7_desc) {
          this.checkboxes.value.opcao7 = true;
        } else if (existAnswer.answer === this.anamneseForm.opcao8_desc) {
          this.checkboxes.value.opcao8 = true;
        } else if (existAnswer.answer === this.anamneseForm.opcao9_desc) {
          this.checkboxes.value.opcao9 = true;
        }
      } else if (this.anamneseForm.checkbox) {
        const opcao1Checked = existAnswer.answer.includes('(X) ' + this.anamneseForm.opcao1_desc + ';');
        const opcao2Checked = existAnswer.answer.includes('(X) ' + this.anamneseForm.opcao2_desc + ';');
        const opcao3Checked = existAnswer.answer.includes('(X) ' + this.anamneseForm.opcao3_desc + ';');
        const opcao4Checked = existAnswer.answer.includes('(X) ' + this.anamneseForm.opcao4_desc + ';');
        const opcao5Checked = existAnswer.answer.includes('(X) ' + this.anamneseForm.opcao5_desc + ';');
        const opcao6Checked = existAnswer.answer.includes('(X) ' + this.anamneseForm.opcao6_desc + ';');
        const opcao7Checked = existAnswer.answer.includes('(X) ' + this.anamneseForm.opcao7_desc + ';');
        const opcao8Checked = existAnswer.answer.includes('(X) ' + this.anamneseForm.opcao8_desc + ';');
        const opcao9Checked = existAnswer.answer.includes('(X) ' + this.anamneseForm.opcao9_desc + ';');
        this.checkboxes.setValue({opcao1: opcao1Checked, opcao2: opcao2Checked, opcao3: opcao3Checked,
          opcao4: opcao4Checked, opcao5: opcao5Checked, opcao6: opcao6Checked, opcao7: opcao7Checked,
          opcao8: opcao8Checked, opcao9: opcao9Checked});
      }
      else if (this.anamneseForm.data) {
        this.data = existAnswer.answer;
      } else if (this.anamneseForm.numero) {
        this.numero = existAnswer.answer;
      } else if (this.anamneseForm.email) {
        this.email = existAnswer.answer;
      } else if (this.anamneseForm.telefone) {
        this.telefone = existAnswer.answer;
      } else if (this.anamneseForm.cpf) {
        this.cpf = existAnswer.answer;
      } else if (this.anamneseForm.escala) {
        this.escala = parseInt(existAnswer.answer);
      }
    }

    if (this.anamneseForm.fim) {
      this.salvar();
    }
  }

  onProximo() : void {
    if(this.anamneseForm.informacao) {
      this.nextQuestionAnamnese(this.anamneseForm.informacao);
    } else if (this.anamneseForm.usuario) {
      this.usuarioNome = this.texto;
      this.usuarioCpf = this.cpf;
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.usuarioNome + '|' + this.usuarioCpf);
      this.nextQuestionAnamnese( this.anamneseForm.usuario);
    } else if (this.anamneseForm.endereco) {
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.endereco_cep + '|' + this.endereco_logradouro + '|' + this.endereco_numero + '|' + this.endereco_complemento + '|' + this.endereco_bairro + '|' + this.endereco_cidade + '|' + this.endereco_uf);
      this.nextQuestionAnamnese( this.anamneseForm.endereco);
    } else if(this.anamneseForm.texto) {
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.isOpcaoTexto ? this.anamneseForm.opcaoTexto_desc : this.texto);
      this.nextQuestionAnamnese(this.anamneseForm.texto);
    }
    else if(this.anamneseForm.sim) {
      if (this.isSim) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, 'SIM');
        this.nextQuestionAnamnese(this.anamneseForm.sim);
      } else if (this.isNao) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, 'NÃO');
        this.nextQuestionAnamnese(this.anamneseForm.nao);
      } else if (this.isNaoSei) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, 'NÃO SEI');
        this.nextQuestionAnamnese(this.anamneseForm.naosei);
      }
    } else if (this.anamneseForm.opcao1 && !this.anamneseForm.checkbox) {
      if (this.checkboxes.value.opcao1 === true) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao1_desc);
        this.nextQuestionAnamnese(this.anamneseForm.opcao1);
      } else if (this.checkboxes.value.opcao2 === true) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao2_desc);
        this.nextQuestionAnamnese(this.anamneseForm.opcao2);
      } else if (this.checkboxes.value.opcao3 === true) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao3_desc);
        this.nextQuestionAnamnese(this.anamneseForm.opcao3);
      } else if (this.checkboxes.value.opcao4 === true) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao4_desc);
        this.nextQuestionAnamnese(this.anamneseForm.opcao4);
      } else if (this.checkboxes.value.opcao5 === true) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao5_desc);
        this.nextQuestionAnamnese(this.anamneseForm.opcao5);
      } else if (this.checkboxes.value.opcao6 === true) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao6_desc);
        this.nextQuestionAnamnese(this.anamneseForm.opcao6);
      } else if (this.checkboxes.value.opcao7 === true) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao7_desc);
        this.nextQuestionAnamnese(this.anamneseForm.opcao7);
      } else if (this.checkboxes.value.opcao8 === true) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao8_desc);
        this.nextQuestionAnamnese(this.anamneseForm.opcao8);
      } else if (this.checkboxes.value.opcao9 === true) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao9_desc);
        this.nextQuestionAnamnese(this.anamneseForm.opcao9);
      }
    } else if (this.anamneseForm.data) {
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.data);
      this.nextQuestionAnamnese(this.anamneseForm.data);
    } else if (this.anamneseForm.cpf) {
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.cpf);
      this.nextQuestionAnamnese(this.anamneseForm.cpf);
    } else if (this.anamneseForm.numero) {
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.numero);
      this.nextQuestionAnamnese(this.anamneseForm.numero);
    } else if (this.anamneseForm.telefone) {
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.telefone);
      this.nextQuestionAnamnese(this.anamneseForm.telefone);
    } else if (this.anamneseForm.email) {
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.email);
      this.nextQuestionAnamnese(this.anamneseForm.email);
    } else if (this.anamneseForm.escala) {
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.escala.toString());
      this.nextQuestionAnamnese(this.anamneseForm.escala);
    } else  if(this.anamneseForm.checkbox) {
      let valor = this.checkBoxValue();
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, valor);
      this.nextQuestionAnamnese(this.anamneseForm.checkbox);
    } else if(this.anamneseForm.fim) {
      console.log('REGISTRO CONCLUIDO COM SUCESSO');
      this.onRecomecar();
    }
  }

  validateProximo() : boolean {
    if(this.anamneseForm.usuario) {
      return this.texto.length > 0 && this.validateCPF();
    }
    if(this.anamneseForm.texto) {
      return this.texto.length > 0 || this.isOpcaoTexto;
    }
    if(this.anamneseForm.sim) {
      return this.isSim || this.isNao || this.isNaoSei;
    }
    if (this.anamneseForm.opcao1 && !this.anamneseForm.checkbox) {
      return this.checkboxes.value.opcao1 === true || this.checkboxes.value.opcao2 === true || this.checkboxes.value.opcao3 === true || this.checkboxes.value.opcao4 === true || this.checkboxes.value.opcao5 === true || this.checkboxes.value.opcao6 === true || this.checkboxes.value.opcao7 === true || this.checkboxes.value.opcao8 === true || this.checkboxes.value.opcao9 === true;
    }
    if (this.anamneseForm.data) {
      return this.validateData();
    }
    if (this.anamneseForm.cpf) {
      return this.validateCPF();
    }
    if (this.anamneseForm.numero) {
      return this.validateNumero();
    }
    if (this.anamneseForm.telefone) {
      return this.validateTelefone();
    }
    if (this.anamneseForm.email) {
      return this.validateEmail();
    }
    if (this.anamneseForm.endereco) {
      return this.validateEndereco();
    }
    return true;
  }

  onAnterior() : void {
    const idAnterior = this.anamneseResult.length > 0 ? this.anamneseResult[this.anamneseResult.length - 1].id : this.anamneses[0].id;
    this.anamneseResult.pop();
    if(this.anamneseForm.usuario) {
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.usuarioNome + '|' + this.usuarioCpf);
    } else if(this.anamneseForm.endereco) {
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.endereco_cep + '|' + this.endereco_logradouro + '|' + this.endereco_numero + '|' + this.endereco_complemento + '|' + this.endereco_bairro + '|' + this.endereco_cidade + '|' + this.endereco_uf);
    } else if(this.anamneseForm.texto) {
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.isOpcaoTexto ? this.anamneseForm.opcaoTexto_desc : this.texto);
    } else if(this.anamneseForm.sim) {
      if (this.isSim) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, 'SIM');
      } else if (this.isNao) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, 'NÃO');
      } else if (this.isNaoSei) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, 'NÃO SEI');
      }
    } else if (this.anamneseForm.opcao1 && !this.anamneseForm.checkbox) {
      if (this.checkboxes.value.opcao1 === true) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao1_desc);
      } else if (this.checkboxes.value.opcao2 === true) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao2_desc);
      } else if (this.checkboxes.value.opcao3 === true) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao3_desc);
      } else if (this.checkboxes.value.opcao4 === true) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao4_desc);
      } else if (this.checkboxes.value.opcao5 === true) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao5_desc);
      } else if (this.checkboxes.value.opcao6 === true) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao6_desc);
      } else if (this.checkboxes.value.opcao7 === true) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao7_desc);
      } else if (this.checkboxes.value.opcao8 === true) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao8_desc);
      } else if (this.checkboxes.value.opcao9 === true) {
        this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao9_desc);
      }
    } else if (this.anamneseForm.data) {
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.data);
    } else if (this.anamneseForm.cpf) {
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.cpf);
    } else if (this.anamneseForm.numero) {
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.numero);
    } else if (this.anamneseForm.telefone) {
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.telefone);
    } else if (this.anamneseForm.email) {
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.email);
    } else if (this.anamneseForm.escala) {
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, this.escala.toString());
    } else if(this.anamneseForm.checkbox) {
      let valor = this.checkBoxValue();
      this.updateBackup(this.anamneseForm.id, this.anamneseForm.confidencial, valor);
    }
    this.nextQuestionAnamnese(idAnterior);
    console.log(`Previous question: ` +  idAnterior );
  }

  validateAnterior() : boolean {
    return this.progresso > 0;
  }

  onInicio() : void {
    this.nextQuestionAnamnese(this.anamneseForm.inicio);
  }

  onSim() : void {
    this.isSim = !this.isSim;
    this.isNao = false;
    this.isNaoSei = false;
  }

  onNao() : void {
    this.isNao = !this.isNao;
    this.isSim = false;
    this.isNaoSei = false;
  }

  onNaoSei() : void {
    this.isNaoSei = !this.isNaoSei;
    this.isSim = false;
    this.isNao = false;
  }

  onOpcaoTexto() : void {
    this.isOpcaoTexto = !this.isOpcaoTexto;
  }

  onOpcao1() : void {
    this.checkboxes.setValue({opcao1: true, opcao2: false, opcao3: false, opcao4: false, opcao5: false, opcao6: false, opcao7: false, opcao8: false, opcao9: false});
  }

  onOpcao2() : void {
    this.checkboxes.setValue({opcao1: false, opcao2: true, opcao3: false, opcao4: false, opcao5: false, opcao6: false, opcao7: false, opcao8: false, opcao9: false});
  }

  onOpcao3() : void {
    this.checkboxes.setValue({opcao1: false, opcao2: false, opcao3: true, opcao4: false, opcao5: false, opcao6: false, opcao7: false, opcao8: false, opcao9: false});
  }

  onOpcao4() : void {
    this.checkboxes.setValue({opcao1: false, opcao2: false, opcao3: false, opcao4: true, opcao5: false, opcao6: false, opcao7: false, opcao8: false, opcao9: false});
  }

  onOpcao5() : void {
    this.checkboxes.setValue({opcao1: false, opcao2: false, opcao3: false, opcao4: false, opcao5: true, opcao6: false, opcao7: false, opcao8: false, opcao9: false});
  }

  onOpcao6() : void {
    this.checkboxes.setValue({opcao1: false, opcao2: false, opcao3: false, opcao4: false, opcao5: false, opcao6: true, opcao7: false, opcao8: false, opcao9: false});
  }

  onOpcao7() : void {
    this.checkboxes.setValue({opcao1: false, opcao2: false, opcao3: false, opcao4: false, opcao5: false, opcao6: false, opcao7: true, opcao8: false, opcao9: false});
  }

  onOpcao8() : void {
    this.checkboxes.setValue({opcao1: false, opcao2: false, opcao3: false, opcao4: false, opcao5: false, opcao6: false, opcao7: false, opcao8: true, opcao9: false});
  }

  onOpcao9() : void {
    this.checkboxes.setValue({opcao1: false, opcao2: false, opcao3: false, opcao4: false, opcao5: false, opcao6: false, opcao7: false, opcao8: false, opcao9: true});
  }

  onCheckOpcao1() : void {
    this.checkboxes.patchValue({opcao1: !this.checkboxes.value.opcao1});
  }

  onCheckOpcao2() : void {
    this.checkboxes.patchValue({opcao2: !this.checkboxes.value.opcao2});
  }

  onCheckOpcao3() : void {
    this.checkboxes.patchValue({opcao3: !this.checkboxes.value.opcao3});
  }

  onCheckOpcao4() : void {
    this.checkboxes.patchValue({opcao4: !this.checkboxes.value.opcao4});
  }

  onCheckOpcao5() : void {
    this.checkboxes.patchValue({opcao5: !this.checkboxes.value.opcao5});
  }

  onCheckOpcao6() : void {
    this.checkboxes.patchValue({opcao6: !this.checkboxes.value.opcao6});
  }

  onCheckOpcao7() : void {
    this.checkboxes.patchValue({opcao7: !this.checkboxes.value.opcao7});
  }

  onCheckOpcao8() : void {
    this.checkboxes.patchValue({opcao8: !this.checkboxes.value.opcao8});
  }

  onCheckOpcao9() : void {
    this.checkboxes.patchValue({opcao9: !this.checkboxes.value.opcao9});
  }

  checkBoxValue() : string {
    let valor = '';
    if (this.anamneseForm.opcao1_desc){
      valor += (this.checkboxes.value.opcao1 ? '(X) ' : '( ) ') + this.anamneseForm.opcao1_desc + '; ';
    }
    if (this.anamneseForm.opcao2_desc){
      valor += (this.checkboxes.value.opcao2 ? '(X) ' : '( ) ') + this.anamneseForm.opcao2_desc + '; ';
    }
    if (this.anamneseForm.opcao3_desc){
      valor += (this.checkboxes.value.opcao3 ? '(X) ' : '( ) ') + this.anamneseForm.opcao3_desc + '; ';
    }
    if (this.anamneseForm.opcao4_desc){
      valor += (this.checkboxes.value.opcao4 ? '(X) ' : '( ) ') + this.anamneseForm.opcao4_desc + '; ';
    }
    if (this.anamneseForm.opcao5_desc){
      valor += (this.checkboxes.value.opcao5 ? '(X) ' : '( ) ') + this.anamneseForm.opcao5_desc + '; ';
    }
    if (this.anamneseForm.opcao6_desc){
      valor += (this.checkboxes.value.opcao6 ? '(X) ' : '( ) ') + this.anamneseForm.opcao6_desc + '; ';
    }
    if (this.anamneseForm.opcao7_desc){
      valor += (this.checkboxes.value.opcao7 ? '(X) ' : '( ) ') + this.anamneseForm.opcao7_desc + '; ';
    }
    if (this.anamneseForm.opcao8_desc){
      valor += (this.checkboxes.value.opcao8 ? '(X) ' : '( ) ') + this.anamneseForm.opcao8_desc + '; ';
    }
    if (this.anamneseForm.opcao9_desc){
      valor += (this.checkboxes.value.opcao9 ? '(X) ' : '( ) ') + this.anamneseForm.opcao9_desc + '; ';
    }
    if (valor.endsWith(';')) {
      valor = valor.slice(0, -1);
    }
    return valor;
  }

  validateData() : boolean {
    if (this.data.length > 10) {
      return false;
    }
    let valor = this.data.replace(/\D/g, '');
    if (valor.length === 8) {
      const dd = parseInt(valor.substring(0, 2));
      const mm = parseInt(valor.substring(2, 4));
      const yyyy = parseInt(valor.substring(4, 8));
      return (dd <= 31) && (mm <= 12) && (yyyy > 1900) && (yyyy <2050);
    };
    return false;;
  }

  validateCPF() : boolean {
    let cpf = this.cpf;
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
  }

  validateCEP() : boolean {
    if (this.endereco_cep.length > 9) {
      return false;
    }
    let valor = this.endereco_cep.replace(/\D/g, '');
    return /^\d{5}-?\d{3}$/.test(this.endereco_cep) && valor.length === 8;
  }

  validateNumero() : boolean {
    return /^\d+$/.test(this.numero)
  }

  validateTelefone() : boolean {
    let valor = this.telefone.replace(/\D/g, '');
    return /^\(\d{2}\)\d{4,5}-\d{4,5}$/.test(this.telefone) && (valor.length > 9 && valor.length < 12);
  }

  validateEmail() : boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(this.email);
  }

  validateUF() : boolean {
    if (this.endereco_uf === 'AC' || this.endereco_uf === 'AL' || this.endereco_uf === 'AP' || this.endereco_uf === 'AM' || this.endereco_uf === 'BA' || this.endereco_uf === 'CE' || this.endereco_uf === 'DF' || this.endereco_uf === 'ES' || this.endereco_uf === 'GO' || this.endereco_uf === 'MA' ||
        this.endereco_uf === 'MT' || this.endereco_uf === 'MS' || this.endereco_uf === 'MG' || this.endereco_uf === 'PA' || this.endereco_uf === 'PB' ||
        this.endereco_uf === 'PR' || this.endereco_uf === 'PE' || this.endereco_uf === 'PI' || this.endereco_uf === 'RJ' || this.endereco_uf === 'RN' ||
        this.endereco_uf === 'RS' || this.endereco_uf === 'RO' || this.endereco_uf === 'RR' || this.endereco_uf === 'SC' || this.endereco_uf === 'SP' || this.endereco_uf === 'SE' || this.endereco_uf === 'TO') {
      return true;
    }
    return false;
  }

  validateEndereco() : boolean {
    return this.endereco_logradouro.length > 0 && this.endereco_bairro.length > 0 && this.endereco_numero.length > 0 && this.endereco_cidade.length > 0 && this.validateUF() && this.validateCEP();
  }

  onCEPChange(event: any) {
    this.endereco_cep = event;
    if (this.endereco_cep.length === 9 && this.validateCEP()) {
      this.searchAddress(this.endereco_cep);
    }
  }

  // Função para buscar e preencher os dados do endereço
  async searchAddress(cep: string) {
    // Remove qualquer caractere que não seja número (como traços ou pontos)
    const cepLimpo = cep.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // Verifica se a API retornou um erro
        if (dados.erro) {
            alert("CEP não encontrado.");
            return;
        }

        this.endereco_logradouro = dados.logradouro;
        this.endereco_bairro = dados.bairro;
        this.endereco_cidade = dados.localidade;
        this.endereco_uf = dados.uf;
        document.getElementById("numero")?.focus();
    } catch (error) {
        console.error("Erro ao buscar o CEP: ", error);
    }
  }
}