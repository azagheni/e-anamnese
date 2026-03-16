import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ANAMNESES } from 'src/db-data';
import { Anamnese } from './model/anamnese'
import { AnamneseForm as AnamneseForm } from './model/anamnese-form';

import { AnamneseService } from './services/anamnese.service';
import { TermsService } from './services/terms.service';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
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
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private TermsService: TermsService
  ) {
    /* istanbul ignore next */
  }

	ngOnInit() {
    console.log('[AppComponent] =============== Initializing app ===============');
    const dialogRef = this.dialog.open(WelcomeDialogComponent);
    this.onRecomecar();

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onRecomecar();
      }
    });
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
      this.onRecomecar();
    })
  }

  findAnamneseById(id:number) {
    return ANAMNESES.find((anamnese: { id: number; }) => anamnese.id === id);
  }

  onRecomecar() : void {
    console.log('onRecomecar');
    this.anamneseForm = new AnamneseForm(this.anamneses[0]);
    this.anamneseResult = [];
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

  updateAnamnese(id:number, confidential: number, answer:string) : void {
    var question = {
        id: id,
        confidential: confidential,
        answer: answer
    };
    this.anamneseResult.push(question);
    console.log(JSON.stringify(this.anamneseResult));
  }

  nextQuestionAnamnese(id:number) : void {
    this.reset();
    this.anamneseForm = new AnamneseForm(this.findAnamneseById(id));
    this.progresso = this.anamneses.findIndex((obj: any) => obj.id === this.anamneseForm.id);
    console.log(`Next question: ` +  id );
    if (this.anamneseForm.fim) {
      this.salvar();
    }
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
      if (!this.isSim) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, 'SIM');
        this.nextQuestionAnamnese(this.anamneseForm.sim);
      } else if (this.anamneseForm.nao) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, 'NÃO');
        this.nextQuestionAnamnese(this.anamneseForm.nao);
      } else if (this.anamneseForm.naosei) {
        this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, 'NÃO SEI');
        this.nextQuestionAnamnese(this.anamneseForm.naosei);
      }
    }
  }

  validateProximo() : boolean {
    if(this.anamneseForm.texto) {
      return this.texto.length > 0 || this.isOpcaoTexto;
    }
    if(this.anamneseForm.sim) {
      return this.isSim || this.isNao || this.isNaoSei;
    }
    return true;
  }

  onAnterior() : void {
    this.reset();
  }

  validateAnterior() : boolean {
    return this.progresso > 0;
  }


  onInicio() : void {
    this.nextQuestionAnamnese(this.anamneseForm.inicio);
  }

  onFim() : void {
    console.log('REGISTRO CONCLUIDO COM SUCESSO');
    this.onRecomecar();
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

  onNumero() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.numero);
    this.nextQuestionAnamnese(this.anamneseForm.numero);
  }

  onData() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.data);
    this.nextQuestionAnamnese(this.anamneseForm.data);
  }

  onEmail() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.email);
    this.nextQuestionAnamnese(this.anamneseForm.email);
  }

  onTelefone() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.telefone);
    this.nextQuestionAnamnese(this.anamneseForm.telefone);
  }

  onCPF() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.cpf);
    this.nextQuestionAnamnese(this.anamneseForm.cpf);
  }

  onEscala() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.escala.toString());
    this.nextQuestionAnamnese(this.anamneseForm.escala);
  }

  onCheckBox() : void {
    let valor = '';
    if (this.anamneseForm.opcao1_desc){
      valor += (this.checkboxes.value.opcao1 ? "(X) " : "( ) ") + this.anamneseForm.opcao1_desc + '; ';
    }
    if (this.anamneseForm.opcao2_desc){
      valor += (this.checkboxes.value.opcao2 ? "(X) " : "( ) ") + this.anamneseForm.opcao2_desc + '; ';
    }
    if (this.anamneseForm.opcao3_desc){
      valor += (this.checkboxes.value.opcao3 ? "(X) " : "( ) ") + this.anamneseForm.opcao3_desc + '; ';
    }
    if (this.anamneseForm.opcao4_desc){
      valor += (this.checkboxes.value.opcao4 ? "(X) " : "( ) ") + this.anamneseForm.opcao4_desc + '; ';
    }
    if (this.anamneseForm.opcao5_desc){
      valor += (this.checkboxes.value.opcao5 ? "(X) " : "( ) ") + this.anamneseForm.opcao5_desc + '; ';
    }
    if (this.anamneseForm.opcao6_desc){
      valor += (this.checkboxes.value.opcao6 ? "(X) " : "( ) ") + this.anamneseForm.opcao6_desc + '; ';
    }
    if (this.anamneseForm.opcao7_desc){
      valor += (this.checkboxes.value.opcao7 ? "(X) " : "( ) ") + this.anamneseForm.opcao7_desc + '; ';
    }
    if (this.anamneseForm.opcao8_desc){
      valor += (this.checkboxes.value.opcao8 ? "(X) " : "( ) ") + this.anamneseForm.opcao8_desc + '; ';
    }
    if (this.anamneseForm.opcao9_desc){
      valor += (this.checkboxes.value.opcao9 ? "(X) " : "( ) ") + this.anamneseForm.opcao9_desc + '; ';
    }
    if (valor.endsWith(';')) {
      valor = valor.slice(0, -1);
    }

    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, valor);
    this.nextQuestionAnamnese(this.anamneseForm.checkbox);
  }

  onOpcao1() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao1_desc);
    this.nextQuestionAnamnese(this.anamneseForm.opcao1);
  }

  onOpcao2() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao2_desc);
    this.nextQuestionAnamnese(this.anamneseForm.opcao2);
  }

  onOpcao3() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao3_desc);
    this.nextQuestionAnamnese(this.anamneseForm.opcao3);
  }

  onOpcao4() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao4_desc);
    this.nextQuestionAnamnese(this.anamneseForm.opcao4);
  }

  onOpcao5() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao5_desc);
    this.nextQuestionAnamnese(this.anamneseForm.opcao5);
  }

  onOpcao6() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao6_desc);
    this.nextQuestionAnamnese(this.anamneseForm.opcao6);
  }

  onOpcao7() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao7_desc);
    this.nextQuestionAnamnese(this.anamneseForm.opcao7);
  }

  onOpcao8() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao8_desc);
    this.nextQuestionAnamnese(this.anamneseForm.opcao8);
  }

  onOpcao9() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.anamneseForm.opcao9_desc);
    this.nextQuestionAnamnese(this.anamneseForm.opcao9);
  }

  validateData() : boolean {
    if (this.data.length > 10) {
      this.data = this.data.substring(0, 10);
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
    let valor = this.cpf.replace(/\D/g, '');
    return (valor.length === 11);
  }

  validateNumero() : boolean {
    let valor = this.numero.replace(/\D/g, '');
    return (valor.length > 0);
  }

  validateTelefone() : boolean {
    let valor = this.telefone.replace(/\D/g, '');
    return (valor.length > 9);
  }

}
