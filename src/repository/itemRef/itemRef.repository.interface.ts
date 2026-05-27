import type { createItemRef, itemRef } from '@57eme-regiment/renenutet-api-contract';

/** Contrat d'accès aux données pour les références d'articles. */
export interface IItemRefRepository {
  /** Insère plusieurs références et retourne les enregistrements créés. */
  createMany(data: createItemRef[]): Promise<itemRef[]>;

  /** Supprime toutes les références d'articles. */
  deleteAll(): Promise<void>;
}
