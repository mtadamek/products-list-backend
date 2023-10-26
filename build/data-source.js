"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Product_1 = require("./entities/Product");
const path_1 = __importDefault(require("path"));
const databasePath = path_1.default.resolve(__dirname, "database", "db.sqlite");
const dataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: databasePath,
    synchronize: true,
    logging: false,
    entities: [Product_1.Product],
    migrations: [],
    subscribers: [],
});
exports.default = dataSource;
