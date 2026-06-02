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
    summary: 'List all inventories',
    description: 'Returns the complete list of inventories regardless of owner or location.',
    responses: { 200: z.array(InventorySchema) },
  },
  getById: {
    method: 'GET',
    path: '/api/inventories/:id',
    summary: 'Get an inventory by ID',
    description: 'Returns a single inventory by its UUID. Returns 404 if not found.',
    pathParams: inventoryParamsSchema,
    responses: {
      200: InventorySchema,
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },
  create: {
    method: 'POST',
    path: '/api/inventories',
    summary: 'Create a new inventory',
    description: 'Creates a new inventory attached to a location and an owner. The access code is optional and used to restrict stock pickups.',
    body: createInventorySchema,
    responses: { 201: InventorySchema },
  },
  update: {
    method: 'PUT',
    path: '/api/inventories/:id',
    summary: 'Update an inventory',
    description: 'Updates the name, access code, location or owner of an existing inventory. Returns 404 if not found.',
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
    summary: 'Delete an inventory',
    description: 'Permanently deletes an inventory and all its associated stocks. Returns 404 if not found.',
    pathParams: inventoryParamsSchema,
    responses: {
      204: z.null(),
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },
});
