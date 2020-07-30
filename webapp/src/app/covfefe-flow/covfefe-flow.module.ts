import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LinkyModule } from 'angular-linky';

import { CovfefeFlowRoutingModule } from './covfefe-flow-routing.module';
import { AutocompleteComponent } from './containers/autocomplete/autocomplete.component';
import { AboutComponent } from './containers/about/about.component';
import { LegalComponent } from './containers/legal/legal.component';
import { PrivacyStatementComponent } from './containers/privacy-statement/privacy-statement.component';
import { AutocompleteTweetService } from './services/autocomplete-tweet/autocomplete-tweet.service';
import { TweetComponent } from './components/tweet/tweet.component';
import { BeautifyNumberPipe } from './pipes/beautify-number/beautify-number.pipe';

@NgModule({
  declarations: [
    AutocompleteComponent,
    AboutComponent,
    LegalComponent,
    PrivacyStatementComponent,
    TweetComponent,
    BeautifyNumberPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    LinkyModule,

    CovfefeFlowRoutingModule,
  ],
  providers: [
    AutocompleteTweetService,
  ],
})
export class CovfefeFlowModule { }
