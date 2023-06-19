const withAuth = (req, res, next) => {
    // not logged in, redirect to /login route
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  