import { refItem } from '@/drizzle/schema';
import { Database } from '@/infrastructure/database';
import type { createItemRef, itemRef } from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';

/** Accès aux données de la table `ref_item`. */
@injectable()
export class ItemRefRepository {
  constructor(private readonly db: Database) {}

  /** Insère plusieurs références d'item en lot et retourne les enregistrements créés. */
  async createMany(data: createItemRef[]): Promise<itemRef[]> {
    return this.db.context.insert(refItem).values(data).returning();
  }

  /** Supprime toutes les références d'item. */
  async deleteAll(): Promise<void> {
    await this.db.context.delete(refItem);
  }
}
