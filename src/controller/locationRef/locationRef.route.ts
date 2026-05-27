import { container } from '@/infrastructure/container';
import { createLocationRefSchema, locationRefSchema } from '@57eme-regiment/renenutet-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { LocationRefController } from './locationRef.controller';

export async function locationRefRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(LocationRefController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.post('/Range', {
    schema: {
      body: createLocationRefSchema.array(),
      response: { 201: locationRefSchema.array() },
    },
  }, ctrl.createRange.bind(ctrl));

  server.delete('/', {
    schema: {
      response: { 204: z.null() },
    },
  }, ctrl.drop.bind(ctrl));
}
