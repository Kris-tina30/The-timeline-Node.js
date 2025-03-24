const Post = require('../models/posts');
const data = require('../data');

const homePage = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error'); // Додано відповідь на випадок помилки
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
const notFoundPage = (req, res) => {};

module.exports = {
  homePage,
  addPost,
  notFoundPage,
};
