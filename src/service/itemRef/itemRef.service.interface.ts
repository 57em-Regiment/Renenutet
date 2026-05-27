import type { createItemRef, itemRef } from '@57eme-regiment/renenutet-api-contract';

export interface IItemRefService {
  createRange(data: createItemRef[]): Promise<itemRef[]>;
  drop(): Promise<void>;
}
