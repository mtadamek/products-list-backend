"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = require("../entities/Product");
const data_source_1 = __importDefault(require("../data-source"));
const productValidationRules_1 = __importDefault(require("../middlewares/productValidationRules"));
const validationResultHandle_1 = __importDefault(require("../middlewares/validationResultHandle"));
const router = (0, express_1.Router)();
const productRepository = data_source_1.default.getRepository(Product_1.Product);
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productRepository.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
router.get("/:id", productValidationRules_1.default.params, validationResultHandle_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productRepository.findOneBy({ id: Number(id) });
        product ? res.status(200).json(product) : res.sendStatus(404);
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
router.post("/", productValidationRules_1.default.body, validationResultHandle_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productRepository.insert(req.body);
        res.status(201).json(product.raw);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
router.put("/:id", productValidationRules_1.default.params, productValidationRules_1.default.body, validationResultHandle_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { affected: isUpdated } = yield productRepository.update(id, req.body);
        isUpdated ? res.sendStatus(200) : res.sendStatus(404);
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
router.delete("/:id", productValidationRules_1.default.params, validationResultHandle_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { affected: isDeleted } = yield productRepository.delete(id);
        isDeleted ? res.sendStatus(200) : res.sendStatus(404);
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
exports.default = router;
