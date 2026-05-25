import {
  CreateStock,
  UpdateStock,
} from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";
import { Stock } from "@/generated/client";

export interface IStockRepository {
  findAll(): Promise<Stock[]>;
  findById(id: string): Promise<Stock | null>;
  findStocskByInventory(invId: string): Promise<Stock[] | null>;
  getStockByItem(itemId: string): Promise<Stock[] | null>;
  getStock(id: string, itemId: string): Promise<Stock | null>;
  update(id: string, data: UpdateStock): Promise<Stock>;
}
