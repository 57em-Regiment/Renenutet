import { z } from 'zod';

export const createLocationRefSchema = z.object({
  id: z.uuid(),
});

export const locationRefSchema = z.object({
  id: z.uuid(),
});

export type createLocationRef = z.infer<typeof createLocationRefSchema>;
export type locationRef = z.infer<typeof locationRefSchema>;
