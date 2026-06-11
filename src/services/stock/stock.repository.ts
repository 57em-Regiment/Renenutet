import { stock } from '@/drizzle/schema';
import {
  StockInsert,
  StockSelect,
  StockWithProductionRequests,
} from '@/drizzle/schema/zod';
import { Database } from '@/infrastructure/database';
import type { UpdateStock } from '@57eme-regiment/renenutet-api-contract/schemas/stock.schema';
import { and, eq, sql } from 'drizzle-orm';
import { injectable } from 'tsyringe';

@injectable()
export class StockRepository {
  constructor(private readonly db: Database) {}

  async create(data: StockInsert): Promise<StockSelect> {
    const result = await this.db.context.insert(stock).values(data).returning();
    return result[0];
  }

  findAll(): Promise<StockWithProductionRequests[]> {
    return this.db.context.query.stock.findMany({
      with: { productionRequests: true },
    });
  }

  findByKey(itemId: string, inventoryId: string): Promise<StockSelect | undefined> {
    return this.db.context.query.stock.findFirst({
      where: and(eq(stock.itemId, itemId), eq(stock.inventoryId, inventoryId)),
    });
  }

  async findByKeyOrThrow(itemId: string, inventoryId: string): Promise<StockSelect> {
    const result = await this.db.context.query.stock.findFirst({
      where: and(eq(stock.itemId, itemId), eq(stock.inventoryId, inventoryId)),
    });
    if (!result) throw new Error(`Stock not found: ${itemId}/${inventoryId}`);
    return result;
  }

  findByInventory(inventoryId: string): Promise<StockWithProductionRequests[]> {
    return this.db.context.query.stock.findMany({
      where: eq(stock.inventoryId, inventoryId),
      with: { productionRequests: true },
    });
  }

  findByItem(itemId: string): Promise<StockSelect[]> {
    return this.db.context.select().from(stock).where(eq(stock.itemId, itemId));
  }

  async increment(itemId: string, inventoryId: string, data: UpdateStock): Promise<StockSelect> {
    const result = await this.db.context
      .update(stock)
      .set({ quantity: sql`${stock.quantity} + ${data.quantity}` })
      .where(and(eq(stock.itemId, itemId), eq(stock.inventoryId, inventoryId)))
      .returning();
    return result[0];
  }

  async decrement(itemId: string, inventoryId: string, data: UpdateStock): Promise<StockSelect> {
    const result = await this.db.context
      .update(stock)
      .set({ quantity: sql`${stock.quantity} - ${data.quantity}` })
      .where(and(eq(stock.itemId, itemId), eq(stock.inventoryId, inventoryId)))
      .returning();
    return result[0];
  }
}
