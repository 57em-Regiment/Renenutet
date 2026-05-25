import { AppError } from "@/shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import type { Inventory, Stock } from "@/generated/client";
import type { IStockRepository } from "@/repository/stock/stock.repository.interface";

import type { IStockService } from "./stock.service.interface";
import { UpdateStock } from "@/models/stock/stock.schema";

@injectable()
export class InventoryService implements IStockService {
  constructor(
    @inject("IStockRepository")
    private readonly stockRepo: IStockRepository,
  ) {}

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
