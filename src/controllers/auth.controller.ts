import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";

// REGISTER USER
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
