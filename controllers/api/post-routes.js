const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// localhost:3001/api/posts

// GET all posts -all post just shows the post
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET one post -one post will also display comments associated with post if any
router.get('/:id', async (req, res) => {
    try {
        // find one post by its ID
        const postData = await Post.findByPk(req.params.id, {
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

        // serialize the data
        const post = postData.get({ plain: true })

        // pass into template
        res.render('onePost', { post, loggedIn: req.session.loggedIn });

    } catch (err) {
        res.status(400).json(err);
    }
});

// CREATE new post, need auth
router.post('/newPost', withAuth, async (req, res) => {
    try {
        const newPostData = {
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id  //attach user_id from session
        };

        const newPost = await Post.create(newPostData);

        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err);
    }
});

// update page: 
router.get('/:id/edit', withAuth, async (req, res) => {
    try {
        // find one post by its ID
        const postData = await Post.findByPk(req.params.id, {
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

        // serialize the data
        const post = postData.get({ plain: true })
        res.render('editPost', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE post 
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!updatedPost) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!deletedPost) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;