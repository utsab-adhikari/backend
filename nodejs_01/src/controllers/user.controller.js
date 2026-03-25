import { handleError } from "../errors/HandleError.js";
import { parseBody } from "../utils/parseBody.js";
import { prisma } from "../db/prisma.js";
import { Response } from "../middleware/Response.js";

export const createUserController = async (req, res) => {
  try {
    const body = parseBody(req);
    const data = await body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return Response.json({
        res,
        status: 400,
        success: false,
        message: "User with this email already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });

    return Response.json({
      res,
      status: 201,
      data: user,
      message: "User created successfully",
    });
  } catch (err) {
    handleError({
      err,
      message: "Failed to create user",
      status: 400,
      type: "USER_CREATION_ERROR",
      logToDB: true,
      req,
      res,
    });
  }
};

export const getUsersController = async (req, res) => {
  try {
     const users = await prisma.user.findMany();

    if(users.length === 0) {
      return Response.json({
        res,
        status: 200,
        success: true,
        data: [],
        message: "No users found",
      });
    }

    return Response.json({
      res,
      status: 200,
      success: true,
      data: users,
    }); 
  } catch (err) {
    handleError({
      err,
      message: "Failed to fetch users",
      status: 500,
      type: "USER_FETCH_ERROR",
      logToDB: true,
      req,
      res,
    });
  }
};

export const deleteAllUsersController = async (req, res) => {
  try {
    await prisma.user.deleteMany();
    return Response.json({
      res,
      status: 200,
      success: true,
      message: "All users deleted successfully",
    });
  } catch (err) {
    handleError({
      err,
      message: "Failed to delete users",
      status: 500,
      type: "USER_DELETION_ERROR",
      logToDB: true,
      req,
      res,
    });
  }
}
