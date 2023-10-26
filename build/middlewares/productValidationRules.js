"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bodyRules = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("name")
        .isLength({ max: 100 })
        .withMessage("Name must be shorter than 100 characters"),
    (0, express_validator_1.body)("price").notEmpty().withMessage("Price is required"),
    (0, express_validator_1.body)("price").isFloat({ min: 0 }).withMessage("Price cant be less than 0"),
    (0, express_validator_1.body)("count").notEmpty().withMessage("Count is required"),
    (0, express_validator_1.body)("count").isInt({ min: 0 }).withMessage("Count cant be less than 0"),
    (0, express_validator_1.body)("date").notEmpty().withMessage("Date is required"),
    (0, express_validator_1.body)("date")
        .isISO8601()
        .toDate()
        .withMessage("Date is incorrect. Date format must be YYYY-MM-DD"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("Category is required"),
    (0, express_validator_1.body)("category").isIn([0, 1, 2]).withMessage("Category must be in 0, 1, 2"),
    (0, express_validator_1.body)("description")
        .isLength({ max: 2000 })
        .withMessage("Description must be shorter than 2000 characters"),
];
const paramRules = [
    (0, express_validator_1.param)("id")
        .isInt({ min: 0 })
        .withMessage("Id must be numeric and cant be less than 0"),
];
exports.default = { body: bodyRules, params: paramRules };
