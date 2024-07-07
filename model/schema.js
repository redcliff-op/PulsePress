import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: 'headlines',
      columns: [
        { name: 'source_id', type: 'string' },
        { name: 'source_name', type: 'string' },
        { name: 'url_to_image', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'author', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'published_at', type: 'string' },
        { name: 'url', type: 'string' }
      ]
    }),
    tableSchema({
      name: 'top_headlines',
      columns: [
        { name: 'source_id', type: 'string' },
        { name: 'source_name', type: 'string' },
        { name: 'url_to_image', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'author', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'published_at', type: 'string' },
        { name: 'url', type: 'string' }
      ]
    })
  ]
});
