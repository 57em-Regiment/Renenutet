import { Stock } from '@/generated/client';
import { StockGetPayload } from '@/generated/models';
import { Database } from '@/infrastructure/database';
import {
  CreateStock,
  UpdateStock,
} from '@57eme-regiment/renenutet-api-contract/schemas/stock.schema';
import { injectable } from 'tsyringe';

/** Contrat d'accès aux données pour les stocks. */
@injectable()
export class StockRepository {
  constructor(private readonly db: Database) {}

  /** Crée un nouveau stock pour un item dans un inventaire. */
  create(data: CreateStock): Promise<Stock> {
    return this.db.context.stock.create({ data });
  }

  /** Retourne tous les stocks. */
  findAll(): Promise<
    StockGetPayload<{ include: { productionRequest: true } }>[]
  > {
    return this.db.context.stock.findMany({
      include: { productionRequest: true },
    });
  }

  /**
   * Retourne le stock d'un item dans un inventaire via la clé composite,
   * ou `null` s'il est introuvable.
   */
  findByKey(itemId: string, inventoryId: string): Promise<Stock | null> {
    return this.db.context.stock.findUnique({
      where: { itemId_inventoryId: { itemId, inventoryId } },
    });
  }
  /**
   * Retourne le stock d'un item dans un inventaire via la clé composite,
   */
  findByKeyOrThrow(itemId: string, inventoryId: string): Promise<Stock | null> {
    return this.db.context.stock.findUniqueOrThrow({
      where: { itemId_inventoryId: { itemId, inventoryId } },
    });
  }

  /** Retourne tous les stocks associés à un inventaire. */
  findByInventory(
    inventoryId: string,
  ): Promise<StockGetPayload<{ include: { productionRequest: true } }>[]> {
    return this.db.context.stock.findMany({
      where: { inventoryId },
      include: { productionRequest: true },
    });
  }

  /** Retourne tous les stocks associés à un item. */
  findByItem(itemId: string): Promise<Stock[]> {
    return this.db.context.stock.findMany({ where: { itemId } });
  }

  /** Met à jour les champs d'un stock via la clé composite. */
  increment(
    itemId: string,
    inventoryId: string,
    data: UpdateStock,
  ): Promise<Stock> {
    return this.db.context.stock.update({
      where: { itemId_inventoryId: { itemId, inventoryId } },
      data: {
        quantity: {
          increment: data.quantity,
        },
      },
    });
  }
  /** Met à jour les champs d'un stock via la clé composite. */
  decrement(
    itemId: string,
    inventoryId: string,
    data: UpdateStock,
  ): Promise<Stock> {
    return this.db.context.stock.update({
      where: { itemId_inventoryId: { itemId, inventoryId } },
      data: {
        quantity: {
          decrement: data.quantity,
        },
      },
    });
  }
}
