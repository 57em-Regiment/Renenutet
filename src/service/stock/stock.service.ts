import type { Stock } from '@/generated/client';
import type { IStockRepository } from '@/repository/stock/stock.repository.interface';
import { AppError } from '@/shared/errors/appError';
import { UpdateStock } from '@57em-regiment/renenutet-api-contract/schemas/stock.schema';
import { inject, injectable } from 'tsyringe';
import type { IStockService } from './stock.service.interface';

/** Implémentation du service métier pour les stocks. */
@injectable()
export class StockService implements IStockService {
  constructor(
    @inject('IStockRepository')
    private readonly stockRepo: IStockRepository,
  ) {}

  /** @inheritdoc */
  async getByInventory(inventoryId: string): Promise<Stock[] | null> {
    return await this.stockRepo.findStocskByInventory(inventoryId);
  }

  /** @inheritdoc */
  getByItem(itemId: string): Promise<Stock[] | null> {
    return this.stockRepo.getStockByItem(itemId);
  }

  /** @inheritdoc */
  getStock(inventoryId: string, itemId: string): Promise<Stock | null> {
    const stock = this.stockRepo.getStock(inventoryId, itemId);
    if (!stock) throw new AppError('Stock not found', 404, 'STOCK_NOT_FOUND');
    return stock;
  }

  /** @inheritdoc */
  async getAll(): Promise<Stock[]> {
    return this.stockRepo.findAll();
  }

  /** @inheritdoc */
  async getById(id: string): Promise<Stock> {
    const stock = await this.stockRepo.findById(id);
    if (!stock) throw new AppError('Stock not found', 404, 'STOCK_NOT_FOUND');
    return stock;
  }

  /** @inheritdoc */
  async update(id: string, data: UpdateStock): Promise<Stock> {
    await this.getById(id);
    return this.stockRepo.update(id, data);
  }
}
