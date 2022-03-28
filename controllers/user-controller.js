var userModel= require('../models/user-model');

module.exports = {
  userList: (req, res) => {
    const alertMsg = req.query.alert;
    userModel.getUsers((data) => {
      res.render('user-list.ejs', { alertMsg, data: data } )
    })   
  },
  registerForm: (req, res) => {
    const alertMsg = req.query.alert;
    res.render('register-form.ejs', { alertMsg } );
  },
  deleteUser: (req, res) => {
    userModel.deleteUser(req.params.id, (username, msg) => {
      userModel.getUsers((data) => {
        res.render('user-list.ejs', { alertMsg: msg, data: data } )
      })
    })
  },
  createUser: (req, res) => {
    const showError = (msg) => {
      if (req.session && req.session.user) {
        res.redirect('/users?alert=' + msg);
      } else {
        res.redirect('/register?alert=' + msg);
      }
    }

    if (!req.body.username || !req.body.password) {
      showError('Fill the fields!');
    }
    userModel.createUser(req.body, (msg, isError) => {
      if (isError) {
        showError(msg);
      } else {
        if (req.session && req.session.user) {
          res.redirect('/users');
        } else {
          res.redirect('/login');
        }
      }
    })   
  }
}