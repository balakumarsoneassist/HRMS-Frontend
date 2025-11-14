const express = require('express');
const app = express();

const posts = [
  { id: 1, title: 'My first post', content: 'Hello world!' },
  { id: 2, title: 'Another post', content: 'Learning Express!' }
];

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  res.json(post);
});

app.listen(5000, () => console.log('Server running on port 5000'));