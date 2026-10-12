import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnamneseComponent } from './anamnese/anamnese.component';

const routes: Routes = [
  { path: 'anamnese', component: AnamneseComponent },
  { path: '', redirectTo: 'anamnese', pathMatch: 'full' },
  { path: '**', redirectTo: 'anamnese' }
];

@NgModule({
  // useHash: a static host does not need rewrite rules to serve deep links
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
