const express = require("express");
const {
  getAllProducts,
  getProductById,
  deleteBookById,
  editBookById,
  createBook,
} = require("./book.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await getAllProducts();
  res.status(200).send(books);
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const book = await getProductById(id);

    res.send(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newBookData = req.body;

    const book = await createBook(newBookData);

    res.send({
      data: book,
      message: "Book created successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteBookById(parseInt(id));
    res.send("Product deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PUT => mengubah data secara keseluruhan
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const bookData = req.body;

  if (
    !(
      bookData.name &&
      bookData.price &&
      bookData.publisher &&
      bookData.publicationYear &&
      bookData.placeOfPublication &&
      bookData.image &&
      bookData.stock
    )
  ) {
    return res.status(400).send("Some Fields are Missing");
  }

  const book = await editBookById(parseInt(id), bookData);
  return res.status(201).send({
    data: book,
    message: "Update book successfully",
  });
});

// PATCH => dapat mengubah data per field / data ( price saja )
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookData = req.body;

    const book = await editBookById(parseInt(id), bookData);

    res.send({
      data: book,
      message: "Patch book successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
