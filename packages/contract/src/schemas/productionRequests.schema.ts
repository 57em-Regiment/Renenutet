import { ItemSchema } from '@57eme-regiment/krang-api-contract';
import { z } from 'zod';

export const productionRequestSchema = z.object({
  id: z.uuid(),
  itemId: z.uuid(),
  inventoryId: z.uuid().nullable().optional(),
  quantity: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type ProductionRequest = z.infer<typeof productionRequestSchema>;
export const productionRequestStockSchema = z.object({
  quantity: z.number().int(),
  itemId: z.uuid(),
  inventoryId: z.uuid(),
  inventoryFullName: z.string(),
  updatedAt: z.coerce.date(),
  minimumQuantity: z.number().nullable(),
});
export type ProductionRequestStock = z.infer<
  typeof productionRequestStockSchema
>;

export const productionRequestDetailSchema = productionRequestSchema.extend({
  item: ItemSchema.partial(),
  stocks: productionRequestStockSchema.array().optional(),
});
export type ProductionRequestDetail = z.infer<
  typeof productionRequestDetailSchema
>;

export const ProductionRequestByinventoryParamSchema = z.object({
  inventoryId: z.uuid(),
});
export type ProductionRequestByinventoryParam = z.infer<
  typeof ProductionRequestByinventoryParamSchema
>;

export const productionRequestIdParamSchema = z.object({
  id: z.uuid(),
});
export type ProductionRequestIdParam = z.infer<
  typeof productionRequestIdParamSchema
>;

export const createProductionRequestSchema = z.object({
  itemId: z.uuid(),
  inventoryId: z.uuid().optional(),
  quantity: z.number().int().positive(),
});
export type CreateProductionRequest = z.infer<
  typeof createProductionRequestSchema
>;

export const updateProductionRequestQuantitySchema = z.object({
  quantity: z.number().int().positive(),
});
export type UpdateProductionRequestQuantity = z.infer<
  typeof updateProductionRequestQuantitySchema
>;
