const userController = require('../controllers/user-controller');
const userModel = require('../models/user-model');

const users = [ { username: 'user1' }, { username: 'user2' } ];
const user = { username: 'user1', password: 'password2' };
const msg = 'msg1';

jest.mock('../models/user-model', () => ({
  getUsers: (callback) => callback(users),
  deleteUser: (id, callback) => callback(users[0].username, msg),
  createUser: (body, callback) => callback(msg, false)
}))

test('should render userList', () => {
  const render = jest.fn();
  userController.userList({ query: { alert: msg } }, { render });
  expect(render).toHaveBeenCalledWith('user-list.ejs', { alertMsg: msg, data: users });
})

test('should deleteUser', () => {
  const render = jest.fn();
  userController.deleteUser({ params: { id: 1 } }, { render });
  expect(render).toHaveBeenCalledWith('user-list.ejs', { alertMsg: msg, data: users });
})

test('should createUser and redirect to login', () => {
  const redirect = jest.fn();
  userController.createUser({ body: user }, { redirect });
  expect(redirect.mock.calls.length).toBe(1);
  expect(redirect).toHaveBeenCalledWith('/login');
})

test('should createUser and redirect to users', () => {
  const redirect = jest.fn();
  userController.createUser({ body: user, session: { user: users[1] } }, { redirect });
  expect(redirect.mock.calls.length).toBe(1);
  expect(redirect).toHaveBeenCalledWith('/users');
})
