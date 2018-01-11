const bodyParser = require('body-parser');
const express = require('express');

const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests

server.use(bodyParser.json());

// TODO: write your route handlers here
server.get('/accepted-answer/:soID', (req, res) => {
  Post.findOne({ soID: req.params.soID })
    .then((post) => {
      Post.findOne({ soID: post.acceptedAnswerID })
        .then((answer) => {
          if (!answer) {
            throw new Error('Answer Does Not Exist');
          }
          res.status(200).json(answer);
        })
        .catch((error) => {
          res.status(422).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(422).json({ error: error.message });
    });
});

server.get('/top-answer/:soID', (req, res) => {
  Post.findOne({ soID: req.params.soID })
    .then((post) => {
      Post.findOne({ parentID: post.soID }).sort({ score: -1 }).where('soID').ne(post.acceptedAnswerID)
      .then((answer) => {
        if (!answer) {
          throw new Error('Answer Does Not Exist');
        }
        res.status(200).json(answer);
      })
      .catch((error) => {
        res.status(422).json({ error: error.message });
      });
    })
    .catch((error) => {
      res.status(422).json({ error: error.message });
    });
});

server.get('/popular-jquery-questions', (req, res) => {
  Post.find({tags: 'jquery'}).
});

module.exports = { server };
