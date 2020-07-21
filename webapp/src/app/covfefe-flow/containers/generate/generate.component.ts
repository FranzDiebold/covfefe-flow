import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable, Subject, zip, merge } from 'rxjs';
import { map, filter, debounceTime, switchMap, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { GenerateTweetService } from '../../services/generate-tweet/generate-tweet.service';
import { GenerateTweetResponse } from '../../services/generate-tweet/generate-tweet-response.model';
import { ValueValidity } from '../../util/value-validity.model';


@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {
  inputPattern = '0-9a-zA-Z!"#$%&\'()*+,-./:;<=>?@\[\\\]^_`{|}~ ✅🏆📈📉🎥💰📸…';
  beginningOfTweet: FormControl = new FormControl('', Validators.pattern(`[${this.inputPattern}]*`));
  beginningOfTweetMaxLength = environment.beginningOfTweetMaxLength;

  regenerateTweet$: Subject<undefined> = new Subject<undefined>();

  isLoading = false;
  generatedTweets: GenerateTweetResponse[] = [];
  errorMessage: string;

  constructor(private generateTweetService: GenerateTweetService) { }

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

    const generateTweetDueToTextInput$: Observable<string> = beginningOfTweetChanges$.pipe(
        filter((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.isValid),
        map((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.value),
        filter((beginningOfTweetValue: string) => (beginningOfTweetValue.length > 0)),
        debounceTime(800)
      );

    const generateTweetDueToRegenerate$: Observable<string> = this.regenerateTweet$.pipe(
      withLatestFrom(beginningOfTweetChanges$),
      map(([_, beginningOfTweetValueValidity]) => beginningOfTweetValueValidity),
      filter((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.isValid),
      map((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.value),
      map((beginningOfTweetValue: string) => beginningOfTweetValue)
    );

    merge(generateTweetDueToTextInput$, generateTweetDueToRegenerate$).pipe(
        switchMap((beginningOfTweet: string) => {
          this.isLoading = true;
          this.errorMessage = undefined;
          return this.generateTweetService.loadGeneratedTweet(beginningOfTweet);
        })
      )
      .subscribe(
        (generateTweetResponse: GenerateTweetResponse) => {
          this.isLoading = false;
          generateTweetResponse.number_of_replies = this.getRandomNumber();
          generateTweetResponse.number_of_retweets = this.getRandomNumber();
          generateTweetResponse.number_of_likes = this.getRandomNumber();
          this.generatedTweets.unshift(generateTweetResponse);
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

  regenerateTweet(): void {
    this.regenerateTweet$.next();
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 2000000);
  }
}
