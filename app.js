const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/styles', express.static(path.join(__dirname, 'public', 'styles')));

let blogPosts = [];

app.get('/', (req, res) => {
    res.render('index', { page: 'home', blogPosts });
});

app.get('/about', (req, res) => {
    res.render('about', { page: 'about', blogPosts });
});

app.get('/contacts', (req, res) => {
    res.render('contacts', { page: 'contacts', blogPosts });
});

app.get('/new-post', (req, res) => {
    res.render('newpost');
});
app.post('/new-post', (req, res) => {
    const { title, content } = req.body;
    const id = Date.now(); 
    blogPosts.push({ id, title, content });
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('index', { blogPosts });
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const id = Date.now(); 
    blogPosts.push({ id, title, content });
    res.redirect('/');
});

app.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogPosts.find(post => post.id === parseInt(postId));
    res.render('blog-post', { post });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
