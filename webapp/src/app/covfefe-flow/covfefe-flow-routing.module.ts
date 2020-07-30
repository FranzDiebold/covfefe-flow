import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutocompleteComponent } from './containers/autocomplete/autocomplete.component';
import { AboutComponent } from './containers/about/about.component';
import { LegalComponent } from './containers/legal/legal.component';
import { PrivacyStatementComponent } from './containers/privacy-statement/privacy-statement.component';

const routes: Routes = [
  {
    path: 'autocomplete',
    component: AutocompleteComponent,
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
    redirectTo: 'autocomplete',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovfefeFlowRoutingModule { }
