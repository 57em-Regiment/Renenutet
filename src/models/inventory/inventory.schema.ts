import { z } from 'zod';

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

export type CreateInventory = z.infer<typeof createInventorySchema>;
export type UpdateInventory = z.infer<typeof updateInventorySchema>;
export type InventoryParams = z.infer<typeof inventoryParamsSchema>;
