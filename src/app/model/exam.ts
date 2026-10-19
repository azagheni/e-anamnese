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
 * Transcription of the Libras video of each conclusion item, keyed by id.
 */
export const CONCLUSION_DESCRIPTIONS: Record<number, string> = {
    101: 'A doutora lhe prescreverá a receita do grau dos óculos para que leve à ótica.',
    102: 'Dra. Marta lhe receitará um colírio para pingar nos olhos para o tratamento. Use-o conforme orientações no receituário. '
        + 'Se ao terminar de uso do(s) medicamento(s) você perceber que não melhorou totalmente ou continua com os mesmos sintomas, agende uma consulta de retorno.',
    103: 'Se for necessário, a doutora pode, também, solicitar que você retorne para reavaliação após o tratamento e para complementar com mais exames. '
        + 'Nos casos diagnosticados de cataratas ou glaucomas a oftalmologista solicitará exames complementares em clínicas terceirizadas para uma avaliação '
        + 'e detalhamento da situação para que saiba como proceder na cirurgia de catarata ou glaucoma. '
        + 'Em algumas situações, quando diagnosticado o glaucoma, a doutora poderá prescrever, somente, o uso de colírio para o tratamento.',
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
