import type { Stock } from "@/generated/client";
import type {
  CreateStock,
  UpdateStock,
} from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";

export interface IStockService {
  getAll(): Promise<Stock[]>;
  getById(id: string): Promise<Stock>;
  getByInventory(inventoryId: string): Promise<Stock[] | null>;
  getByItem(itemId: string): Promise<Stock[] | null>;
  getStock(id: string, itemId: string): Promise<Stock | null>;
  update(id: string, data: UpdateStock): Promise<Stock>;
}
