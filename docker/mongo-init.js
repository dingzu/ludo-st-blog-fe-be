// MongoDB初始化脚本
db = db.getSiblingDB('ludost-blog');

// 创建应用用户
db.createUser({
  user: 'ludost-user',
  pwd: 'ludost-password',
  roles: [
    {
      role: 'readWrite',
      db: 'ludost-blog'
    }
  ]
});

// 创建集合和索引
db.createCollection('users');
db.createCollection('posts');
db.createCollection('categories');
db.createCollection('tags');
db.createCollection('comments');
db.createCollection('migrations');

// 创建索引
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.posts.createIndex({ slug: 1 }, { unique: true });
db.posts.createIndex({ author: 1 });
db.posts.createIndex({ publishedAt: -1 });
db.categories.createIndex({ slug: 1 }, { unique: true });
db.tags.createIndex({ slug: 1 }, { unique: true });
db.comments.createIndex({ post: 1 });
db.comments.createIndex({ createdAt: -1 });

print('Database initialized successfully!');
