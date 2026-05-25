import type { Inventory } from '@/generated/client';
import type { CreateInventory, UpdateInventory } from '@/models/inventory/inventory.schema';

export interface IInventoryService {
  getAll(): Promise<Inventory[]>;
  getById(id: string): Promise<Inventory>;
  create(data: CreateInventory): Promise<Inventory>;
  update(id: string, data: UpdateInventory): Promise<Inventory>;
  delete(id: string): Promise<void>;
}
