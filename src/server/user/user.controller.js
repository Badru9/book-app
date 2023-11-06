const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUserById,
  editUserById,
  getUserById,
} = require("./user.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).send(users);
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await getUserById(id);

    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUserData = req.body;

    const user = await createUser(newUserData);

    res.send({
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteUserById(parseInt(id));
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PUT => mengubah data secara keseluruhan
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  if (!(userData.name && userData.password)) {
    return res.status(400).send("Some Fields are Missing");
  }

  const user = await editUserById(id, bookData);
  return res.status(201).send({
    data: user,
    message: "Update book successfully",
  });
});

// PATCH => dapat mengubah data per field / data ( price saja )
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;

    const user = await editUserById(parseInt(id), userData);

    res.send({
      data: user,
      message: "Patch book successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
