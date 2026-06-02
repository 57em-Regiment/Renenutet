import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { createItemRefSchema, itemRefSchema } from '../schemas/itemRef.schema';

const c = initContract();

export const itemRefContract = c.router(
  {
    createRange: c.mutation({
      method: 'POST',
      path: '/Range',
      summary: 'Seed item references',
      description:
        'Bulk-creates item reference entries by UUID. Used to seed the item catalogue from Krang before creating stocks.',
      body: createItemRefSchema.array(),
      responses: { 201: itemRefSchema.array() },
    }),
    drop: c.mutation({
      method: 'DELETE',
      path: '/',
      summary: 'Drop all item references',
      description:
        'Deletes all item reference entries. Intended for reseeding — use with caution as it will break existing stocks that reference these items.',
      body: c.noBody(),
      responses: {
        204: z.null(),
      },
    }),
  },
  { pathPrefix: '/api/itemRef' },
);
