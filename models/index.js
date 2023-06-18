const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User can have multiple Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// Post can only belongsTo one User
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// User can have multiple Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// Comment can only belongsTo one User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Post can have multiple Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});
// Comment can only belongsTo one Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };
