import type { Stock } from "@/generated/client";
import type { IStockRepository } from "@/repository/stock/stock.repository.interface";
import { AppError } from "@/shared/errors/appError";
import { UpdateStock } from "@57eme-regiment/renenutet-api-contract/schemas/stock.schema";
import { inject, injectable } from "tsyringe";
import type { IStockService } from "./stock.service.interface";

/** Implémentation du service métier pour les stocks. */
@injectable()
export class StockService implements IStockService {
  constructor(
    @inject("IStockRepository")
    private readonly stockRepo: IStockRepository,
  ) {}

  /** @inheritdoc */
  async getAll(): Promise<Stock[]> {
    return this.stockRepo.findAll();
  }

  /** @inheritdoc */
  getByInventory(inventoryId: string): Promise<Stock[]> {
    return this.stockRepo.findByInventory(inventoryId);
  }

  /** @inheritdoc */
  getByItem(itemId: string): Promise<Stock[]> {
    return this.stockRepo.findByItem(itemId);
  }

  /** @inheritdoc */
  async getByKey(itemId: string, inventoryId: string): Promise<Stock> {
    const stock = await this.stockRepo.findByKey(itemId, inventoryId);
    if (!stock) throw new AppError("Stock not found", 404, "STOCK_NOT_FOUND");
    return stock;
  }

  /** @inheritdoc */
  async update(itemId: string, inventoryId: string, data: UpdateStock): Promise<Stock> {
    await this.getByKey(itemId, inventoryId);
    return this.stockRepo.update(itemId, inventoryId, data);
  }
}
