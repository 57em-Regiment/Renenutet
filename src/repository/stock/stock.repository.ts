import { Database } from "@/infrastructure/database";
import {
  CreateInventory,
  UpdateInventory,
} from "@/models/inventory/inventory.schema";
import { Stock } from "@/generated/client";
import { injectable } from "tsyringe";
import { IStockRepository } from "./stock.repository.interface";
import { CreateStock, UpdateStock } from "@/models/stock/stock.schema";
// import type { CreateUserInput, UpdateUserInput } from './users.schema';

@injectable()
export class InventoryRepository implements IStockRepository {
  constructor(private readonly db: Database) {}
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
