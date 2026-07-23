import { AnamneseData } from './anamnese-data';

/**
 * Anamnese data class
 */
export class Anamnese implements AnamneseData {
    id : number;
    name: string;
    cpf: string;
    answers: string;
    created_at: string;
    updated_at: string;

    /**
     * Constructor
     */
    constructor(data?: any) {
        this.id = -1;
        this.name = '';
        this.cpf = '';
        this.answers = '';
        this.created_at = '';
        this.updated_at = '';

        if (data) {
            Object.assign(this, data);
        }
    }
}