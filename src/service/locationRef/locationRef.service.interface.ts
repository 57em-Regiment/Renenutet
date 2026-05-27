import type { createLocationRef, locationRef } from '@57eme-regiment/renenutet-api-contract';

/** Contrat métier pour la gestion des références de localisation. */
export interface ILocationRefService {
  /** Crée un ensemble de références de localisation et retourne les ressources créées. */
  createRange(data: createLocationRef[]): Promise<locationRef[]>;

  /** Supprime toutes les références de localisation. */
  drop(): Promise<void>;
}
