import { Database } from '@/infrastructure/database';
import type {
  createItemRef,
  itemRef,
} from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';

/** Contrat d'accès aux données pour les références d'articles. */
@injectable()
export class ItemRefRepository {
  constructor(private readonly db: Database) {}

  /** Insère plusieurs références et retourne les enregistrements créés. */
  async createMany(data: createItemRef[]): Promise<itemRef[]> {
    return this.db.context.ref_item.createManyAndReturn({ data });
  }

  /** Supprime toutes les références d'articles. */
  async deleteAll(): Promise<void> {
    await this.db.context.ref_item.deleteMany({});
  }
}
