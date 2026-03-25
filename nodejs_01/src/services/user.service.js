import { prisma } from "../db/prisma.js";
import { handleError } from "../errors/HandleError.js";

export const createUser = async (data) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      handleError({
        err: new Error("Email already in use"),
        message: "User creation failed",
        status: 400,
        type: "USER_CREATION_ERROR",
        logToDB: false,
      });
    }

    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  } catch (err) {
    handleError({
      err,
      message: "Failed to create user",
      status: 400,
      type: "USER_CREATION_ERROR",
      logToDB: true,
    });
  }
};

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      handleError({
        err: new Error("No users found"),
        message: "User fetch failed",
        status: 404,
        type: "USER_FETCH_ERROR",
        logToDB: false,
      });
    }
    return users;
  } catch (err) {
    handleError({
      err,
      message: "Failed to fetch users",
      status: 500,
      type: "USER_FETCH_ERROR",
      logToDB: true,
    });
  }
};
