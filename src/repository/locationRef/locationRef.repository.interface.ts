import type { createLocationRef, locationRef } from '@57eme-regiment/renenutet-api-contract';

/** Contrat d'accès aux données pour les références de localisation. */
export interface ILocationRefRepository {
  /** Insère plusieurs références et retourne les enregistrements créés. */
  createMany(data: createLocationRef[]): Promise<locationRef[]>;

  /** Supprime toutes les références de localisation. */
  deleteAll(): Promise<void>;
}
