const prisma = require("../db");

const findBooks = async () => {
  const book = await prisma.book.findMany();
  return book;
};

const findBookById = async (id) => {
  const book = await prisma.book.findUnique({
    where: {
      bookId: id,
    },
  });
  return book;
};

const insertBook = async (newBookData) => {
  const book = await prisma.book.create({
    data: {
      name: newBookData.name,
      price: newBookData.price,
      publisher: newBookData.publisher,
      publicationYear: newBookData.publicationYear,
      placeOfPublication: newBookData.placeOfPublication,
      image: newBookData.image,
    },
  });

  return book;
};

const deleteBook = async (id) => {
  await prisma.book.delete({
    where: {
      bookId: id,
    },
  });
};

const editBook = async (id, bookData) => {
  const book = await prisma.book.update({
    where: {
      bookId: id,
    },
    data: {
      name: bookData.name,
      price: bookData.price,
      publisher: bookData.publisher,
      publicationYear: bookData.publicationYear,
      placeOfPublication: bookData.placeOfPublication,
      image: bookData.image,
    },
  });
  return book;
};

module.exports = {
  findBooks,
  findBookById,
  insertBook,
  deleteBook,
  editBook,
};
