import type { CreateInventory, Inventory, UpdateInventory } from '@57em-regiment/renenutet-api-contract';
import { Database } from '@/infrastructure/database';
import { injectable } from 'tsyringe';
import type { IInventoryRepository } from './inventory.repository.interface';

@injectable()
export class InventoryRepository implements IInventoryRepository {
  constructor(private readonly db: Database) {}

  findAll(): Promise<Inventory[]> {
    return this.db.context.inventory.findMany({});
  }

  findById(id: string): Promise<Inventory | null> {
    return this.db.context.inventory.findUnique({ where: { id } });
  }

  create(data: CreateInventory): Promise<Inventory> {
    return this.db.context.inventory.create({ data });
  }

  update(id: string, data: UpdateInventory): Promise<Inventory> {
    return this.db.context.inventory.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.db.context.inventory.delete({ where: { id } });
  }
}
