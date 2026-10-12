import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AnamneseComponent } from './anamnese/anamnese.component';
import { ExameComponent } from './exame/exame.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'anamnese', component: AnamneseComponent },
  { path: 'exames', component: ExameComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  // useHash: a static host does not need rewrite rules to serve deep links
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
