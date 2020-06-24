const app = require('express');
const Post = require('../models/post');

module.exports = (app) => {

    // GET request
    app.get('/posts/new', (req, res) => {
		var currentUser = req.user;
		if (req.user) {
		  res.render('posts-new', { currentUser });
		} else {
			res.redirect('/');
		}
    })
  
	// CREATE
	app.post("/posts/new", (req, res) => {
		console.log(req.user);
		if (req.user) {
			var post = new Post(req.body);
	
			post.save(function(err, post) {
				return res.redirect(`/`);
			});
		} else {
			return res.status(401); // UNAUTHORIZED
		}
	});
    // Index ROUTE
    app.get('/', (req, res) => {
		var currentUser = req.user;

      	Post.find({}).lean()
        	.then(posts => {
        	  	res.render("posts-index", { posts, currentUser});
        	})
        	.catch(err => {
        	  	console.log(err.message);
        	});
    })
    // Show single post
    app.get("/posts/:id", function(req, res) {
		var currentUser = req.user;
      	// LOOK UP THE POST
		Post.findById(req.params.id).populate('comments').then((post) => {
			res.render('posts-show', { post: post.toObject() })
		  }).catch((err) => {
			console.log(err.message)
		  })
	});
	  // SUBREDDIT
	app.get("/n/:subreddit", function(req, res) {
		var currentUser = req.user;
		Post.find({ subreddit: req.params.subreddit })
			.lean()
		  	.then(posts => {
				//   console.log(posts);
				res.render("posts-index", { posts });
		  	})
		  	.catch(err => {
				console.log(err);
		  	});
	});
};