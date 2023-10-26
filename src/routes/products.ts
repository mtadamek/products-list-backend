import { Router, Request, Response } from "express";
import { Product } from "../entities/Product";
import dataSource from "../data-source";
import validationRules from "../middlewares/productValidationRules";
import validationResultHandle from "../middlewares/validationResultHandle";

const router = Router();
const productRepository = dataSource.getRepository(Product);

router.get("/", async (_: Request, res: Response) => {
  try {
    const products = await productRepository.find();
    res.status(200).json(products);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get(
  "/:id",
  validationRules.params,
  validationResultHandle,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await productRepository.findOneBy({ id: Number(id) });
      product ? res.status(200).json(product) : res.sendStatus(404);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post(
  "/",
  validationRules.body,
  validationResultHandle,
  async (req: Request, res: Response) => {
    try {
      const product = await productRepository.insert(req.body);
      res.status(201).json(product.raw);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.put(
  "/:id",
  validationRules.params,
  validationRules.body,
  validationResultHandle,
  async (req: Request, res: Response) => {
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
  }
);

router.delete(
  "/:id",
  validationRules.params,
  validationResultHandle,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { affected: isDeleted } = await productRepository.delete(id);
      isDeleted ? res.sendStatus(200) : res.sendStatus(404);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export default router;
