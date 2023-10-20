import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Products API is here!");
});

app.listen(port, () => {
  console.log(`Products API is running at http://localhost:${port}`);
});
