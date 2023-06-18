const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../../utils/auth');


// GET ALL posts and render to homepage. available for everyone
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        // serialize data to js object so the template can read it: 
        const posts = postData.map((post) => post.get({ plain: true }));

        // pass into template
        res.render('homepage', { posts });
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET ONE by id
router.get('/:id', async (req, res) => {
    try {
        // find one post by its ID
        const postData = await Post.findByPk({
            include: [
                // include the username of the user who made the post
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    // include comments associated with the post
                    model: Comment,
                    include: [{
                        // include the username of the user who made the comment
                        model: User,
                        attributes: ['username']
                    }]
                }
            ]
        });

        // serialize data to js object so the template can read it: 
        const posts = postData.map((post) => post.get({ plain: true }));

        // pass into template
        res.render('homepage', { posts });        
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET 



















module.exports = router;