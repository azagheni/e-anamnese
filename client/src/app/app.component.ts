import { Component } from '@angular/core';
import { ANAMNESES } from 'src/db-data';
import { Anamnese } from './model/anamnese'
import { AnamneseForm as AnamneseForm } from './model/anamnese-form';
import { FormsModule } from '@angular/forms';

import { AnamneseService } from './services/anamnese.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-anamnese';
  anamneses = ANAMNESES;
  anamneseForm: AnamneseForm = new AnamneseForm(this.anamneses[0]);
  anamneseResult: any = [];
  isTranscricao: boolean = false;
  texto: string = '';
  numero: string = '';
  data: string = '';
  email: string = '';
  telefone: string = '';
  cpf: string = '';
  escala:number = 5;
  nome: string = '';

  /**
	 * Constructor
	 *
	 * @param anamneseService service that handles all Anamnese related tasks
   */
	constructor(
    public anamneseService: AnamneseService
    ) {
    /* istanbul ignore next */
  }

	ngOnInit() {
    console.log('[AppComponent] =============== Initializing app ===============')
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
    //this.anamneseService.getAnamneses().subscribe(data =>
    //  {
    //    let anam:Anamnese[] = data;
    //    console.log(JSON.stringify(anam));
    //  }
    //);
  }

  reset() : void {
    this.texto = '';
    this.numero = '';
    this.data = '';
    this.email = '';
    this.telefone = '';
    this.escala = 5;
  }

  onTranscricao() : void {
    this.isTranscricao = !this.isTranscricao;
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
      alert("Anamnese salva com sucesso!");
    });
  }

  onInicio() : void {
    this.anamneseForm = new AnamneseForm(this.findAnamneseById(this.anamneseForm.inicio));
  }

  onFim() : void {
    console.log('REGISTRO CONCLUIDO COM SUCESSO');
    this.onRecomecar();
  }

  onSim() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, 'SIM');
    this.nextQuestionAnamnese(this.anamneseForm.sim);
  }

  onNao() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, 'NÃO');
    this.nextQuestionAnamnese(this.anamneseForm.nao);
  }

  onNaoSei() : void {
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, 'NÃO SEI');
    this.nextQuestionAnamnese(this.anamneseForm.naosei);
  }

  onTexto() : void {
    if (this.anamneseForm.isNome) {
      this.nome = this.texto;
    }
    this.updateAnamnese(this.anamneseForm.id, this.anamneseForm.confidencial, this.texto);
    this.nextQuestionAnamnese(this.anamneseForm.texto);
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
