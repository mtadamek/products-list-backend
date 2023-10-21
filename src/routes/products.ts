import { Router, Request, Response } from "express";
import { Product } from "../entities/Product";
import dataSource from "../data-source";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    const productRepository = dataSource.getRepository(Product);
    const products = await productRepository.find();
    res.status(200).send(products);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
