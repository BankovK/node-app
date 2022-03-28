var userModel= require('../models/user-model');

module.exports = {
  loginForm: (req, res) => {
    res.render('login-form.ejs');
  },
  login: (req, res) => {
    req.session.isAdmin = false;
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      res.status(400).send('login failed');    
    } else {
      userModel.getUser({username, password}, (data, msg) => {
        req.session.user = username;
        req.session.isAdmin = data.is_admin;
        res.redirect('/stored-images');
      })
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  }
}