import { container } from '@/infrastructure/container';
import { declareRoute } from '@57eme-regiment/nabu-fastify';
import { locationContract } from '@57eme-regiment/renenutet-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { LocationController } from './location.controller';

export async function locationRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(LocationController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  declareRoute(server, locationContract.search, ctrl.search.bind(ctrl));
}
