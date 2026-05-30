import type {
  createItemRef,
  itemRef,
} from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';
import { ItemRefRepository } from './itemRef.repository';

/** Service métier pour la gestion des références d'articles. */
@injectable()
export class ItemRefService {
  constructor(
    private readonly itemRefRepo: ItemRefRepository,
  ) {}

  /** Crée un ensemble de références d'articles et retourne les ressources créées. */
  async createRange(data: createItemRef[]): Promise<itemRef[]> {
    return this.itemRefRepo.createMany(data);
  }

  /** Supprime toutes les références d'articles. */
  async drop(): Promise<void> {
    return this.itemRefRepo.deleteAll();
  }
}
