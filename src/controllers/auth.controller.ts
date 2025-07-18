import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/hash";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

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
      throw { rc: 400, success: false, message: "User already exist" };
    }

    const newUser = await prisma.user.create({
      data: {
        ...req.body,
        password: await hashPassword(req.body.password),
        role: req.body.role || "author",
      },
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
    const findUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!findUser) {
      throw { rc: 404, message: "User not exist" };
    }

    const comparePass = await compare(req.body.password, findUser.password);
    if (!comparePass) {
      throw { rc: 401, message: "Password is wrong" };
    }

    const token = sign(
      { id: findUser.id, role: findUser.role },
      process.env.TOKEN_KEY || "secret",
      { expiresIn: "1h" }
    );

    res.status(200).send({
      username: findUser.username,
      email: findUser.email,
      imgProfile: findUser.imgProfile,
      role: findUser.role,
      token,
    });
  } catch (error) {
    next(error);
  }
};
