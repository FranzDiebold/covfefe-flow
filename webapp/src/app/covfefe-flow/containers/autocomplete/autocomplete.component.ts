import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable, Subject, zip, merge } from 'rxjs';
import { map, filter, debounceTime, switchMap, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AutocompleteTweetService } from '../../services/autocomplete-tweet/autocomplete-tweet.service';
import { AutocompleteTweetResponse } from '../../services/autocomplete-tweet/autocomplete-tweet-response.model';
import { ValueValidity } from '../../util/value-validity.model';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  inputPattern = '0-9a-zA-Z!"#$%&\'()*+,-./:;<=>?@\[\\\]^_`{|}~ ✅🏆📈📉🎥💰📸…';
  beginningOfTweet: FormControl = new FormControl('', Validators.pattern(`[${this.inputPattern}]*`));
  beginningOfTweetMaxLength = environment.beginningOfTweetMaxLength;

  reAutocompleteTweet$: Subject<undefined> = new Subject<undefined>();

  isLoading = false;
  autocompletedTweets: AutocompleteTweetResponse[] = [];
  errorMessage: string;

  constructor(private autocompleteTweetService: AutocompleteTweetService) { }

  ngOnInit(): void {
    const beginningOfTweetValue$: Observable<string> = this.beginningOfTweet.valueChanges;
    const beginningOfTweetIsValid$: Observable<boolean> = this.beginningOfTweet.statusChanges.pipe(
        map((status: string) => status === 'VALID')
      );
    const beginningOfTweetChanges$: Observable<ValueValidity> = zip(beginningOfTweetValue$, beginningOfTweetIsValid$).pipe(
        map(([value, isValid]) => {
          return {
            value,
            isValid
          };
        })
      );

    const autocompleteTweetDueToTextInput$: Observable<string> = beginningOfTweetChanges$.pipe(
        filter((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.isValid),
        map((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.value),
        filter((beginningOfTweetValue: string) => (beginningOfTweetValue.length > 0)),
        debounceTime(800)
      );

    const autocompleteTweetDueToReAutocomplete$: Observable<string> = this.reAutocompleteTweet$.pipe(
      withLatestFrom(beginningOfTweetChanges$),
      map(([_, beginningOfTweetValueValidity]) => beginningOfTweetValueValidity),
      filter((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.isValid),
      map((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.value),
      map((beginningOfTweetValue: string) => beginningOfTweetValue)
    );

    merge(autocompleteTweetDueToTextInput$, autocompleteTweetDueToReAutocomplete$).pipe(
        switchMap((beginningOfTweet: string) => {
          this.isLoading = true;
          this.errorMessage = undefined;
          return this.autocompleteTweetService.autocompleteTweet(beginningOfTweet);
        })
      )
      .subscribe(
        (autocompleteTweetResponse: AutocompleteTweetResponse) => {
          this.isLoading = false;
          autocompleteTweetResponse.numberOfReplies = this.getRandomNumber();
          autocompleteTweetResponse.numberOfRetweets = this.getRandomNumber();
          autocompleteTweetResponse.numberOfLikes = this.getRandomNumber();
          this.autocompletedTweets.unshift(autocompleteTweetResponse);
        },
        (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.statusText;
          if (error.error.description) {
            this.errorMessage += ' (' + error.error.description + ')';
          }
        }
      );

    beginningOfTweetChanges$.pipe(
        map((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.value),
        filter((beginningOfTweetValue: string) => (beginningOfTweetValue.length === 0)),
      )
      .subscribe((_) => {
        this.isLoading = false;
        this.errorMessage = undefined;
      });
  }

  reAutocompleteTweet(): void {
    this.reAutocompleteTweet$.next();
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 2000000);
  }
}
