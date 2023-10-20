import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  database: "../database/db.sqlite",
  synchronize: true,
  logging: true,
  entities: [],
  migrations: [],
  subscribers: [],
});

export default dataSource;
