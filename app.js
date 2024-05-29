const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express();

// connect to db
const dbURI = 'mongodb+srv://haseebshah:test1234@cluster0.b1qbvue.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},    
    ];
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create' , { title: 'Create A New Blog'});
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
})