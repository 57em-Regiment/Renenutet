import type { createItemRef, itemRef } from '@57eme-regiment/renenutet-api-contract';
import { inject, injectable } from 'tsyringe';
import type { IItemRefRepository } from '@/repository/itemRef/itemRef.repository.interface';
import type { IItemRefService } from './itemRef.service.interface';

/** Implémentation du service métier pour les références d'articles. */
@injectable()
export class ItemRefService implements IItemRefService {
  constructor(
    @inject('IItemRefRepository')
    private readonly itemRefRepo: IItemRefRepository,
  ) {}

  /** @inheritdoc */
  async createRange(data: createItemRef[]): Promise<itemRef[]> {
    return this.itemRefRepo.createMany(data);
  }

  /** @inheritdoc */
  async drop(): Promise<void> {
    return this.itemRefRepo.deleteAll();
  }
}
