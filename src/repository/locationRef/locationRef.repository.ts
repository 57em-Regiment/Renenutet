import type { createLocationRef, locationRef } from '@57eme-regiment/renenutet-api-contract';
import { Database } from '@/infrastructure/database';
import { injectable } from 'tsyringe';
import type { ILocationRefRepository } from './locationRef.repository.interface';

/** Implémentation Prisma du repository pour les références de localisation. */
@injectable()
export class LocationRefRepository implements ILocationRefRepository {
  constructor(private readonly db: Database) {}

  /** @inheritdoc */
  async createMany(data: createLocationRef[]): Promise<locationRef[]> {
    await this.db.context.ref_location.createMany({ data });
    return this.db.context.ref_location.findMany({
      where: { id: { in: data.map((d) => d.id) } },
    });
  }

  /** @inheritdoc */
  async deleteAll(): Promise<void> {
    await this.db.context.ref_location.deleteMany({});
  }
}
