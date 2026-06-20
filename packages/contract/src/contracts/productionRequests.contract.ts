import { PERMISSIONS } from '@57eme-regiment/auth-contracts';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  createProductionRequestSchema,
  productionRequestDetailSchema,
  productionRequestIdParamSchema,
  productionRequestSchema,
  updateProductionRequestQuantitySchema,
} from '../schemas/productionRequests.schema';

const c = initContract();

const errorSchema = z.object({ message: z.string(), error: z.string() });

export const productionRequestsContract = c.router(
  {
    create: c.mutation({
      method: 'POST',
      path: '/',
      summary: 'Create a production request',
      description: 'Creates a new production request for a given item.',
      metadata: {
        tags: ['ProductionRequests'],
        permission: PERMISSIONS.RENENUTET_PRODUCTIONREQUEST_CREATE,
      },
      body: createProductionRequestSchema,
      responses: {
        201: productionRequestSchema,
        409: errorSchema,
      },
    }),
    updateQuantity: c.mutation({
      method: 'PATCH',
      path: '/:id',
      summary: 'Update a production request quantity',
      description:
        'Updates the quantity of an existing production request by its id.',
      metadata: {
        tags: ['ProductionRequests'],
        permission: PERMISSIONS.RENENUTET_PRODUCTIONREQUEST_UPDATE,
      },
      pathParams: productionRequestIdParamSchema,
      body: updateProductionRequestQuantitySchema,
      responses: {
        200: productionRequestSchema,
        404: errorSchema,
      },
    }),
    delete: c.mutation({
      method: 'DELETE',
      path: '/:id',
      summary: 'Delete a production request',
      description: 'Removes a production request by its id.',
      metadata: {
        tags: ['ProductionRequests'],
        permission: PERMISSIONS.RENENUTET_PRODUCTIONREQUEST_DELETE,
      },
      pathParams: productionRequestIdParamSchema,
      body: c.noBody(),
      responses: {
        204: z.void(),
        404: errorSchema,
      },
    }),
    getAll: c.query({
      method: 'GET',
      path: '/',
      summary: 'List all production requests',
      description: 'Returns every production request entry across all items.',
      metadata: {
        tags: ['ProductionRequests'],
        permission: PERMISSIONS.RENENUTET_PRODUCTIONREQUEST_READ,
      },
      responses: { 200: z.array(productionRequestDetailSchema) },
    }),
  },
  { pathPrefix: '/api/productionRequests' },
);
