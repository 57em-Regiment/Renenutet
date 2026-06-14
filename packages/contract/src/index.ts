export * from './contracts/inventory.contract';
export * from './contracts/itemRef.contract';
export * from './contracts/location.contract';
export * from './contracts/locationRef.contract';
export * from './contracts/productionRequests.contract';
export * from './contracts/stock.contract';
export * from './schemas/inventory.schema';
export * from './schemas/itemRef.schema';
export * from './schemas/locationRef.schema';
export * from './schemas/productionRequests.schema';
export * from './schemas/stock.schema';

import { initContract } from '@ts-rest/core';
import { inventoryContract } from './contracts/inventory.contract';
import { itemRefContract } from './contracts/itemRef.contract';
import { locationContract } from './contracts/location.contract';
import { locationRefContract } from './contracts/locationRef.contract';
import { productionRequestsContract } from './contracts/productionRequests.contract';
import { stockContract } from './contracts/stock.contract';

const c = initContract();

export const contract = c.router({
  inventory: inventoryContract,
  stock: stockContract,
  itemRef: itemRefContract,
  locationRef: locationRefContract,
  location: locationContract,
  productionRequests: productionRequestsContract,
});
