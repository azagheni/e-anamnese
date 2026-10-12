import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ThemeService } from '../services/theme.service';
import { WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog.component';
import { APP_VERSION } from '../../app-version';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  // The welcome dialog is shown once per app load, not every time the user comes back home.
  private static welcomeShown = false;

  // The gif is shown while the welcome dialog is open (no user interaction yet, so the
  // video cannot start); once the dialog is closed the video takes its place.
  readonly INICIO_IMAGE = 'inicio.gif';
  readonly INICIO_VIDEO = 'inicio.mp4';
  // First video of the anamnese, preloaded so it starts without waiting.
  readonly ANAMNESE_FIRST_VIDEO = 'welcome.mp4';
  readonly descricao = 'Olá! Escolha abaixo se você quer responder a anamnese ou ver os exames que a médica pediu para você.';
  readonly version = APP_VERSION;
  videoPath: string = this.theme.videoPath;
  isDarkTheme: boolean = this.theme.isDarkTheme;
  video: string = this.INICIO_VIDEO;
  isVideo: boolean = true;
  isVideoMuted: boolean = true;
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  constructor(
    private theme: ThemeService,
    private dialog: MatDialog,
    private router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit() {
    if (!InicioComponent.welcomeShown) {
      InicioComponent.welcomeShown = true;
      this.setVideo(this.INICIO_IMAGE);
      this.dialog.open(WelcomeDialogComponent).afterClosed().subscribe(() => this.setVideo(this.INICIO_VIDEO));
      this.downloadBackgroundVideo(this.INICIO_VIDEO);
    }

    this.downloadBackgroundVideo(this.ANAMNESE_FIRST_VIDEO);
  }

  setVideo(video: string) : void {
    this.video = video;
    this.isVideo = video.includes('.mp4');
  }

  downloadBackgroundVideo(video: string) : void {
    this.http.get(this.videoPath + video, { responseType: 'blob' }).subscribe({
      next: () => console.log('Vídeo ' + video + ' pré-carregado pelo Service Worker'),
      error: (err) => console.error('Erro ao pré-carregar vídeo ' + video, err)
    });
  }

  onAnamnese() : void {
    this.router.navigate(['/anamnese']);
  }

  onExames() : void {
    this.router.navigate(['/exames']);
  }

  onSwitchTheme() : void {
    this.theme.toggleTheme();
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
