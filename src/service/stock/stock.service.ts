import { AppError } from "@/shared/errors/appError";
import { inject, injectable } from "tsyringe";
import type { Inventory, Stock } from "@/generated/client";
import type { IStockRepository } from "@/repository/stock/stock.repository.interface";

import type { IStockService } from "./stock.service.interface";
import { UpdateStock } from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";

@injectable()
export class InventoryService implements IStockService {
  constructor(
    @inject("IStockRepository")
    private readonly stockRepo: IStockRepository,
  ) {}
  async getByInventory(inventoryId: string): Promise<Stock[] | null> {
    return await this.stockRepo.findStocskByInventory(inventoryId);
  }
  getByItem(itemId: string): Promise<Stock[] | null> {
    return this.stockRepo.getStockByItem(itemId);
  }
  getStock(id: string, itemId: string): Promise<Stock | null> {
    const stock = this.stockRepo.getStock(id, itemId);
    if (!stock)
      throw new AppError("Inventory not found", 404, "INVENTORY_NOT_FOUND");
    return stock;
  }

  async getAll(): Promise<Stock[]> {
    return this.stockRepo.findAll();
  }

  async getById(id: string): Promise<Stock> {
    const stock = await this.stockRepo.findById(id);
    if (!stock)
      throw new AppError("Inventory not found", 404, "INVENTORY_NOT_FOUND");
    return stock;
  }

  async update(id: string, data: UpdateStock): Promise<Stock> {
    await this.getById(id);
    return this.stockRepo.update(id, data);
  }
}
