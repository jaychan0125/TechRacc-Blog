const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// localhost:3001/api/comments

// newComment
router.post('/newComment', async (req, res) => {
    try {
        const commentData = {
            comment: req.body.comment,
            post_id: req.body.postId,
            user_id: req.session.user_id  //attach user_id from session
        }
        
        const newComment = await Comment.create(commentData, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Post,
                    attributes: ['id']
                }
            ]
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;