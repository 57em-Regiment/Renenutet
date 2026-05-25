import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  stockParamSchema,
  stockSchema,
  updateStockSchema,
} from '../schemas/stock.schema';

const c = initContract();

export const stockContract = c.router({
  getAll: {
    method: 'GET',
    path: '/api/stocks',
    responses: { 200: z.array(stockSchema) },
  },
  getById: {
    method: 'GET',
    path: '/api/stocks/:id',
    pathParams: stockParamSchema,
    responses: {
      200: stockSchema,
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },
  getByInventory: {
    method: 'GET',
    path: '/api/stocks/inventories/:inventoryId',
    pathParams: stockParamSchema,
    responses: {
      200: z.array(stockSchema),
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },
  getByItems: {
    method: 'GET',
    path: '/api/stocks/items/:itemId',
    pathParams: stockParamSchema,
    responses: {
      200: z.array(stockSchema),
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },
  getStock: {
    method: 'GET',
    path: '/api/stocks/:inventoryId/:itemId',
    pathParams: stockParamSchema,
    responses: {
      200: stockSchema,
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },

  update: {
    method: 'PUT',
    path: '/api/stocks/:id',
    pathParams: stockParamSchema,
    body: updateStockSchema,
    responses: {
      200: stockSchema,
      404: z.object({ message: z.string(), error: z.string() }),
    },
  },
});
