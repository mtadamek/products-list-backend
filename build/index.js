"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = __importDefault(require("./data-source"));
const products_1 = __importDefault(require("./routes/products"));
dotenv_1.default.config();
data_source_1.default
    .initialize()
    .then(() => {
    console.log("Database has been initialized!");
})
    .catch((err) => {
    console.error("Error during database initialization:", err);
});
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(express_1.default.json());
app.use("/products", products_1.default);
app.get("/", (_, res) => {
    res.send("Products API is here!");
});
app.listen(port, () => {
    console.log(`Products API is running at http://localhost:${port}`);
});
