import { productionRequest, stock } from '@/drizzle/schema';
import {
  ProductionRequestInsert,
  ProductionRequestSelect,
  ProductionRequestWithStock,
  StockSelect,
} from '@/drizzle/schema/zod';
import { Database } from '@/infrastructure/database';
import { AppError } from '@57eme-regiment/nabu-errors';
import { eq, inArray } from 'drizzle-orm';
import { injectable } from 'tsyringe';

@injectable()
export class ProductionRequestsRepository {
  constructor(private readonly db: Database) {}

  async create(
    data: ProductionRequestInsert,
  ): Promise<ProductionRequestSelect> {
    const result = await this.db.context
      .insert(productionRequest)
      .values(data)
      .returning();
    return result[0];
  }

  async updateQuantity(
    id: string,
    quantity: number,
  ): Promise<ProductionRequestSelect> {
    const result = await this.db.context
      .update(productionRequest)
      .set({ quantity })
      .where(eq(productionRequest.id, id))
      .returning();
    if (!result[0])
      throw new AppError('Production request not found', 404, 'NOT_FOUND');
    return result[0];
  }

  async delete(id: string): Promise<void> {
    await this.db.context
      .delete(productionRequest)
      .where(eq(productionRequest.id, id));
  }

  async findAll(): Promise<ProductionRequestWithStock[]> {
    const prs = await this.db.context.query.productionRequest.findMany({});
    return this.attachStocks(prs);
  }

  async findByInventory(
    inventoryId: string,
  ): Promise<ProductionRequestWithStock[]> {
    const prs = await this.db.context.query.productionRequest.findMany({
      where: eq(productionRequest.inventoryId, inventoryId),
    });
    return this.attachStocks(prs);
  }

  async findByItem(
    itemId: string,
  ): Promise<ProductionRequestWithStock[]> {
    const prs = await this.db.context.query.productionRequest.findMany({
      where: eq(productionRequest.itemId, itemId),
    });
    return this.attachStocks(prs);
  }

  async findFirstByIdOrThrow(
    prId: string,
  ): Promise<ProductionRequestWithStock> {
    const result = await this.db.context.query.productionRequest.findFirst({
      where: eq(productionRequest.id, prId),
    });
    if (!result)
      throw new AppError('Production request not found', 404, 'NOT_FOUND');
    return this.attachStocks([result]).then(r => r[0]);
  }

  private async attachStocks(
    prs: ProductionRequestSelect[],
  ): Promise<ProductionRequestWithStock[]> {
    if (prs.length === 0) return [];
    const itemIds = [...new Set(prs.map(pr => pr.itemId))];
    const stocks = await this.db.context.query.stock.findMany({
      where: inArray(stock.itemId, itemIds),
    });
    const stocksByItemId = stocks.reduce((map, s) => {
      map.set(s.itemId, [...(map.get(s.itemId) ?? []), s]);
      return map;
    }, new Map<string, StockSelect[]>());

    return prs.map(pr => ({
      ...pr,
      stocks: stocksByItemId.get(pr.itemId) ?? [],
    }));
  }
}
