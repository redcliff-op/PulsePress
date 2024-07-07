import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

export class Headlines extends Model {
  static table = 'headlines';

  @text('source_id') sourceId;
  @text('source_name') sourceName;
  @text('url_to_image') urlToImage;
  @text('title') title;
  @text('content') content;
  @text('author') author;
  @text('description') description;
  @text('published_at') publishedAt;
  @text('url') url;
}

export class TopHeadlines extends Model {
  static table = 'top_headlines';

  @text('source_id') sourceId;
  @text('source_name') sourceName;
  @text('url_to_image') urlToImage;
  @text('title') title;
  @text('content') content;
  @text('author') author;
  @text('description') description;
  @text('published_at') publishedAt;
  @text('url') url;
}
