import type { createLocationRef, locationRef } from '@57eme-regiment/renenutet-api-contract';

export interface ILocationRefRepository {
  createMany(data: createLocationRef[]): Promise<locationRef[]>;
  deleteAll(): Promise<void>;
}
