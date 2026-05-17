import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cep' })
export class CepPipe implements PipeTransform {
    transform(value: string): string {
        let valorFormatado: string = value + '';
        valorFormatado = valorFormatado.replace(/\D/g, '');

        if (valorFormatado.length <= 5) {
            valorFormatado = valorFormatado.replace(/(\d{1,5})/, '$1');
        } else if (valorFormatado.length <= 8) {
            valorFormatado = valorFormatado.replace(/(\d{5})(\d{1,3})/, '$1-$2');
        } else {
            valorFormatado = valorFormatado.substring(0, 8);
            valorFormatado = valorFormatado.replace(/(\d{5})(\d{3})/, '$1-$2');
        }

        return valorFormatado;
    }
}
