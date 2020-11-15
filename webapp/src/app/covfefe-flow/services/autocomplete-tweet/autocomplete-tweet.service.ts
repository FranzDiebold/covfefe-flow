import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AutocompleteTweetResponse } from './autocomplete-tweet-response.model';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteTweetService {
  private API_PATH: string = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) {}

  autocompleteTweet(beginningOfTweet: string): Observable<AutocompleteTweetResponse> {
    const body = {
      beginningOfTweet,
      temperature: '0.9',
    };
    return this.httpClient.post<AutocompleteTweetResponse>(this.API_PATH, body);
  }
}
