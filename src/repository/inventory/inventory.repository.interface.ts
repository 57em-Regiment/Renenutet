import type { CreateInventory, Inventory, UpdateInventory } from '@57em-regiment/renenutet-api-contract';

export interface IInventoryRepository {
  findAll(): Promise<Inventory[]>;
  findById(id: string): Promise<Inventory | null>;
  create(data: CreateInventory): Promise<Inventory>;
  update(id: string, data: UpdateInventory): Promise<Inventory>;
  delete(id: string): Promise<void>;
}
