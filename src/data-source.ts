import { DataSource } from "typeorm";
import { Product } from "./entities/Product";
import path from "path";

const databasePath = path.resolve(__dirname, "database", "db.sqlite");

const dataSource = new DataSource({
  type: "sqlite",
  database: databasePath,
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});

export default dataSource;
