import { z } from "zod";

export const stockSchema = z.object({
  id: z.uuid(),
  quantity: z.number().int().positive().default(0),
  itemId: z.uuid(),
  inventoryId: z.uuid(),
});
export const createStockSchema = z.object({
  quantity: z.number().int().default(0),
  itemId: z.uuid(),
  inventoryId: z.uuid(),
});

export const updateStockSchema = createStockSchema.partial();

export const stockParamSchema = z.object({
  id: z.uuid(),
  itemId: z.uuid(),
  inventoryId: z.uuid(),
});

export type StockSchema = z.infer<typeof stockSchema>;
export type CreateStock = z.infer<typeof createStockSchema>;
export type UpdateStock = z.infer<typeof updateStockSchema>;
export type StockParams = z.infer<typeof stockParamSchema>;
