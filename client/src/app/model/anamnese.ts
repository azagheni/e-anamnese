
import { AnamneseData } from './anamnese-data';

// External dependencies
import { assign } from 'lodash';

/**
 * Anamnese data class
 */
export class Anamenese implements AnamneseData {
    id: number;
    descricao: string;
    video: string;
    inicio: number;
    fim: number;
    sim: number;
    nao: number;
    naosei: number;
    escala: number;
    texto: number;
    numero: number;
    data: number;
    telefone: number;
    email: number;
    cpf: number;
    opcao1:number;
    opcao1_desc: string;
    opcao1_icon: string;
    opcao2:number;
    opcao2_desc: string;
    opcao2_icon: string;
    opcao3:number;
    opcao3_desc: string;
    opcao3_icon: string;
    opcao4:number;
    opcao4_desc: string;
    opcao4_icon: string;
    opcao5:number;
    opcao5_desc: string;
    opcao5_icon: string;
    opcao6:number;
    opcao6_desc: string;
    opcao6_icon: string;
    opcao7:number;
    opcao7_desc: string;
    opcao7_icon: string;
    opcao8:number;
    opcao8_desc: string;
    opcao8_icon: string;
    opcao9:number;
    opcao9_desc: string;
    opcao9_icon: string;

	/**
	 * Constructor
	 */
	constructor(data?: any) {
		this.id = 0;
		this.descricao = '';
		this.video = '';
        this.inicio = 0;
        this.fim = 0;
        this.sim = 0;
        this.nao = 0;
        this.naosei = 0;
        this.escala = 0;
        this.texto = 0;
        this.numero = 0;
        this.data = 0;
        this.telefone = 0;
        this.email = 0;
        this.cpf = 0;
        this.opcao1 = 0;
        this.opcao1_desc = '';
        this.opcao1_icon = '';
        this.opcao2 = 0;
        this.opcao2_desc = '';
        this.opcao2_icon = '';
        this.opcao3 = 0;
        this.opcao3_desc = '';
        this.opcao3_icon = '';
        this.opcao4 = 0;
        this.opcao4_desc = '';
        this.opcao4_icon = '';
        this.opcao5 = 0;
        this.opcao5_desc = '';
        this.opcao5_icon = '';
        this.opcao6 = 0;
        this.opcao6_desc = '';
        this.opcao6_icon = '';
        this.opcao7 = 0;
        this.opcao7_desc = '';
        this.opcao7_icon = '';
        this.opcao8 = 0;
        this.opcao8_desc = '';
        this.opcao8_icon = '';
        this.opcao9 = 0;
        this.opcao9_desc = '';
        this.opcao9_icon = '';

        if (data) {
			assign(this, data);
		}
	}
}