const express = require("express");
const cors = require("cors");

const PORT = 2000;

const app = express();
app.use(cors());

app.use(express.json());

app.listen(PORT, () => console.log(`App listening on ${PORT}`));

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

const bookController = require("../book/book.controller");
const userController = require("../user/user.controller");

app.use("/books", bookController);
app.use("/users", userController);
