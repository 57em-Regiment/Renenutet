import { CreateStock, UpdateStock } from "@/models/stock/stock.schema";
import { Stock } from "@/generated/client";

export interface IStockRepository {
  findAll(): Promise<Stock[]>;
  findById(id: string): Promise<Stock | null>;
  update(id: string, data: UpdateStock): Promise<Stock>;
}
