import { z } from "zod";

export const stockSchema = z.object({
  quantity: z.number().int(),
  itemId: z.uuid(),
  inventoryId: z.uuid(),
  updatedAt: z.coerce.date(),
});

export const updateStockSchema = z.object({
  quantity: z.number().int().optional(),
});

export const stockParamSchema = z.object({
  itemId: z.uuid(),
  inventoryId: z.uuid(),
});

export const stockInventoryParamSchema = z.object({
  inventoryId: z.uuid(),
});

export const stockItemParamSchema = z.object({
  itemId: z.uuid(),
});

export type StockSchema = z.infer<typeof stockSchema>;
export type UpdateStock = z.infer<typeof updateStockSchema>;
export type StockParams = z.infer<typeof stockParamSchema>;
