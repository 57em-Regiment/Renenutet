import { Database } from '@/infrastructure/database';
import type {
  createItemRef,
  itemRef,
} from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';
import type { IItemRefRepository } from './itemRef.repository.interface';

/** Implémentation Prisma du repository pour les références d'articles. */
@injectable()
export class ItemRefRepository implements IItemRefRepository {
  constructor(private readonly db: Database) {}

  /** @inheritdoc */
  async createMany(data: createItemRef[]): Promise<itemRef[]> {
    return this.db.context.ref_item.createManyAndReturn({ data });
  }

  /** @inheritdoc */
  async deleteAll(): Promise<void> {
    await this.db.context.ref_item.deleteMany({});
  }
}
