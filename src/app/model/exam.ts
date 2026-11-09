/**
 * Exam selected by the doctor in e-anamnese-admin.
 * The id is stable and is used to find the exam video.
 */
export interface Exam {
    id: number;
    label: string;
    checked: boolean;
}

/**
 * Items of the "Conclusão do atendimento" are saved in the same list as the exams,
 * with ids starting at 101 (see CONCLUSIONS in e-anamnese-admin/src/app/model/exam.ts).
 */
export const CONCLUSION_FIRST_ID = 101;

export function isConclusion(exam: Exam): boolean {
    return exam.id >= CONCLUSION_FIRST_ID;
}

/**
 * Transcription of the Libras video of each exam, keyed by id (see EXAMS in e-anamnese-admin/src/app/model/exam.ts).
 * An exam without an entry shows a generic text with its label.
 */
export const EXAM_DESCRIPTIONS: Record<number, string> = {
    1: 'Ceratoscopia/Autorrefrator: Neste exame você sentará em um banco com rodinhas para que a Doutora verifique seus olhos. Atenção! Cuidado com o banquinho; ele desliza fácil. Após sentar no banquinho coloque seu queixo no suporte inferior e encoste na testa na barra superior. Abra bem os dois olhos, olhe para a imagem que está no centro e não pisque. Primeiro o exame será no olho direito e depois no olho esquerdo. A doutora tocará no seu braço 3 vezes indicando que terminou este exame e você poderá sair do aparelho, mas continue sentado no banquinho.',
    2: 'Microscopia especular da córnea: Deslize o banco de rodinhas para o segundo aparelho. Novamente, você colocará seu queixo no suporte inferior e encostará a testa na barra superior. Durante o exame não poderá se mexer ou piscar.  Caso pisque, fique imóvel no aparelho e continue com os olhos bem abertos. Se a doutora tocar uma vez em seu braço é para você não piscar se ela tocar duas vezes é para que você pisque uma vez. Na máquina - Abra bem os olhos, ela passará uma luz e você deverá manter os olhos abertos. Após fazer o exame em um olho o aparelho, automaticamente, passará para o próximo olho, passando, novamente, a luz. Quando terminar a doutora tocará em seu braço 3 vezes para que você saia do aparelho e prossiga a consulta e os exames.',
    3: 'Refrator - Avaliação da acuidade visual para longe: Você sentará na cadeira. A doutora colocará o aparelho de lentes/refrator na frente do seu olhos para que diga o que enxerga no monitor. No monitor aparecerá a letra “E” de vários lados. Você a representará com os três dedos como se fosse o número “3” para cima, para baixo, para direita ou para esquerda. Quando não conseguir visualizar, nitidamente, faça o sinal de negativo e quando conseguir enxergar sinalize positivo. Sua sinalização será da esquerda para direita. Durante este exame a doutora mudará as lentes no refrator para que identifique as letras que aparecem no monitor. Primeiro será examinado um olho, depois o outro e por último os dois juntos. A doutora tocará no seu braço direito perguntando sobre sua visão do olho direito. Para o olho esquerdo ela tocará no seu braço esquerdo e para os dois olhos ela tocará uma vez nos dois braços. Você informará qual lente consegue enxergar melhor.',
    4: 'Refrator - Avaliação da acuidade visual para perto: Você sentará na cadeira. A doutora colocará a aparelho de lentes na frente do seu olhos e lhe entregará uma cartão/tabela para que segure na frente de seus olhos. Segure com uma das mãos o cartão e com os dois olhos abertos diga se consegue ver bem o que está escrito nele. Caso não consiga ver nitidamente faça o sinal de negativo; se conseguir ver, nitidamente, sinalize positivo. Primeiro será examinado um olho, depois o outro e por último os dois juntos. Quando terminar o exame a doutora tocará 3 vezes no seu braço.',
    5: 'Biomicroscopia/Lâmpada de fenda: Sentado na cadeira, coloque seu queixo no suporte inferior e encoste na testa na barra superior ficando com os olhos abertos. A Dr. Marta sinalizará levando a mão para o lado ao qual deseja que você olhe. Você moverá seus olhos para direita ou para esquerda conforme o lado que ela apontou. Quando terminar o exame a doutora tocará 3 vezes no seu braço.',
    6: 'Fundoscopia: Sentado na cadeira, coloque seu queixo no suporte inferior e encoste a testa na barra superior ficando com os olhos abertos. A doutora Marta fará o exame de fundo de olho iluminando com uma luz mais forte e aproximando uma lente. Realizará o mesmo procedimento no outro olho. Quando necessário, a doutora sinalizará levando a sua mão para o lado ao qual deseja que olhe. Não tire seu rosto do aparelho e mova somente seus olhos para o lado indicado. Quando terminar o exame a doutora tocará 3 vezes no seu braço.',
    7: 'Tonometria: Sentado na cadeira. Neste exame a Doutora pingará um colírio nos seus olhos que poderá causar uma pequena ardência, mas não dilatará suas pupilas. Depois de pingar o colírio a oftalmologista colocará um aparelho muito perto do seu olho direito e depois no olho esquerdo. Mantenha os olhos abertos e não pisque. Quando terminar o exame a doutora tocará 3 vezes no seu braço.',
    8: 'Mapeamento da retina: Sentado na cadeira. A doutora pingará uma gota de colírio em cada olho para dilatar sua pupila. Demorará de 15 a 20 minutos para fazer efeito, mas continuará enxergando. Coloque seu queixo no suporte inferior e encoste na testa na barra superior ficando com os olhos abertos. A doutora examinará no olho direito e depois no esquerdo. Quando terminar o exame a doutora tocará 3 vezes no seu braço. Vire sua cabeça para cima para que ela pingue o colírio nos seus olhos.',
};

/**
 * Transcription of the Libras video of each conclusion item, keyed by id.
 */
export const CONCLUSION_DESCRIPTIONS: Record<number, string> = {
    101: 'A doutora lhe prescreverá a receita do grau dos óculos para que leve à ótica.',
    102: 'Dra. Marta lhe receitará um colírio para pingar nos olhos para o tratamento. Use-o conforme orientações no receituário. Se ao terminar de uso do(s) medicamento(s) você perceber que não melhorou totalmente ou continua com os mesmos sintomas, agende uma consulta de retorno. Se for necessário, a doutora pode, também, solicitar que você retorne para reavaliação após o tratamento e para complementar com mais exames.',
    103: 'Nos casos diagnosticados de cataratas ou glaucomas a oftalmologista solicitará exames complementares em clínicas terceirizadas para uma avaliação e detalhamento da situação. Em algumas situações, quando diagnosticado o glaucoma, a doutora poderá prescrever, somente, o uso de colírio para o tratamento.',
};

/**
 * Response of GET /anamneses/exams?cpf=...
 * exams is a JSON string with an Exam[] or null when the doctor has not chosen the exams yet.
 */
export interface ExamsResult {
    id: number;
    exams: string | null;
    created_at: string;
    updated_at: string;
}
