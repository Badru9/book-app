const {
  findUsers,
  findUserById,
  editUser,
  deleteUser,
  insertUser,
} = require("./user.repository");

const getAllUsers = async () => {
  const users = await findUsers();
  return users;
};

const getUserById = async (id) => {
  if (typeof id !== "number") {
    throw new Error("ID must be a number");
  }

  const user = await findUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const createUser = async (newUserData) => {
  const user = await insertUser(newUserData);
  return user;
};

const deleteUserById = async (id) => {
  if (typeof id !== "number") {
    throw new Error("ID must be a number");
  }

  await getUserById(id);

  await deleteUser(id);
};

const editUserById = async (id, userData) => {
  await getUserById(id);

  await editUser(id, userData);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  editUserById,
};
