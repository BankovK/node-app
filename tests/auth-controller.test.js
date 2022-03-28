const authController = require('../controllers/auth-controller');
const userModel = require('../models/user-model');

jest.mock('../models/user-model', () => ({
  getUser: (inputValues, callback) => callback({ is_admin: true }, null)
}))

test('should redirect and set as admin on login', () => {
  const req = {
    session: {
      isAdmin: false,
    },
    body: {
      username: 'user1',
      password: '123'
    }
  };
  const redirect = jest.fn();
  authController.login(req, { redirect });
  expect(redirect).toHaveBeenCalled();
  expect(req.session.isAdmin).toBe(true);
})

test('should fail on login', () => {
  const send = jest.fn();
  const status = jest.fn().mockReturnValue({ send });
  const req = {
    session: {
      isAdmin: false,
    },
    body: {
      username: '',
      password: '123'
    }
  };
  authController.login(req, { status });
  expect(status).toHaveBeenCalled();
  expect(send).toHaveBeenCalled();
})

test('should destroy session on logout', () => {
  const destroy = jest.fn();
  const req = {
    session: {
      destroy
    }
  };
  const redirect = jest.fn();
  authController.logout(req, { redirect });
  expect(destroy).toHaveBeenCalled();
  expect(redirect).toHaveBeenCalled();
})