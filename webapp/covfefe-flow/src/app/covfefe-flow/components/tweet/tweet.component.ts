import { Component, Input } from '@angular/core';

import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent {
  @Input() text: string;
  @Input() timestamp: Date;
  @Input() fullname: string;
  @Input() username: string;
  @Input() numberOfReplies: number;
  @Input() numberOfRetweets: number;
  @Input() numberOfLikes: number;

  get tweetLink(): string {
    return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(this.text) + '&via=' + environment.twitterUsername;
  }
}
