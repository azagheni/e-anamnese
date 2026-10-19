import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { CONCLUSION_DESCRIPTIONS, Exam, ExamsResult, isConclusion } from '../model/exam';
import { AnamneseService } from '../services/anamnese.service';
import { ThemeService } from '../services/theme.service';
import { isValidCpf } from '../utils/cpf';

type Etapa = 'cpf' | 'lista' | 'conclusao' | 'exame' | 'sem-exames' | 'nao-encontrado' | 'erro';

// Libras video and transcription of each step ('exame' uses the selected exam, see examVideo).
const ETAPAS: Record<Exclude<Etapa, 'exame'>, { video: string, descricao: string }> = {
  'cpf': {
    video: 'exames-cpf.mp4',
    descricao: 'Digite o seu CPF no espaço abaixo para ver os exames que a médica pediu para você.'
  },
  'lista': {
    video: 'exames-lista.mp4',
    descricao: 'Estes são os exames que a médica pediu para você. Toque em um exame para ver o vídeo que explica como ele é feito.'
  },
  'conclusao': {
    video: 'exames-conclusao.mp4',
    descricao: 'Esta é a conclusão do seu atendimento. Toque em um item para ver o vídeo que explica o que a médica definiu para você.'
  },
  'sem-exames': {
    video: 'exames-sem-exames.mp4',
    descricao: 'A médica ainda não definiu os seus exames. Isso acontece quando a consulta médica ainda não foi realizada.'
  },
  'nao-encontrado': {
    video: 'exames-nao-encontrado.mp4',
    descricao: 'Nenhuma anamnese foi localizada para o CPF informado. Confira o número digitado e tente novamente.'
  },
  'erro': {
    video: 'exames-erro.mp4',
    descricao: 'Não foi possível buscar os seus exames agora. Verifique a sua conexão com a internet e tente novamente.'
  }
};

@Component({
  selector: 'app-exame',
  templateUrl: './exame.component.html',
  styleUrls: ['./exame.component.scss']
})
export class ExameComponent {
  videoPath: string = this.theme.videoPath;
  isVideoMuted: boolean = true;
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  etapa: Etapa = 'cpf';
  cpf: string = '';
  buscando: boolean = false;
  exames: Exam[] = [];
  conclusoes: Exam[] = [];
  exameSelecionado?: Exam;
  dataConsulta: string = '';

  constructor(
    private anamneseService: AnamneseService,
    private theme: ThemeService,
    private router: Router,
    private readonly http: HttpClient
  ) {}

  get video() : string {
    if (this.etapa === 'exame' && this.exameSelecionado) {
      return this.examVideo(this.exameSelecionado);
    }
    return ETAPAS[this.etapa as Exclude<Etapa, 'exame'>].video;
  }

  get descricao() : string {
    if (this.etapa === 'exame' && this.exameSelecionado) {
      if (isConclusion(this.exameSelecionado)) {
        return CONCLUSION_DESCRIPTIONS[this.exameSelecionado.id] || this.exameSelecionado.label;
      }
      return this.exameSelecionado.label + ': assista ao vídeo para saber como este exame é feito.';
    }
    return ETAPAS[this.etapa as Exclude<Etapa, 'exame'>].descricao;
  }

  // Video explaining the exam procedure (or the conclusion item), keyed by the id of the catalog in e-anamnese-admin.
  examVideo(exame: Exam) : string {
    return (isConclusion(exame) ? 'conclusao-' : 'exame-') + exame.id + '.mp4';
  }

  onSair() : void {
    this.router.navigate(['/']);
  }

  onAnterior() : void {
    if (this.etapa === 'cpf') {
      this.onSair();
    } else if (this.etapa === 'exame') {
      // Volta para a tela de onde o item foi escolhido.
      this.etapa = this.exameSelecionado && isConclusion(this.exameSelecionado) ? 'conclusao' : 'lista';
    } else if (this.etapa === 'conclusao') {
      this.etapa = 'lista';
    } else {
      this.etapa = 'cpf';
    }
  }

  onConclusao() : void {
    this.etapa = 'conclusao';
  }

  onExame(exame: Exam) : void {
    this.exameSelecionado = exame;
    this.etapa = 'exame';
  }

  validateCPF() : boolean {
    return isValidCpf(this.cpf);
  }

  onBuscar() : void {
    if (!this.validateCPF() || this.buscando) {
      return;
    }
    this.buscando = true;
    this.anamneseService.getExamsByCpf(this.cpf).subscribe({
      next: (result) => {
        this.buscando = false;
        this.showResult(result);
      },
      error: (err: HttpErrorResponse) => {
        this.buscando = false;
        console.error('[ExameComponent] Erro ao buscar os exames: ', err);
        this.etapa = err.status === 404 ? 'nao-encontrado' : 'erro';
      }
    });
  }

  showResult(result: ExamsResult) : void {
    const marcados = this.parseExams(result.exams).filter(exam => exam.checked);
    this.exames = marcados.filter(exam => !isConclusion(exam));
    this.conclusoes = marcados.filter(exam => isConclusion(exam));
    this.dataConsulta = this.formatData(result.created_at);
    this.etapa = marcados.length > 0 ? 'lista' : 'sem-exames';
    marcados.forEach(exame => this.downloadBackgroundVideo(this.examVideo(exame)));
  }

  // Preloads the exam videos so they start without waiting when the patient taps an exam.
  downloadBackgroundVideo(video: string) : void {
    this.http.get(this.videoPath + video, { responseType: 'blob' }).subscribe({
      next: () => console.log('Vídeo ' + video + ' pré-carregado pelo Service Worker'),
      error: (err) => console.error('Erro ao pré-carregar vídeo ' + video, err)
    });
  }

  parseExams(exams: string | null) : Exam[] {
    if (!exams) {
      return [];
    }
    try {
      const parsed = JSON.parse(exams);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('[ExameComponent] Lista de exames inválida: ', err);
      return [];
    }
  }

  // created_at comes as 'YYYY-MM-DD HH:mm:ss'; Safari cannot parse it with Date, so split the text.
  formatData(createdAt: string) : string {
    const [ano, mes, dia] = (createdAt || '').split(' ')[0].split('-');
    return ano && mes && dia ? `${dia}/${mes}/${ano}` : '';
  }

  onToggleMute() : void {
    this.isVideoMuted = !this.isVideoMuted;

    if (!this.isVideoMuted && this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.currentTime = 0;
      video.play();
    }
  }
}
