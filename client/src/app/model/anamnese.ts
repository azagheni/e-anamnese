import { AnamneseData } from './anamnese-data';

// External dependencies
import { assign } from 'lodash';

/**
 * Anamnese data class
 */
export class Anamnese implements AnamneseData {
    id : number;
    name: string;
    cpf: string;
    answers: string;

    /**
     * Constructor
     */
    constructor(data?: any) {
        this.id = -1;
        this.name = '';
        this.cpf = '';
        this.answers = '';

        if (data) {
            assign(this, data);
        }
    }
}