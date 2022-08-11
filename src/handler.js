const { nanoid } = require("nanoid");
const bookshelf = require("./bookshelf");

const addBookHandler = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage } =
    req.payload;

  const id = nanoid(16);

  let { reading = false } = req.payload;

  let finished = false;

  // let finished = false;
  // let reading = false;

  if (pageCount === readPage) finished = true;
  // if (readPage > 0 && readPage < pageCount) reading = true;
  // if (readPage === 0 || readPage === pageCount) reading = false;

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === undefined || name === "") {
    const response = h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
    return response;
  }

  bookshelf.push(newBook);

  const isSuccessful = bookshelf.filter((book) => book.id === id).length > 0;

  if (isSuccessful) {
    const response = h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201);
    return response;
  }

  const response = h
    .response({
      status: "error",
      message: "Buku gagal ditambahkan",
    })
    .code(500);
  return response;
};

const getAllBooksHandler = (req, h) => {
  const { name } = req.query;

  let { reading, finished } = req.query;

  let result = bookshelf;

  // ? Name query
  if (name !== undefined) {
    result = bookshelf.filter((book) =>
      String(book.name).toLowerCase().includes(String(name).toLowerCase())
    );
  }

  // ? Reading query
  if (reading !== undefined) {
    result = bookshelf.filter((book) => book.reading === (reading === "1"));
  }

  // ? Finished query
  if (finished !== undefined) {
    result = bookshelf.filter((book) => book.finished === (finished === "1"));
  }

  const finalBooks = result.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = h
    .response({
      status: "success",
      data: {
        books: finalBooks,
      },
    })
    .code(200);
  return response;
};

const getBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const book = bookshelf.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book: book,
      },
    };
  }

  const response = h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
  return response;
};

const editBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const { name, year, author, summary, publisher, pageCount, readPage } =
    req.payload;

  let { reading } = req.payload;

  let finished = false;

  if (pageCount === readPage) finished = true;
  // if (readPage > 0 && readPage < pageCount) reading = true;
  // if (readPage === 0 || readPage === pageCount) reading = false;

  const updatedAt = new Date().toISOString();

  if (name === undefined || name === "") {
    const response = h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
    return response;
  }

  const index = bookshelf.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookshelf[index] = {
      ...bookshelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    })
    .code(404);
  return response;
};

const deleteBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const findBook = bookshelf.findIndex((book) => book.id === bookId);

  if (findBook !== -1) {
    bookshelf.splice(bookId);

    const response = h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    })
    .code(404);
  return response;
};

const getDataByOtherMethodhandler = (req, h) => {
  const { any } = req.params;

  const response = h
    .response({
      status: "fail",
      message: `Halaman ${any} tidak ditemukan`,
    })
    .code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  getDataByOtherMethodhandler,
};
