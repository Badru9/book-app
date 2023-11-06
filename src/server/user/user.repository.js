const prisma = require("../db");

const findUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

const insertUser = async (newUserData) => {
  const user = await prisma.user.create({
    data: {
      name: newUserData.name,
      password: newUserData.password,
    },
  });

  return user;
};

const deleteUser = async (id) => {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
};

const editUser = async (id, userData) => {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: userData.name,
      password: userData.password,
    },
  });
  return user;
};

module.exports = {
  findUsers,
  findUserById,
  insertUser,
  deleteUser,
  editUser,
};
