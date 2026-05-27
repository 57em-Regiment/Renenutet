import { z } from 'zod';

export const createItemRefSchema = z.object({
  id: z.uuid(),
});

export const itemRefSchema = z.object({
  id: z.uuid(),
});

export type createItemRef = z.infer<typeof createItemRefSchema>;
export type itemRef = z.infer<typeof itemRefSchema>;
