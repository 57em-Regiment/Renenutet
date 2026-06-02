import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  createStockSchema,
  stockByItemsParamSchema,
  stockIdParamSchema,
  stockInventoryParamSchema,
  stockSchema,
  updateStockSchema,
} from '../schemas/stock.schema';

const c = initContract();

const errorSchema = z.object({ message: z.string(), error: z.string() });
export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export const stockContract = c.router(
  {
    create: {
      method: HttpMethod.POST,
      path: '/',
      summary: 'Add an item to a stock',
      description:
        'Creates a new stock entry for a given item in an inventory. Returns 409 if the item is already tracked in that inventory.',
      body: createStockSchema,
      responses: {
        201: stockSchema,
        409: errorSchema,
      },
    },
    getAll: {
      method: HttpMethod.GET,
      path: '/',
      summary: 'List all stocks',
      description: 'Returns every stock entry across all inventories.',
      responses: { 200: z.array(stockSchema) },
    },
    getByInventory: {
      method: HttpMethod.GET,
      path: '/inventories/:inventoryId',
      summary: 'List stocks for an inventory',
      description:
        'Returns all stock entries belonging to the given inventory. Returns 404 if the inventory does not exist.',
      pathParams: stockInventoryParamSchema,
      responses: {
        200: z.array(stockSchema),
        404: errorSchema,
      },
    },
    getByItems: {
      method: HttpMethod.GET,
      path: '/items/:itemId',
      summary: 'List stocks for an item',
      description:
        'Returns all stock entries for a given item across every inventory. Returns 404 if the item does not exist.',
      pathParams: stockByItemsParamSchema,
      responses: {
        200: z.array(stockSchema),
        404: errorSchema,
      },
    },
    getStock: {
      method: HttpMethod.GET,
      path: '/:inventoryId/:itemId',
      summary: 'Get a specific stock entry',
      description:
        'Returns the exact stock entry identified by the (inventoryId, itemId) composite key. Returns 404 if not found.',
      pathParams: stockIdParamSchema,
      responses: {
        200: stockSchema,
        404: errorSchema,
      },
    },
    increment: {
      method: HttpMethod.POST,
      path: '/:id',
      summary: 'Increment a stock quantity',
      description:
        'Increment the quantity of a stock entry identified by its composite key. Returns 404 if not found.',
      pathParams: stockIdParamSchema,
      body: updateStockSchema,
      responses: {
        200: stockSchema,
        404: errorSchema,
      },
    },
    decrement: {
      method: HttpMethod.POST,
      path: '/:id',
      summary: 'Decrement a stock quantity',
      description:
        'Decrement the quantity of a stock entry identified by its composite key. Returns 404 if not found.',
      pathParams: stockIdParamSchema,
      body: updateStockSchema,
      responses: {
        200: stockSchema,
        404: errorSchema,
      },
    },
  },
  { pathPrefix: '/api/stocks' },
);
