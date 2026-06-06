import { ItemSchema } from '@57eme-regiment/krang-api-contract';
import { z } from 'zod';

export const stockSchema = z.object({
  quantity: z.number().int(),
  itemId: z.uuid(),
  inventoryId: z.uuid(),
  updatedAt: z.coerce.date(),
});
export type StockSchema = z.infer<typeof stockSchema>;
export const stockDetailsSchema = stockSchema.extend({
  item: ItemSchema.partial(),
});
export type StockDetails = z.infer<typeof stockDetailsSchema>;

export const createStockSchema = z.object({
  itemId: z.uuid(),
  inventoryId: z.uuid(),
  quantity: z.number().int().nonnegative().optional().default(0),
});
export type CreateStock = z.infer<typeof createStockSchema>;

export const updateStockSchema = z.object({
  quantity: z.number().int().optional(),
});
export type UpdateStock = z.infer<typeof updateStockSchema>;

export const stockIdParamSchema = z.object({
  inventoryId: z.uuid(),
  itemId: z.uuid(),
});
export type StockIdParams = z.infer<typeof stockIdParamSchema>;

export const stockInventoryParamSchema = z.object({
  inventoryId: z.uuid(),
});
export type StockInventoryParam = z.infer<typeof stockInventoryParamSchema>;

export const stockByItemsParamSchema = z.object({
  itemId: z.uuid(),
});
export type StockByItemsParam = z.infer<typeof stockByItemsParamSchema>;
