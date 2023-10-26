import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "double", unsigned: true })
  price: number;

  @Column({ type: "int", unsigned: true })
  count: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "tinyint" })
  category: number;

  @Column({ length: 2000, nullable: true })
  description: string;
}
