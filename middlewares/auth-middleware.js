module.exports = {
  auth: (req, res, next) => {
    if (req.session && req.session.user)
      return next();
    else
      return res.redirect('/login');
  },
  authAdmin: (req, res, next) => {
    if (req.session && req.session.user && req.session.isAdmin)
      return next();
    else
      return res.redirect('/stored-images');
  }
}