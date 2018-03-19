import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CovfefeFlowRoutingModule } from './covfefe-flow-routing.module';
import { GenerateComponent } from './containers/generate/generate.component';
import { AboutComponent } from './containers/about/about.component';
import { LegalComponent } from './containers/legal/legal.component';
import { PrivacyStatementComponent } from './containers/privacy-statement/privacy-statement.component';
import { GenerateTweetService } from './services/generate-tweet/generate-tweet.service';
import { TweetComponent } from './components/tweet/tweet.component';
import { BeautifyNumberPipe } from './pipes/beautify-number/beautify-number.pipe';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    CovfefeFlowRoutingModule,
  ],
  declarations: [
    GenerateComponent,
    AboutComponent,
    LegalComponent,
    PrivacyStatementComponent,
    TweetComponent,
    BeautifyNumberPipe,
  ],
  providers: [
    GenerateTweetService,
  ]
})
export class CovfefeFlowModule { }
