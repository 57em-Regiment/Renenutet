import type { Stock } from '@/generated/client';
import { StockGetPayload } from '@/generated/models';
import { krangApi } from '@/lib/api-client';
import { AppError } from '@57eme-regiment/nabu-errors';
import {
  CreateStock,
  StockDetails,
  UpdateStock,
} from '@57eme-regiment/renenutet-api-contract/schemas/stock.schema';
import { injectable } from 'tsyringe';
import { StockRepository } from './stock.repository';

/** Service métier pour la gestion des stocks. */
@injectable()
export class StockService {
  constructor(private readonly stockRepo: StockRepository) {}

  /**
   * Crée un stock pour un item dans un inventaire.
   * @throws {AppError} 409 si le couple (itemId, inventoryId) existe déjà.
   */
  async create(data: CreateStock): Promise<Stock> {
    const existing = await this.stockRepo.findByKey(
      data.itemId,
      data.inventoryId,
    );
    if (existing)
      throw new AppError(
        'Stock already exists for this item in this inventory',
        409,
        'STOCK_ALREADY_EXISTS',
      );
    return this.stockRepo.create(data);
  }

  /** Retourne tous les stocks. */
  async getAll(): Promise<StockDetails[]> {
    const stocks = await this.stockRepo.findAll();
    return this.enrichWithItems(stocks);
  }

  /** Retourne tous les stocks d'un inventaire donné. */
  async getByInventory(inventoryId: string): Promise<StockDetails[]> {
    const stocks = await this.stockRepo.findByInventory(inventoryId);
    return this.enrichWithItems(stocks);
  }

  private async enrichWithItems(
    stocks: StockGetPayload<{ include: { productionRequest: true } }>[],
  ): Promise<StockDetails[]> {
    const itemResponse = await krangApi.item.getAll();
    if (itemResponse.status !== 200)
      throw new AppError('Failed to fetch items', 400, 'ITEMS_FETCH_FAILED');

    const itemsById = new Map(itemResponse.body.map(i => [i.id, i]));

    return stocks.map(
      stock =>
        ({
          ...stock,
          minimumQuantity: stock.minimumQuantity,
          item: { ...itemsById.get(stock.itemId) },
          productionRequest: stock.productionRequest,
        }) satisfies StockDetails,
    );
  }

  /** Retourne tous les stocks pour un item donné. */
  getByItem(itemId: string): Promise<Stock[]> {
    return this.stockRepo.findByItem(itemId);
  }

  /**
   * Retourne le stock précis d'un item dans un inventaire via la clé composite.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async getByKey(itemId: string, inventoryId: string): Promise<Stock> {
    const stock = await this.stockRepo.findByKeyOrThrow(itemId, inventoryId);
    if (!stock) throw new AppError('Stock not found', 404, 'STOCK_NOT_FOUND');
    return stock;
  }

  /**
   * Met à jour le stock d'un item dans un inventaire.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async increment(
    itemId: string,
    inventoryId: string,
    data: UpdateStock,
  ): Promise<Stock> {
    await this.getByKey(itemId, inventoryId);
    return this.stockRepo.increment(itemId, inventoryId, data);
  }
  /**
   * Met à jour le stock d'un item dans un inventaire.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async decrement(
    itemId: string,
    inventoryId: string,
    data: UpdateStock,
  ): Promise<Stock> {
    await this.getByKey(itemId, inventoryId);
    return this.stockRepo.decrement(itemId, inventoryId, data);
  }
}
