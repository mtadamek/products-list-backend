import { body, param } from "express-validator";

const bodyRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("name")
    .isLength({ max: 100 })
    .withMessage("Name must be shorter than 100 characters"),
  body("price").notEmpty().withMessage("Price is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price cant be less than 0"),
  body("count").notEmpty().withMessage("Count is required"),
  body("count").isInt({ min: 0 }).withMessage("Count cant be less than 0"),
  body("date").notEmpty().withMessage("Date is required"),
  body("date")
    .isISO8601()
    .toDate()
    .withMessage("Date is incorrect. Date format must be YYYY-MM-DD"),
  body("category").notEmpty().withMessage("Category is required"),
  body("category").isIn([0, 1, 2]).withMessage("Category must be in 0, 1, 2"),
  body("description")
    .isLength({ max: 2000 })
    .withMessage("Description must be shorter than 2000 characters"),
];

const paramRules = [
  param("id")
    .isInt({ min: 0 })
    .withMessage("Id must be numeric and cant be less than 0"),
];

export default { body: bodyRules, params: paramRules };
