import type { createItemRef, itemRef } from '@57eme-regiment/renenutet-api-contract';

/** Contrat métier pour la gestion des références d'articles. */
export interface IItemRefService {
  /** Crée un ensemble de références d'articles et retourne les ressources créées. */
  createRange(data: createItemRef[]): Promise<itemRef[]>;

  /** Supprime toutes les références d'articles. */
  drop(): Promise<void>;
}
