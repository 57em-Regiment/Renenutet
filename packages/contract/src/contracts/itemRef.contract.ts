import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { createItemRefSchema, itemRefSchema } from '../schemas/itemRef.schema';

const c = initContract();

export const itemRefContract = c.router({
  createRange: {
    method: 'POST',
    path: '/api/itemRef/Range',
    body: createItemRefSchema.array(),
    responses: { 201: itemRefSchema.array() },
  },
  drop: {
    method: 'DELETE',
    path: '/api/itemRef',
    responses: {
      204: z.null(),
    },
  },
});
