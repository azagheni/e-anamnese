import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Exam, ExamsResult } from '../model/exam';
import { AnamneseService } from '../services/anamnese.service';
import { ThemeService } from '../services/theme.service';
import { isValidCpf } from '../utils/cpf';

type Etapa = 'cpf' | 'lista' | 'sem-exames' | 'nao-encontrado' | 'erro';

// Libras video and transcription of each step.
const ETAPAS: Record<Etapa, { video: string, descricao: string }> = {
  'cpf': {
    video: 'exames-cpf.mp4',
    descricao: 'Digite o seu CPF no espaço abaixo para ver os exames que a médica pediu para você.'
  },
  'lista': {
    video: 'exames-lista.mp4',
    descricao: 'Estes são os exames que a médica pediu para você.'
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
  dataConsulta: string = '';

  constructor(
    private anamneseService: AnamneseService,
    private theme: ThemeService,
    private router: Router
  ) {}

  get video() : string {
    return ETAPAS[this.etapa].video;
  }

  get descricao() : string {
    return ETAPAS[this.etapa].descricao;
  }

  onSair() : void {
    this.router.navigate(['/']);
  }

  onAnterior() : void {
    if (this.etapa === 'cpf') {
      this.onSair();
    } else {
      this.etapa = 'cpf';
    }
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
    this.exames = this.parseExams(result.exams).filter(exam => exam.checked);
    this.dataConsulta = this.formatData(result.created_at);
    this.etapa = this.exames.length > 0 ? 'lista' : 'sem-exames';
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
