import type { createItemRef, itemRef } from '@57eme-regiment/renenutet-api-contract';

export interface IItemRefRepository {
  createMany(data: createItemRef[]): Promise<itemRef[]>;
  deleteAll(): Promise<void>;
}
