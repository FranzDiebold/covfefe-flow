import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { zip, map, startWith, filter, debounceTime, merge, withLatestFrom } from 'rxjs/operators';

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

  ngOnInit() {
    const beginningOfTweetValue$: Observable<string> = this.beginningOfTweet.valueChanges;
    const beginningOfTweetIsValid$: Observable<boolean> = this.beginningOfTweet.statusChanges.pipe(
        map((status: string) => status === 'VALID')
      );
    const beginningOfTweetChanges$: Observable<ValueValidity> = beginningOfTweetValue$.pipe(
        zip(beginningOfTweetIsValid$),
        map(([value, isValid]) => {
          return {
            value: value,
            isValid: isValid
          };
        })
      );

    const generateTweetDueToTextInput$: Observable<string> = beginningOfTweetChanges$.pipe(
        filter((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.isValid),
        map((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.value),
        filter((beginningOfTweetValue: string) => (beginningOfTweetValue.length > 0)),
        debounceTime(500)
      );

    const generateTweetDueToRegenerate$: Observable<string> = this.regenerateTweet$.pipe(
      withLatestFrom(beginningOfTweetChanges$),
      map(([_, beginningOfTweetValueValidity]) => beginningOfTweetValueValidity),
      filter((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.isValid),
      map((beginningOfTweetValueValidity: ValueValidity) => beginningOfTweetValueValidity.value),
      map((beginningOfTweetValue: string) => beginningOfTweetValue)
    );

    generateTweetDueToTextInput$.pipe(
        merge(generateTweetDueToRegenerate$)
      )
      .subscribe(
        (beginningOfTweet: string) => {
          this.isLoading = true;
          this.errorMessage = undefined;
          this.generateTweetService.loadGeneratedTweet(beginningOfTweet).subscribe(
            (generateTweetResponse: GenerateTweetResponse) => {
              this.isLoading = false;
              this.generatedTweets.unshift(generateTweetResponse);
            },
            (error: any) => {
              this.isLoading = false;
              this.errorMessage = error.message;
            }
          );
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
}
