import dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
// import router
import authRouter from "./routers/auth.router";
import articleRouter from "./routers/article.router";

const PORT: string | number = process.env.PORT || 2500;

const app: Application = express();

// define main middleware
app.use(express.json());

// define routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Welcome to Blog API</h1>");
});

app.use("/auth", authRouter);
app.use("/article", articleRouter);

// error handling response
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error :", error);
  res.status(error.rc || 500).send(error);
});

app.listen(PORT, () => {
  console.log("BLOG API is RUNNING", PORT);
});
