import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments/environment';
import { GenerateTweetResponse } from './generate-tweet-response.model';


@Injectable()
export class GenerateTweetService {
  private API_PATH = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) {}

  loadGeneratedTweet(beginningOfTweet: string): Observable<GenerateTweetResponse> {
    const body: string = new HttpParams()
      .set('beginning_of_tweet', beginningOfTweet)
      .toString();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient
      .post<GenerateTweetResponse>(this.API_PATH, body, { headers: headers });
  }
}