import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateComponent } from './containers/generate/generate.component';
import { AboutComponent } from './containers/about/about.component';
import { LegalComponent } from './containers/legal/legal.component';
import { PrivacyStatementComponent } from './containers/privacy-statement/privacy-statement.component';


const routes: Routes = [
  {
    path: 'generate',
    component: GenerateComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: 'privacy',
    component: PrivacyStatementComponent,
  },
  {
    path: '**',
    redirectTo: 'generate',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovfefeFlowRoutingModule { }
