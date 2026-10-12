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
 * Response of GET /anamneses/exams?cpf=...
 * exams is a JSON string with an Exam[] or null when the doctor has not chosen the exams yet.
 */
export interface ExamsResult {
    id: number;
    exams: string | null;
    created_at: string;
    updated_at: string;
}
