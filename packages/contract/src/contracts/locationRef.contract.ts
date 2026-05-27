import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { createLocationRefSchema, locationRefSchema } from '../schemas/locationRef.schema';

const c = initContract();

export const locationRefContract = c.router({
  createRange: {
    method: 'POST',
    path: '/api/locationRef/Range',
    body: createLocationRefSchema.array(),
    responses: { 201: locationRefSchema.array() },
  },
  drop: {
    method: 'DELETE',
    path: '/api/locationRef',
    responses: {
      204: z.null(),
    },
  },
});
