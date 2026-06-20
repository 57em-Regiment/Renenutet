import { PERMISSIONS } from '@57eme-regiment/auth-contracts';
import {
  LocationNamesSchema,
  locationQuerySchema,
} from '@57eme-regiment/krang-api-contract';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const locationContract = c.router(
  {
    search: c.query({
      method: 'GET',
      path: '/',
      query: locationQuerySchema,
      responses: { 200: z.array(LocationNamesSchema) },
      summary: 'Rechercher des localisations',
      description:
        'Retourne les localisations enrichies (région, ville) filtrées par recherche fuzzy.',
      metadata: {
        tags: ['Localisations'],
        permission: PERMISSIONS.RENENUTET_LOCATIONS_SEARCH,
      },
    }),
  },
  { pathPrefix: '/api/locations' },
);
