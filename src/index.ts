import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataSource from "./data-source";
import productsRouter from "./routes/products";

dotenv.config();

dataSource
  .initialize()
  .then(() => {
    console.log("Database has been initialized!");
  })
  .catch((err) => {
    console.error("Error during database initialization:", err);
  });

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/products", productsRouter);

app.get("/", (_: Request, res: Response) => {
  res.send("Products API is here!");
});

app.listen(port, () => {
  console.log(`Products API is running at http://localhost:${port}`);
});
