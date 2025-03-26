const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
  {
    userComment: {
      type: String,
      required: true,
      minlength: [25, 'Your Message must by more than 25 characters!'],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('comment', commentSchema);
