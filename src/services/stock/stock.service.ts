import type { Stock } from '@/generated/client';
import { AppError } from '@/shared/errors/appError';
import { UpdateStock } from '@57eme-regiment/renenutet-api-contract/schemas/stock.schema';
import { injectable } from 'tsyringe';
import { StockRepository } from './stock.repository';

/** Service métier pour la gestion des stocks. */
@injectable()
export class StockService {
  constructor(private readonly stockRepo: StockRepository) {}

  /** Retourne tous les stocks. */
  async getAll(): Promise<Stock[]> {
    return this.stockRepo.findAll();
  }

  /** Retourne tous les stocks d'un inventaire donné. */
  getByInventory(inventoryId: string): Promise<Stock[]> {
    return this.stockRepo.findByInventory(inventoryId);
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
    const stock = await this.stockRepo.findByKey(itemId, inventoryId);
    if (!stock) throw new AppError('Stock not found', 404, 'STOCK_NOT_FOUND');
    return stock;
  }

  /**
   * Met à jour le stock d'un item dans un inventaire.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async update(
    itemId: string,
    inventoryId: string,
    data: UpdateStock,
  ): Promise<Stock> {
    await this.getByKey(itemId, inventoryId);
    return this.stockRepo.update(itemId, inventoryId, data);
  }
}
