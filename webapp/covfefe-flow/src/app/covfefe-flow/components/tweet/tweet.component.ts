import { Component, Input } from '@angular/core';

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

  get tweetLink(): string {
    return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(this.text);
  }
}
