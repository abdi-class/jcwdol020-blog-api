import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { verify } from "jsonwebtoken";
export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      throw { rc: 401, message: "Token is not exist" };
    }

    const checkToken: any = verify(token, process.env.TOKEN_KEY || "secret");

    const article = await prisma.article.create({
      data: { ...req.body, userId: checkToken.id },
    });
    res.status(201).send({
      rc: 201,
      success: true,
      result: article,
    });
  } catch (error) {
    next(error);
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const article = await prisma.article.findMany();
    res.status(200).send({
      rc: 200,
      success: true,
      result: article,
    });
  } catch (error) {
    console.log(error);
  }
};
