import type { createLocationRef, locationRef } from '@57eme-regiment/renenutet-api-contract';
import { Database } from '@/infrastructure/database';
import { injectable } from 'tsyringe';

/** Contrat d'accès aux données pour les références de localisation. */
@injectable()
export class LocationRefRepository {
  constructor(private readonly db: Database) {}

  /** Insère plusieurs références et retourne les enregistrements créés. */
  async createMany(data: createLocationRef[]): Promise<locationRef[]> {
    await this.db.context.ref_location.createMany({ data });
    return this.db.context.ref_location.findMany({
      where: { id: { in: data.map((d) => d.id) } },
    });
  }

  /** Supprime toutes les références de localisation. */
  async deleteAll(): Promise<void> {
    await this.db.context.ref_location.deleteMany({});
  }
}
