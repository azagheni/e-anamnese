import { AnamneseData } from './anamnese-data';

// External dependencies
import { assign } from 'lodash';

/**
 * Anamnese data class
 */
export class Anamnese implements AnamneseData {
    name: string;
    email: string;

    /**
     * Constructor
     */
    constructor(data?: any) {
        this.name = '';
        this.email = '';

        if (data) {
            assign(this, data);
        }
    }
}