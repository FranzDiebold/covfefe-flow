export interface AutocompleteTweetResponse {
  beginningOfTweet: string;
  temperature: number;
  autocompletedTweet: string;
  timestamp: Date;
  numberOfReplies?: number;
  numberOfRetweets?: number;
  numberOfLikes?: number;
}
