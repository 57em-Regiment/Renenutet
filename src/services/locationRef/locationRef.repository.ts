import { refLocation } from '@/drizzle/schema';
import { RefLocationInsert, RefLocationSelect } from '@/drizzle/schema/zod';
import { Database } from '@/infrastructure/database';
import { injectable } from 'tsyringe';

@injectable()
export class LocationRefRepository {
  constructor(private readonly db: Database) {}

  async createMany(data: RefLocationInsert[]): Promise<RefLocationSelect[]> {
    return this.db.context.insert(refLocation).values(data).returning();
  }

  async deleteAll(): Promise<void> {
    await this.db.context.delete(refLocation);
  }
}
