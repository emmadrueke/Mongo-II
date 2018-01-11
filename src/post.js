const mongoose = require('mongoose');

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/so-posts', { useMongoClient: true });

const PostSchema = new mongoose.Schema({
  // TODO: write your schema here
  soID: {
    type: Number,
    required: true,
    index: true,
    unique: true,
  },
  parentID: {
    type: Number,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  tags: [String],
  acceptedAnswerID: {
    type: Number,
    required: false,
  },
  user: {
    soUserID: {
      type: Number,
    },
    name: {
      type: String,
    },
    reputation: {
      type: Number,
    },
  },
});

module.exports = mongoose.model('Posts', PostSchema);
