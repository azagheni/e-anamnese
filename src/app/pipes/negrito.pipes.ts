import { Pipe, PipeTransform } from '@angular/core';

// Converte *texto* em <strong>texto</strong> (como no WhatsApp) para ser usado com [innerHTML].
// O trecho deve estar na mesma linha e não pode começar nem terminar com espaço, então "2 * 3 * 4" não vira negrito.
// O texto é escapado antes, então qualquer HTML escrito na string aparece como texto comum.
@Pipe({ name: 'negrito' })
export class NegritoPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        const escapado = (value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        return escapado.replace(/\*([^\s*](?:[^*\n]*[^\s*])?)\*/g, '<strong>$1</strong>');
    }
}
