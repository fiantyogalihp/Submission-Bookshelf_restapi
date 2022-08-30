const { nanoid } = require("nanoid");
const bookshelf = require("./bookshelf");

const addBookHandler = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage } =
    req.payload;

  const id = nanoid(16);

  let { reading = false } = req.payload;

  const finished = readPage === pageCount;

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
  }

  if (readPage > pageCount) {
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
  const { name: qName, reading, finished } = req.query;

  let result = bookshelf;

  // ? Name query
  if (qName) {
    result = result.filter((book) =>
      book.name.toLowerCase().includes(qName.toLowerCase())
    );
  }

  // ? Reading query
  if (reading) {
    result = result.filter((book) => book.reading == Boolean(Number(reading)));
  }

  // ? Finished query
  if (finished) {
    result = result.filter(
      (book) => book.finished == Boolean(Number(finished))
    );
  }

  const response = h
    .response({
      status: "success",
      data: {
        books: result.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    .code(200);
  return response;
};

const getBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const book = bookshelf.filter((b) => b.id === bookId)[0];

  if (book) {
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

  const finished = readPage === pageCount;
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

const getFormatDatasHandler = (req, h) => {
  const response = h
    .response({
      info: `server running on port: ${process.env.NODE_PORT}`,
      status: "success",
      format_data: {
        id: "Qbax5Oy7L8WKf74l",
        name: "Buku A",
        year: 2010,
        author: "John Doe",
        summary: "Lorem ipsum dolor sit amet",
        publisher: "Dicoding Indonesia",
        pageCount: 100,
        readPage: 25,
        finished: false,
        reading: false,
        insertedAt: "2021-03-04T09:11:44.598Z",
        updatedAt: "2021-03-04T09:11:44.598Z",
      },
    })
    .code(200);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  getDataByOtherMethodhandler,
  getFormatDatasHandler,
};
