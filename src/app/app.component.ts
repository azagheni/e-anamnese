import { Component } from '@angular/core';
import { ANAMNESES } from 'src/db-data';
import { Anamnese } from './model/anamnese'
import { AnamneseForm as AnamneseForm } from './model/anamnese-form';

import { AnamneseService } from './services/anamnese.service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-anamnese';
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
  nome: string = '';
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

  /**
	 * Constructor
	 *
	 * @param anamneseService service that handles all Anamnese related tasks
   */
	constructor(
    public anamneseService: AnamneseService,
    private _formBuilder: FormBuilder
  ) {
    /* istanbul ignore next */
  }

	ngOnInit() {
    console.log('[AppComponent] =============== Initializing app ===============');
    this.onRecomecar();
  }

  findAnamneseById(id:number) {
    return ANAMNESES.find((anamnese: { id: number; }) => anamnese.id === id);
  }

  onRecomecar() : void {
    console.log('onRecomecar');
    this.anamneseForm = new AnamneseForm(this.anamneses[0]);
    this.anamneseResult = [];
    this.anamneseBackup = [];
    this.cpf = '';
    this.nome = '';
    this.reset();

    // TESTS
    //this.anamneseService.getAnamneses().subscribe(data => {
    //    let anam:Anamnese[] = data;
    //    console.log(JSON.stringify(anam));
    //});
  }

  reset() : void {
    this.texto = '';
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
  }

  salvar() : void {
    console.log('Salvando registro: \n' + JSON.stringify(this.anamneseResult));
    const anamnese = new Anamnese();
    anamnese.name = encodeURIComponent(this.nome);
    anamnese.cpf = encodeURIComponent(this.cpf);
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

  nextQuestionAnamnese(id:number) : void {
    this.reset();
    this.anamneseForm = new AnamneseForm(this.findAnamneseById(id));
    this.progresso = this.anamneses.findIndex((obj: any) => obj.id === this.anamneseForm.id) / (this.anamneses.length - 1) * 100;
    console.log(`Next question: ` +  id );

    const existAnswer = this.anamneseBackup.find((a: { id: number; }) => a.id === id);
    if (existAnswer) {
      if (this.anamneseForm.texto) {
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
      //this.salvar();
    }
  }

  onProximo() : void {
    if(this.anamneseForm.informacao) {
      this.nextQuestionAnamnese(this.anamneseForm.informacao);
    } else if(this.anamneseForm.texto) {
      if (this.anamneseForm.isNome) {
        this.nome = this.texto;
      }
      this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.isOpcaoTexto ? this.anamneseForm.opcaoTexto_desc : this.texto);
      this.nextQuestionAnamnese(this.anamneseForm.texto);
    } else if(this.anamneseForm.sim) {
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
    return true;
  }

  onAnterior() : void {
    const idAnterior = this.anamneseResult.length > 0 ? this.anamneseResult[this.anamneseResult.length - 1].id : this.anamneses[0].id;
    this.anamneseResult.pop();
    if(this.anamneseForm.texto) {
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

  onTexto() : void {
    if (this.anamneseForm.isNome) {
      this.nome = this.texto;
    }
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.isOpcaoTexto ? this.anamneseForm.opcaoTexto_desc : this.texto);
    this.nextQuestionAnamnese(this.anamneseForm.texto);
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

  validateNumero() : boolean {
    let valor = this.numero.replace(/\D/g, '');
    return (valor.length > 0);
  }

  validateTelefone() : boolean {
    let valor = this.telefone.replace(/\D/g, '');
    return (valor.length > 9);
  }

  validateEmail() : boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(this.email);
  }
}
