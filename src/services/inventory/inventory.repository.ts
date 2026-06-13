import { inventory } from '@/drizzle/schema';
import { InventoryInsert, InventorySelect, InventoryUpdate } from '@/drizzle/schema/zod';
import { Database } from '@/infrastructure/database';
import type { CreateInventory, UpdateInventoryCode } from '@57eme-regiment/renenutet-api-contract';
import { eq, inArray } from 'drizzle-orm';
import { injectable } from 'tsyringe';

@injectable()
export class InventoryRepository {
  constructor(private readonly db: Database) {}

  findAll(): Promise<InventorySelect[]> {
    return this.db.context.select().from(inventory);
  }

  findByIds(ids: string[]): Promise<InventorySelect[]> {
    if (ids.length === 0) return Promise.resolve([]);
    return this.db.context.select().from(inventory).where(inArray(inventory.id, ids));
  }

  findAllIds(): Promise<{ id: string }[]> {
    return this.db.context.select({ id: inventory.id }).from(inventory);
  }

  async findByIdOrThrow(id: string): Promise<InventorySelect> {
    const result = await this.db.context
      .select()
      .from(inventory)
      .where(eq(inventory.id, id))
      .limit(1);
    if (!result[0]) throw new Error(`Inventory not found: ${id}`);
    return result[0];
  }

  async getInventoryCodeAsync(id: string): Promise<{ code: string | null } | undefined> {
    const result = await this.db.context
      .select()
      .from(inventory)
      .where(eq(inventory.id, id))
      .limit(1);
    if (!result[0]) return undefined;
    return { code: result[0].accessCode ?? null };
  }

  async updateCode(id: string, { code }: UpdateInventoryCode): Promise<InventorySelect> {
    const result = await this.db.context
      .update(inventory)
      .set({ accessCode: code })
      .where(eq(inventory.id, id))
      .returning();
    return result[0];
  }

  async create(data: CreateInventory): Promise<InventorySelect> {
    const result = await this.db.context
      .insert(inventory)
      .values(data as InventoryInsert)
      .returning();
    return result[0];
  }

  async update(id: string, data: InventoryUpdate): Promise<InventorySelect> {
    const result = await this.db.context
      .update(inventory)
      .set(data)
      .where(eq(inventory.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<void> {
    await this.db.context.delete(inventory).where(eq(inventory.id, id));
  }
}
