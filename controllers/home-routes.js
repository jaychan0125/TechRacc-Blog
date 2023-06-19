const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


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

// LOGIN
router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router;