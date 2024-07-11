import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 3,
      steps: [
        createTable({
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
        createTable({
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
      ],
      toVersion: 4,
      steps: [
        createTable({
          name: 'saved',
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
      ],
      toVersion: 5,
      steps: [
        createTable({
          name: 'history',
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
      ]
    }
  ]
});
