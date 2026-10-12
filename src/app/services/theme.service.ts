import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly THEME_STORAGE_KEY = 'e-anamnese.isDarkTheme';
  readonly isDarkTheme: boolean = this.loadTheme();

  get videoPath(): string {
    return this.isDarkTheme ? './assets/videos-dark/' : './assets/videos/';
  }

  // The page is reloaded so every video is fetched again from the other folder.
  toggleTheme(): void {
    try {
      localStorage.setItem(this.THEME_STORAGE_KEY, String(!this.isDarkTheme));
    } catch (err) {
      console.warn('[ThemeService] Não foi possível salvar o tema: ', err);
    }
    location.reload();
  }

  private loadTheme(): boolean {
    try {
      return localStorage.getItem(this.THEME_STORAGE_KEY) === 'true';
    } catch (err) {
      console.warn('[ThemeService] Não foi possível ler o tema salvo: ', err);
      return false;
    }
  }
}
