import { UserSchema } from '@57eme-regiment/auth-contracts';
import { LocationNamesSchema } from '@57eme-regiment/krang-api-contract';
import { z } from 'zod';
import { stockDetailsSchema } from './stock.schema';

export const InventorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  locationId: z.string(),
  ownerId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type Inventory = z.infer<typeof InventorySchema>;

export const InventoryDetailsSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  locationId: z.string(),
  location: LocationNamesSchema,
  ownerId: z.string().nullable(),
  owner: UserSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  stocks: stockDetailsSchema.array(),
});
export type InventoryDetails = z.infer<typeof InventoryDetailsSchema>;

export const InventoryCodeSchema = z.object({
  code: z.string().nullable(),
});
export type InventoryCode = z.infer<typeof InventoryCodeSchema>;

export const updateInventoryCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Code must be exactly 6 digits'),
});
export type UpdateInventoryCode = z.infer<typeof updateInventoryCodeSchema>;

export const createInventorySchema = z.object({
  name: z.string(),
  accessCode: z.string().optional(),
  locationId: z.string().optional(),
  ownerId: z.string().optional(),
});
export type CreateInventory = z.infer<typeof createInventorySchema>;

export const updateInventorySchema = createInventorySchema.partial();
export type UpdateInventory = z.infer<typeof updateInventorySchema>;

export const inventoryParamsSchema = z.object({
  id: z.uuid(),
});
export type InventoryParams = z.infer<typeof inventoryParamsSchema>;
