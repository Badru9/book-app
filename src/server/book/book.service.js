const {
  findBooks,
  insertBook,
  findBookById,
  editBook,
  deleteBook,
} = require("./book.repository");

const getAllProducts = async () => {
  const books = await findBooks();
  return books;
};

const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw new Error("ID must be a number");
  }

  const book = await findBookById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

const createBook = async (newBookData) => {
  const book = await insertBook(newBookData);
  return book;
};

const deleteBookById = async (id) => {
  if (typeof id !== "number") {
    throw new Error("ID must be a number");
  }

  await getProductById(id);

  await deleteBook(id);
};

const editBookById = async (id, bookData) => {
  await getProductById(id);

  await editBook(id, bookData);
};

module.exports = {
  getAllProducts,
  getProductById,
  createBook,
  deleteBookById,
  editBookById,
};
