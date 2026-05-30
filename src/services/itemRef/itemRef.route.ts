import { container } from '@/infrastructure/container';
import {
  createItemRefSchema,
  itemRefSchema,
} from '@57eme-regiment/renenutet-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ItemRefController } from './itemRef.controller';

export async function itemRefRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(ItemRefController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.post(
    '/Range',
    {
      schema: {
        body: createItemRefSchema.array(),
        response: { 201: itemRefSchema.array() },
      },
    },
    ctrl.createRange.bind(ctrl),
  );

  server.delete(
    '/',
    {
      schema: {
        response: { 204: z.null() },
      },
    },
    ctrl.drop.bind(ctrl),
  );
}
