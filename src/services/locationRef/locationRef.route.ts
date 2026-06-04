import { container } from '@/infrastructure/container';
import { declareRoute } from '@57eme-regiment/nabu-fastify';
import { locationRefContract } from '@57eme-regiment/renenutet-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { LocationRefController } from './locationRef.controller';

export async function locationRefRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(LocationRefController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  declareRoute(
    server,
    locationRefContract.createRange,
    ctrl.createRange.bind(ctrl),
  );
  declareRoute(server, locationRefContract.drop, ctrl.drop.bind(ctrl));
}
