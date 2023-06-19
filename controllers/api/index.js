const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);   // localhost:3001/api/users
router.use('/posts', postRoutes);   // localhost:3001/api/posts
// router.use('/comments', commentRoutes);   // localhost:3001/api/comments

module.exports = router;
