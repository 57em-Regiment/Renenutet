import { refLocation } from '@/drizzle/schema';
import { Database } from '@/infrastructure/database';
import type { createLocationRef, locationRef } from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';

/** Accès aux données de la table `ref_location`. */
@injectable()
export class LocationRefRepository {
  constructor(private readonly db: Database) {}

  /** Insère plusieurs références de localisation en lot et retourne les enregistrements créés. */
  async createMany(data: createLocationRef[]): Promise<locationRef[]> {
    return this.db.context.insert(refLocation).values(data).returning();
  }

  /** Supprime toutes les références de localisation. */
  async deleteAll(): Promise<void> {
    await this.db.context.delete(refLocation);
  }
}
