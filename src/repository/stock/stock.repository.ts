import { Stock } from "@/generated/client";
import { Database } from "@/infrastructure/database";
import { UpdateStock } from "@57eme-regiment/renenutet-api-contract/schemas/stock.schema";
import { injectable } from "tsyringe";
import { IStockRepository } from "./stock.repository.interface";

/** Implémentation Prisma du repository pour les stocks. */
@injectable()
export class StockRepository implements IStockRepository {
  constructor(private readonly db: Database) {}

  /** @inheritdoc */
  findAll(): Promise<Stock[]> {
    return this.db.context.stock.findMany({});
  }

  /** @inheritdoc */
  findByKey(itemId: string, inventoryId: string): Promise<Stock | null> {
    return this.db.context.stock.findUnique({
      where: { itemId_inventoryId: { itemId, inventoryId } },
    });
  }

  /** @inheritdoc */
  findByInventory(inventoryId: string): Promise<Stock[]> {
    return this.db.context.stock.findMany({ where: { inventoryId } });
  }

  /** @inheritdoc */
  findByItem(itemId: string): Promise<Stock[]> {
    return this.db.context.stock.findMany({ where: { itemId } });
  }

  /** @inheritdoc */
  update(itemId: string, inventoryId: string, data: UpdateStock): Promise<Stock> {
    return this.db.context.stock.update({
      where: { itemId_inventoryId: { itemId, inventoryId } },
      data,
    });
  }
}
