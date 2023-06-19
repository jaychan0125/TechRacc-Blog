const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// localhost:3001/api/comments

// newComment
router.post('newComment', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            post_id: req.body.post_id
        }, {
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

