const express = require('express');

const router = express.Router();

const path = require('path');

const commentController = require('../controllers/comment.controller');

router.get('/create-comment/:id', commentController.goToCreateComment);

router.post('/create-comment/:id', commentController.addComment);

router.get('/user-comments/:id', commentController.getUserComments);

router.get('/edit-comment/:id/:commentId', commentController.goToEditCommentPage);

router.post('/edit-comment/:id/:commentId', commentController.editComment);

router.post('/delete-comment/:id/:commentId', commentController.deleteComment);

module.exports = router
