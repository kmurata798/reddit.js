const app = require('express');
const Post = require('../models/post');

module.exports = (app) => {

  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id)
      .then(post => {
        console.log(post);
        res.render("posts-show", { post: post.toObject() });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.get('/', (req, res) => {
    Post.find({}).lean()
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err.message);
      });
  })
    // GET request
  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
  })

  // CREATE
  app.post('/posts/new', (req, res) => {
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