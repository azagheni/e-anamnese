import { Component } from '@angular/core';
import { ANAMNESES } from 'src/db-data';
import { Anamenese } from './model/anamnese';
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
  anamnese = new Anamenese(this.anamneses[0]);
  anameneseResult = '';
  isTranscricao = false;
  texto: string = '';
  numero: string = '';
  data: string = '';
  email: string = '';
  telefone: string = '';
  cpf: string = '';
  escala:number = 5;

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
    this.anamnese = new Anamenese(this.anamneses[0]);
    this.anameneseResult = '';
    this.reset()
  }

  reset() : void {
    this.texto = '';
    this.numero = '';
    this.data = '';
    this.email = '';
    this.telefone = '';
    this.cpf = '';
    this.escala = 5;
  }

  onTranscricao() : void {
    this.isTranscricao = !this.isTranscricao;
  }

  updateAnamnese(id:number) : void {
    this.reset();
    this.anamnese = new Anamenese(this.findAnamneseById(id));
    console.log(this.anameneseResult);
  }

  onInicio() : void {
    this.anamnese = new Anamenese(this.findAnamneseById(this.anamnese.inicio));
  }

  onFim() : void {
    console.log('REGISTRO CONCLUIDO COM SUCESSO: \n' + this.anameneseResult);
    this.onRecomecar();
  }

  onSim() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: SIM \n';
    this.updateAnamnese(this.anamnese.sim);
  }

  onNao() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: NÃO \n';
    this.updateAnamnese(this.anamnese.nao);
  }

  onNaoSei() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: NÃO SEI \n';
    this.updateAnamnese(this.anamnese.naosei);
  }

  onTexto() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.texto + '\n';
    this.updateAnamnese(this.anamnese.texto);
  }

  onNumero() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.numero + '\n';
    this.updateAnamnese(this.anamnese.numero);
  }

  onData() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.data + '\n';
    this.updateAnamnese(this.anamnese.data);
  }

  onEmail() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.email + '\n';
    this.updateAnamnese(this.anamnese.email);
  }

  onTelefone() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.telefone + '\n';
    this.updateAnamnese(this.anamnese.telefone);
  }

  onCPF() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.cpf + '\n';
    this.updateAnamnese(this.anamnese.cpf);
  }

  onEscala() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.escala + '\n';
    this.updateAnamnese(this.anamnese.escala);
  }

  onOpcao1() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.anamnese.opcao1_desc + '\n';
    this.updateAnamnese(this.anamnese.opcao1);
  }

  onOpcao2() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.anamnese.opcao2_desc + '\n';
    this.updateAnamnese(this.anamnese.opcao2);
  }

  onOpcao3() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.anamnese.opcao3_desc + '\n';
    this.updateAnamnese(this.anamnese.opcao3);
  }

  onOpcao4() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.anamnese.opcao4_desc + '\n';
    this.updateAnamnese(this.anamnese.opcao4);
  }

  onOpcao5() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.anamnese.opcao5_desc + '\n';
    this.updateAnamnese(this.anamnese.opcao5);
  }

  onOpcao6() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.anamnese.opcao6_desc + '\n';
    this.updateAnamnese(this.anamnese.opcao6);
  }

  onOpcao7() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.anamnese.opcao7_desc + '\n';
    this.updateAnamnese(this.anamnese.opcao7);
  }

  onOpcao8() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.anamnese.opcao8_desc + '\n';
    this.updateAnamnese(this.anamnese.opcao8);
  }

  onOpcao9() : void {
    this.anameneseResult += this.anamnese.id.toString() + '. ' + this.anamnese.descricao + ' Resposta: ' + this.anamnese.opcao9_desc + '\n';
    this.updateAnamnese(this.anamnese.opcao9);
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
