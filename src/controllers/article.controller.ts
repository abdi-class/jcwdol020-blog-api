import { Request, Response } from "express";
import { prisma } from "../config/prisma";
export const createArticle = async (req: Request, res: Response) => {
  try {
    const article = await prisma.article.create({
      data: req.body,
    });
    res.status(201).send({
      rc: 201,
      success: true,
      result: article,
    });
  } catch (error) {
    console.log(error);
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
