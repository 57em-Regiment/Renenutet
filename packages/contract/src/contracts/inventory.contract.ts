import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  InventorySchema,
  createInventorySchema,
  inventoryParamsSchema,
  updateInventorySchema,
} from '../schemas/inventory.schema';

const c = initContract();

export const inventoryContract = c.router({
  getAll: {
    method: 'GET',
    path: '/api/inventories',
    responses: { 200: z.array(InventorySchema) },
  },
  getById: {
    method: 'GET',
    path: '/api/inventories/:id',
    pathParams: inventoryParamsSchema,
    responses: {
      200: InventorySchema,
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },
  create: {
    method: 'POST',
    path: '/api/inventories',
    body: createInventorySchema,
    responses: { 201: InventorySchema },
  },
  update: {
    method: 'PUT',
    path: '/api/inventories/:id',
    pathParams: inventoryParamsSchema,
    body: updateInventorySchema,
    responses: {
      200: InventorySchema,
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },
  delete: {
    method: 'DELETE',
    path: '/api/inventories/:id',
    pathParams: inventoryParamsSchema,
    responses: {
      204: z.null(),
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },
});
