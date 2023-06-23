const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


// Homepage: GET ALL posts and render to homepage. available for everyone
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
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Dashboard: my posts
router.get('/my-posts', withAuth, async (req, res) => {
    try {
        const curentUser = req.session.user_id;
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
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
        res.render('homepage', { posts, loggedIn: req.session.loggedIn, curentUser });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Signup page
router.get('/signup', (req, res) => {
    res.render('signup');
})

// New Post page
router.get('/newPost', (req, res) => {
    res.render('newPost', { loggedIn: req.session.loggedIn });
});

// // Update Post page
// router.get('/editPost', (req, res) => {
//     res.render('editPost', { loggedIn: req.session.loggedIn })
// });


module.exports = router;