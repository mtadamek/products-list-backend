import { Router, Request, Response } from "express";
import { Product } from "../entities/Product";
import dataSource from "../data-source";

const router = Router();
const productRepository = dataSource.getRepository(Product);

router.get("/", async (_: Request, res: Response) => {
  try {
    const products = await productRepository.find();
    res.status(200).send(products);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productRepository.findOneBy({ id: Number(id) });
    product ? res.status(200).send(product) : res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await productRepository.insert(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { affected: isUpdated } = await productRepository.update(
      id,
      req.body
    );
    isUpdated ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { affected: isDeleted } = await productRepository.delete(id);
    isDeleted ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
