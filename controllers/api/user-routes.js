const router = require('express').Router();
const { User } = require('../../models')

// localhost:3001/api/users

// CREATE new user
router.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        // create the user and add it to the database
        const userData = await User.create(req.body);
        console.log('is it here?')

        // signed up, so session is also logged in!
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        // see if user exists in User table
        const userData = await User.findOne({
            where: {
                email: req.body.email
            },
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect, please try again!' });
            return;
        }

        // if they exist, validate pasword entered matches one in db using User's instance method
        const validatedPass = await userData.validatePassword(req.body.password);

        if (!validatedPass) {
            res.status(400).json({ message: 'Incorrect, please try again!' });
            return;
        }

        // if valid, session logged in!
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userData.id;
            res.status(200).json({ user: userData, message: 'You are logged in.' });
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    };
});

// Logout
router.post('/logout', async (req, res) => {
    // can only logout and destroy session if you're loggedin/have an active session:
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;

