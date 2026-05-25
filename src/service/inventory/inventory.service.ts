import type { CreateInventory, Inventory, UpdateInventory } from '@57em-regiment/renenutet-api-contract';
import { AppError } from '@/shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import type { IInventoryRepository } from '@/repository/inventory/inventory.repository.interface';
import type { IInventoryService } from './inventory.service.interface';

@injectable()
export class InventoryService implements IInventoryService {
  constructor(
    @inject('IInventoryRepository')
    private readonly inventoryRepo: IInventoryRepository,
  ) {}

  async getAll(): Promise<Inventory[]> {
    return this.inventoryRepo.findAll();
  }

  async getById(id: string): Promise<Inventory> {
    const inventory = await this.inventoryRepo.findById(id);
    if (!inventory) throw new AppError('Inventory not found', 404, 'INVENTORY_NOT_FOUND');
    return inventory;
  }

  async create(data: CreateInventory): Promise<Inventory> {
    return this.inventoryRepo.create(data);
  }

  async update(id: string, data: UpdateInventory): Promise<Inventory> {
    await this.getById(id);
    return this.inventoryRepo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    return this.inventoryRepo.delete(id);
  }
}
