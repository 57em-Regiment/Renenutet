import { Stock } from '@/generated/client';
import { Database } from '@/infrastructure/database';
import { UpdateStock } from '@57em-regiment/renenutet-api-contract/schemas/stock.schema';
import { injectable } from 'tsyringe';
import { IStockRepository } from './stock.repository.interface';

/** Implémentation Prisma du repository pour les stocks. */
@injectable()
export class StockRepository implements IStockRepository {
  constructor(private readonly db: Database) {}

  /** @inheritdoc */
  findStocskByInventory(invId: string): Promise<Stock[] | null> {
    return this.db.context.stock.findMany({ where: { inventoryId: invId } });
  }

  /** @inheritdoc */
  getStockByItem(itemId: string): Promise<Stock[] | null> {
    return this.db.context.stock.findMany({ where: { itemId } });
  }

  /** @inheritdoc */
  getStock(inventoryId: string, itemId: string): Promise<Stock | null> {
    return this.db.context.stock.findUnique({ where: { inventoryId, itemId } });
  }

  /** @inheritdoc */
  findAll(): Promise<Stock[]> {
    return this.db.context.stock.findMany({});
  }

  /** @inheritdoc */
  findById(id: string): Promise<Stock | null> {
    return this.db.context.stock.findUnique({ where: { id } });
  }

  /** @inheritdoc */
  update(id: string, data: UpdateStock): Promise<Stock> {
    return this.db.context.stock.update({ where: { id }, data });
  }
}
