import { Database } from '@/infrastructure/database';
import {
  CreateInventory,
  UpdateInventory,
} from '@/models/inventory/inventory.schema';
import { Inventory } from '@/generated/client';
import { injectable } from 'tsyringe';
import { IInventoryRepository } from './inventory.repository.interface';
// import type { CreateUserInput, UpdateUserInput } from './users.schema';

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

  // async findAll(): Promise<User[]> {
  //   return this.db.client.user.findMany();
  // }

  // async findById(id: string): Promise<User | null> {
  //   return this.db.client.user.findUnique({ where: { id } });
  // }

  // async findByEmail(email: string): Promise<User | null> {
  //   return this.db.client.user.findUnique({ where: { email } });
  // }

  // async create(data: CreateUserInput): Promise<User> {
  //   return this.db.client.user.create({ data });
  // }

  // async update(id: string, data: UpdateUserInput): Promise<User> {
  //   return this.db.client.user.update({ where: { id }, data });
  // }

  // async delete(id: string): Promise<void> {
  //   await this.db.client.user.delete({ where: { id } });
  // }
}
