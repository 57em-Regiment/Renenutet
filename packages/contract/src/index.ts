export * from './contracts/inventory.contract';
export * from './schemas/inventory.schema';

import { initContract } from '@ts-rest/core';
import { inventoryContract } from './contracts/inventory.contract';

const c = initContract();

export const contract = c.router({
  inventory: inventoryContract,
});
