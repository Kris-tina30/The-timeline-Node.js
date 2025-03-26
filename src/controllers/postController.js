const Post = require('../models/posts');
const Comment = require('../models/commentModel');
const data = require('../data');

const homePage = (req, res) => {
  Post.find()

    .sort({ createdAt: -1 })

    .then((result) => {
      const formattedData = result.map((post) => ({
        ...post._doc,
        createdAt: new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }).format(post.createdAt),
      }));
      res.render('index', { data: formattedData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

const addPost = (req, res) => {
  const addNewPost = new Post(req.body);
  addNewPost
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

const addComment = (req, res) => {
  const addNewComment = new Comment(req.body);
  addNewComment
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

const notFoundPage = (req, res) => {};

module.exports = {
  homePage,
  addPost,
  addComment,
  notFoundPage,
};
