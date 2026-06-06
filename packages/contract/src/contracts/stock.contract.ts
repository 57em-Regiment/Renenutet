import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  createStockSchema,
  stockByItemsParamSchema,
  stockDetailsSchema,
  stockIdParamSchema,
  stockInventoryParamSchema,
  stockSchema,
  updateStockSchema,
} from '../schemas/stock.schema';

const c = initContract();

const errorSchema = z.object({ message: z.string(), error: z.string() });

export const stockContract = c.router(
  {
    create: c.mutation({
      method: 'POST',
      path: '/',
      summary: 'Add an item to a stock',
      description:
        'Creates a new stock entry for a given item in an inventory. Returns 409 if the item is already tracked in that inventory.',
      metadata: { tags: ['Stock'] },
      body: createStockSchema,
      responses: {
        201: stockSchema,
        409: errorSchema,
      },
    }),
    getAll: c.query({
      method: 'GET',
      path: '/',
      summary: 'List all stocks',
      description: 'Returns every stock entry across all inventories.',
      metadata: { tags: ['Stock'] },
      responses: { 200: z.array(stockSchema) },
    }),
    getByInventory: c.query({
      method: 'GET',
      path: '/inventories/:inventoryId',
      summary: 'List stocks for an inventory',
      description:
        'Returns all stock entries belonging to the given inventory. Returns 404 if the inventory does not exist.',
      metadata: { tags: ['Stock'] },
      pathParams: stockInventoryParamSchema,
      responses: {
        200: z.array(stockDetailsSchema),
        404: errorSchema,
      },
    }),
    getByItems: c.query({
      method: 'GET',
      path: '/items/:itemId',
      summary: 'List stocks for an item',
      description:
        'Returns all stock entries for a given item across every inventory. Returns 404 if the item does not exist.',
      metadata: { tags: ['Stock'] },
      pathParams: stockByItemsParamSchema,
      responses: {
        200: z.array(stockSchema),
        404: errorSchema,
      },
    }),
    getStock: c.query({
      method: 'GET',
      path: '/:inventoryId/:itemId',
      summary: 'Get a specific stock entry',
      description:
        'Returns the exact stock entry identified by the (inventoryId, itemId) composite key. Returns 404 if not found.',
      metadata: { tags: ['Stock'] },
      pathParams: stockIdParamSchema,
      responses: {
        200: stockSchema,
        404: errorSchema,
      },
    }),
    increment: c.mutation({
      method: 'POST',
      path: '/:id/increment',
      summary: 'Increment a stock quantity',
      description:
        'Increment the quantity of a stock entry identified by its composite key. Returns 404 if not found.',
      metadata: { tags: ['Stock'] },
      pathParams: stockIdParamSchema,
      body: updateStockSchema,
      responses: {
        200: stockSchema,
        404: errorSchema,
      },
    }),
    decrement: c.mutation({
      method: 'POST',
      path: '/:id/decrement',
      summary: 'Decrement a stock quantity',
      description:
        'Decrement the quantity of a stock entry identified by its composite key. Returns 404 if not found.',
      metadata: { tags: ['Stock'] },
      pathParams: stockIdParamSchema,
      body: updateStockSchema,
      responses: {
        200: stockSchema,
        404: errorSchema,
      },
    }),
  },
  { pathPrefix: '/api/stocks' },
);
