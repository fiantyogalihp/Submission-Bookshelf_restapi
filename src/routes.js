const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  getDataByOtherMethodhandler,
  getFormatDatasHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "*",
    path: "/{any*}",
    handler: getDataByOtherMethodhandler,
  },
  {
    method: "GET",
    path: "/",
    handler: getFormatDatasHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
  {
    method: "*",
    path: "/books/{any*}",
    handler: getDataByOtherMethodhandler,
  },
];

module.exports = routes;
