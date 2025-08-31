import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpf' })
export class CpfPipe implements PipeTransform {
    transform(value: string): string {
        let valorFormatado:string = value + '';
        valorFormatado = valorFormatado.replace(/\D/g, '')

        if (valorFormatado.length === 3) {
            valorFormatado = valorFormatado.replace(/(\d{3})/,'$1.');
        } else if (valorFormatado.length === 4) {
            valorFormatado = valorFormatado.replace(/(\d{3})(\d{1})/,'$1.$2');
        } else if (valorFormatado.length === 5) {
            valorFormatado = valorFormatado.replace(/(\d{3})(\d{2})/,'$1.$2');
        } else if (valorFormatado.length === 6) {
            valorFormatado = valorFormatado.replace(/(\d{3})(\d{3})/,'$1.$2.');
        } else if (valorFormatado.length === 7) {
            valorFormatado = valorFormatado.replace(/(\d{3})(\d{3})(\d{1})/,'$1.$2.$3');
        } else if (valorFormatado.length === 8) {
            valorFormatado = valorFormatado.replace(/(\d{3})(\d{3})(\d{2})/,'$1.$2.$3');
        } else if (valorFormatado.length === 9) {
            valorFormatado = valorFormatado.replace(/(\d{3})(\d{3})(\d{3})/,'$1.$2.$3-');
        } else if (valorFormatado.length === 10) {
            valorFormatado = valorFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/,'$1.$2.$3-$4');
        } else if (valorFormatado.length === 11) {
            valorFormatado = valorFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4');
        } else if (valorFormatado.length > 11) {
            valorFormatado = valorFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4');
        }

        return valorFormatado;
    }
}