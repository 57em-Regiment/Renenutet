import type { createLocationRef, locationRef } from '@57eme-regiment/renenutet-api-contract';

export interface ILocationRefService {
  createRange(data: createLocationRef[]): Promise<locationRef[]>;
  drop(): Promise<void>;
}
