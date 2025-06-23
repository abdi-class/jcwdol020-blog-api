import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";

// REGISTER USER
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      throw { rc: 400, message: "User already exist" };
    }

    const newUser = await prisma.user.create({
      data: { ...req.body, role: req.body.role || "author" },
    });

    res.status(201).send({
      success: true,
      message: "User register success",
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN USER
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
