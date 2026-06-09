import { productionRequest, stock } from '@/drizzle/schema';
import { Database } from '@/infrastructure/database';
import type {
  CreateStock,
  UpdateStock,
} from '@57eme-regiment/renenutet-api-contract/schemas/stock.schema';
import { and, eq, sql } from 'drizzle-orm';
import { injectable } from 'tsyringe';

export type Stock = typeof stock.$inferSelect;
export type StockWithProductionRequests = typeof stock.$inferSelect & {
  productionRequests: (typeof productionRequest.$inferSelect)[];
};

/** Accès aux données de la table `Stock`. */
@injectable()
export class StockRepository {
  constructor(private readonly db: Database) {}

  /** Insère un nouveau stock et retourne l'enregistrement créé. */
  async create(data: CreateStock): Promise<Stock> {
    const result = await this.db.context.insert(stock).values(data).returning();
    return result[0];
  }

  /** Retourne tous les stocks avec leurs demandes de production associées. */
  findAll(): Promise<StockWithProductionRequests[]> {
    return this.db.context.query.stock.findMany({
      with: { productionRequests: true },
    });
  }

  /**
   * Retourne le stock d'un item dans un inventaire via la clé composite.
   * @returns `undefined` si le couple (itemId, inventoryId) est introuvable.
   */
  findByKey(itemId: string, inventoryId: string): Promise<Stock | undefined> {
    return this.db.context.query.stock.findFirst({
      where: and(eq(stock.itemId, itemId), eq(stock.inventoryId, inventoryId)),
    });
  }

  /**
   * Retourne le stock d'un item dans un inventaire via la clé composite.
   * @throws {Error} si le couple (itemId, inventoryId) est introuvable.
   */
  async findByKeyOrThrow(itemId: string, inventoryId: string): Promise<Stock> {
    const result = await this.db.context.query.stock.findFirst({
      where: and(eq(stock.itemId, itemId), eq(stock.inventoryId, inventoryId)),
    });
    if (!result) throw new Error(`Stock not found: ${itemId}/${inventoryId}`);
    return result;
  }

  /** Retourne tous les stocks d'un inventaire avec leurs demandes de production associées. */
  findByInventory(inventoryId: string): Promise<StockWithProductionRequests[]> {
    return this.db.context.query.stock.findMany({
      where: eq(stock.inventoryId, inventoryId),
      with: { productionRequests: true },
    });
  }

  /** Retourne tous les stocks associés à un item. */
  findByItem(itemId: string): Promise<Stock[]> {
    return this.db.context.select().from(stock).where(eq(stock.itemId, itemId));
  }

  /** Incrémente la quantité d'un stock et retourne l'enregistrement mis à jour. */
  async increment(itemId: string, inventoryId: string, data: UpdateStock): Promise<Stock> {
    const result = await this.db.context
      .update(stock)
      .set({ quantity: sql`${stock.quantity} + ${data.quantity}` })
      .where(and(eq(stock.itemId, itemId), eq(stock.inventoryId, inventoryId)))
      .returning();
    return result[0];
  }

  /** Décrémente la quantité d'un stock et retourne l'enregistrement mis à jour. */
  async decrement(itemId: string, inventoryId: string, data: UpdateStock): Promise<Stock> {
    const result = await this.db.context
      .update(stock)
      .set({ quantity: sql`${stock.quantity} - ${data.quantity}` })
      .where(and(eq(stock.itemId, itemId), eq(stock.inventoryId, inventoryId)))
      .returning();
    return result[0];
  }
}
