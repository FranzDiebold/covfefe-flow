export interface GenerateTweetResponse {
  beginning_of_tweet: string;
  temperature: number;
  generated_tweet: string;
  timestamp: Date;
  number_of_replies?: number;
  number_of_retweets?: number;
  number_of_likes?: number;
}
