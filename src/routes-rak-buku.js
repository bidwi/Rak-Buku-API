const {
  getBukuDwiDariBookId,
  putBukuDwiDariId,
  postBukuDwi,
  getAllBukuDwi,
  deleteBukuDwiDariBookId,
} = require('./handler-rak-buku');

const routes = [
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBukuDwiDariBookId,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBukuDwi,
  },
  {
    method: 'POST',
    path: '/books',
    handler: postBukuDwi,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBukuDwiDariBookId,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: putBukuDwiDariId,
  },
];

module.exports = routes;
