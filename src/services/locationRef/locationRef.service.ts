import type { createLocationRef, locationRef } from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';
import { LocationRefRepository } from './locationRef.repository';

/** Service métier pour la gestion des références de localisation. */
@injectable()
export class LocationRefService {
  constructor(
    private readonly locationRefRepo: LocationRefRepository,
  ) {}

  /** Crée un ensemble de références de localisation et retourne les ressources créées. */
  async createRange(data: createLocationRef[]): Promise<locationRef[]> {
    return this.locationRefRepo.createMany(data);
  }

  /** Supprime toutes les références de localisation. */
  async drop(): Promise<void> {
    return this.locationRefRepo.deleteAll();
  }
}
