const app = require('express');
const Post = require('../models/post');

module.exports = (app) => {

  app.get('/', (req, res) => {
    return res.render('home');
    })
    // GET request
  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
    })

  // CREATE
  app.post('/posts/new', (req, res) => {
    // Post.create(req.body, function (err, post) {  
    //   if (err) return handleError(err);  // saved!
    //   console.log(post);
    // });
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    console.log(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err) => {
      console.log(err);
      if (err) { return console.log(err)}
      console.log(post);
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

};