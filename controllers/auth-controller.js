var userModel= require('../models/user-model');

module.exports = {
  loginForm: (req, res) => {
    res.render('login-form.ejs');
  },
  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      res.send('login failed');    
    } else {
      userModel.getUser({username, password}, (data) => {
        res.render('upload-form.ejs', { alertMsg: data } )
      })
      req.session.user = username;
      res.redirect('/stored-images');
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  }
}