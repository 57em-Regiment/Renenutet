import type { CreateInventory, Inventory, UpdateInventory } from '@57em-regiment/renenutet-api-contract';

export interface IInventoryService {
  getAll(): Promise<Inventory[]>;
  getById(id: string): Promise<Inventory>;
  create(data: CreateInventory): Promise<Inventory>;
  update(id: string, data: UpdateInventory): Promise<Inventory>;
  delete(id: string): Promise<void>;
}
