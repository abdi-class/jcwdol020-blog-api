import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
// import router
import authRouter from "./routers/auth.router";

const PORT: string | number = process.env.PORT || 2500;

const app: Application = express();

// define main middleware
app.use(express.json());

// define routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Welcome to Blog API</h1>");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("BLOG API is RUNNING", PORT);
});
