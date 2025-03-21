const express = require('express');
const router = express.Router();
const data = require('./data');

// render data
router.get('/', (req, res) => {
  res.render('index', { data });
});

module.exports = router;
