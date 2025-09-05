import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  private termsAccepted: boolean = false;

  constructor() { }

  hasAcceptedTerms(): boolean {
    return this.termsAccepted;
  }

  acceptTerms(): void {
    this.termsAccepted = true;
  }
}