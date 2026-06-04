import { z } from 'zod';
// import { UserSchema } from '@57eme-regiment/auth-contracts';

export const InventorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  locationId: z.string(),
  ownerId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export const InventoryDetailsSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  locationId: z.string(),
  location: z.object(),
  ownerId: z.string().nullable(),
  // owner: UserSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  stock: z.object(),
});

export const createInventorySchema = z.object({
  name: z.string(),
  accessCode: z.string().optional(),
  locationId: z.string().optional(),
  ownerId: z.string().optional(),
});

export const updateInventorySchema = createInventorySchema.partial();

export const inventoryParamsSchema = z.object({
  id: z.uuid(),
});

export type Inventory = z.infer<typeof InventorySchema>;
export type InventoryDetails = z.infer<typeof InventoryDetailsSchema>;
export type CreateInventory = z.infer<typeof createInventorySchema>;
export type UpdateInventory = z.infer<typeof updateInventorySchema>;
export type InventoryParams = z.infer<typeof inventoryParamsSchema>;
