import type { createLocationRef, locationRef } from '@57eme-regiment/renenutet-api-contract';
import { inject, injectable } from 'tsyringe';
import type { ILocationRefRepository } from '@/repository/locationRef/locationRef.repository.interface';
import type { ILocationRefService } from './locationRef.service.interface';

/** Implémentation du service métier pour les références de localisation. */
@injectable()
export class LocationRefService implements ILocationRefService {
  constructor(
    @inject('ILocationRefRepository')
    private readonly locationRefRepo: ILocationRefRepository,
  ) {}

  /** @inheritdoc */
  async createRange(data: createLocationRef[]): Promise<locationRef[]> {
    return this.locationRefRepo.createMany(data);
  }

  /** @inheritdoc */
  async drop(): Promise<void> {
    return this.locationRefRepo.deleteAll();
  }
}
