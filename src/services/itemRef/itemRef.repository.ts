import { refItem } from '@/drizzle/schema';
import { RefItemInsert, RefItemSelect } from '@/drizzle/schema/zod';
import { Database } from '@/infrastructure/database';
import { injectable } from 'tsyringe';

@injectable()
export class ItemRefRepository {
  constructor(private readonly db: Database) {}

  async createMany(data: RefItemInsert[]): Promise<RefItemSelect[]> {
    return this.db.context.insert(refItem).values(data).returning();
  }

  async deleteAll(): Promise<void> {
    await this.db.context.delete(refItem);
  }
}
