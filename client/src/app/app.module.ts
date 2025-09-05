import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CpfPipe } from './pipes/cpf.pipes';
import { DataPipe } from './pipes/data.pipes';
import { TelefonePipe } from './pipes/telefone.pipes';

import { TermsService } from './services/terms.service';
import { AnamneseService } from './services/anamnese.service';
import { TermsDialogComponent } from './terms-dialog/terms-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CpfPipe,
    DataPipe,
    TelefonePipe,
    TermsDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatBadgeModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatSliderModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    MatIconRegistry,
    HttpClient,
    TermsService,
    AnamneseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
