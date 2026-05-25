import { Database } from "@/infrastructure/database";
import {
  CreateInventory,
  UpdateInventory,
} from "@/models/inventory/inventory.schema";
import { Stock } from "@/generated/client";
import { injectable } from "tsyringe";
import { IStockRepository } from "./stock.repository.interface";
import {
  CreateStock,
  UpdateStock,
} from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";

@injectable()
export class StockRepository implements IStockRepository {
  constructor(private readonly db: Database) {}

  findStocskByInventory(invId: string): Promise<Stock[] | null> {
    return this.db.context.stock.findMany({ where: { inventoryId: invId } });
  }
  getStockByItem(itemId: string): Promise<Stock[] | null> {
    return this.db.context.stock.findMany({ where: { itemId } });
  }
  getStock(id: string, itemId: string): Promise<Stock | null> {
    return this.db.context.stock.findUnique({ where: { id, itemId } });
  }
  findAll(): Promise<Stock[]> {
    return this.db.context.stock.findMany({});
  }
  findById(id: string): Promise<Stock | null> {
    return this.db.context.stock.findUnique({ where: { id } });
  }
  update(id: string, data: UpdateStock): Promise<Stock> {
    return this.db.context.stock.update({ where: { id }, data });
  }
  //   create(data: CreateStock): Promise<Stock> {
  //     return this.db.context.stock.create({ data });
  //   }
}
