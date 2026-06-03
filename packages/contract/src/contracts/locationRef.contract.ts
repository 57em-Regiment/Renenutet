import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  createLocationRefSchema,
  locationRefSchema,
} from '../schemas/locationRef.schema';

const c = initContract();

export const locationRefContract = c.router(
  {
    createRange: c.mutation({
      method: 'POST',
      path: '/Range',
      summary: 'Seed location references',
      description:
        'Bulk-creates location reference entries by UUID. Used to seed the location catalogue from Krang before creating inventories.',
      metadata: { tags: ['Location References'] },
      body: createLocationRefSchema.array(),
      responses: { 201: locationRefSchema.array() },
    }),
    drop: c.mutation({
      method: 'DELETE',
      path: '/',
      summary: 'Drop all location references',
      description:
        'Deletes all location reference entries. Intended for reseeding — use with caution as it will break existing inventories that reference these locations.',
      metadata: { tags: ['Location References'] },
      body: c.noBody(),
      responses: {
        204: z.null(),
      },
    }),
  },
  { pathPrefix: '/api/locationRef' },
);
