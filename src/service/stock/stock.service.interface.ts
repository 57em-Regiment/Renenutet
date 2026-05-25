import type { Stock } from "@/generated/client";
import type { CreateStock, UpdateStock } from "@/models/stock/stock.schema";

export interface IStockService {
  getAll(): Promise<Stock[]>;
  getById(id: string): Promise<Stock>;
  update(id: string, data: UpdateStock): Promise<Stock>;
}
