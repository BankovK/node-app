const imageController = require('../controllers/image-controller');
const imageModel = require('../models/image-model');
// const { promisify } = require('util');

const unlinkAsync = jest.fn();
// const promisify = jest.fn().mockReturnValue(unlinkAsync);
const images = [ { image_name: 'image1' }, { image_name: 'image2' } ];
const msg = 'msg1';
const fileName = 'fileName1';

jest.mock('../models/image-model', () => ({
  getImages: (callback) => callback(images),
  deleteImage: (id, callback) => callback(fileName, msg)
}))
// jest.mock('util', () => ({
//   promisify: promisify
// }))

test('should render imageList', () => {
  const render = jest.fn();
  imageController.imageList({}, { render });
  expect(render).toHaveBeenCalledWith('image-list.ejs', { data: images });
})

test('should unlink on deleteImage', () => {
  const render = jest.fn();
  imageController.deleteImage({ params: { id: 1 } }, { render });
  // expect(unlinkAsync).toHaveBeenCalled();
  expect(render).toHaveBeenCalledWith('image-list.ejs', { alertMsg: msg, data: images });
})