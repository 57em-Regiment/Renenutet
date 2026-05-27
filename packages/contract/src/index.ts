export * from './contracts/inventory.contract';
export * from './contracts/itemRef.contract';
export * from './contracts/locationRef.contract';
export * from './schemas/inventory.schema';
export * from './schemas/itemRef.schema';
export * from './schemas/locationRef.schema';

import { initContract } from '@ts-rest/core';
import { inventoryContract } from './contracts/inventory.contract';
import { itemRefContract } from './contracts/itemRef.contract';
import { locationRefContract } from './contracts/locationRef.contract';

const c = initContract();

export const contract = c.router({
  inventory: inventoryContract,
  itemRef: itemRefContract,
  locationRef: locationRefContract,
});
