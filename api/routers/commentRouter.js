const router = require('express').Router();
const commentController = require('../controllers/commentController');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('./verifyToken');
// create comment
router.post('/', verifyToken,commentController.createComment )
// get comment
router.get('/:id',commentController.getComment )
// delete comment
router.delete('/:id', verifyTokenAndAuthorization,commentController.deleteComment )
// update comment
router.put('/:id', verifyTokenAndAuthorization,commentController.editComment )
module.exports = router