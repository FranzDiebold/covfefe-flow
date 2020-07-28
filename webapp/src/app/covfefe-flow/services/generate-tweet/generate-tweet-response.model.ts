export interface GenerateTweetResponse {
  beginningOfTweet: string;
  temperature: number;
  generatedTweet: string;
  timestamp: Date;
  numberOfReplies?: number;
  numberOfRetweets?: number;
  numberOfLikes?: number;
}
