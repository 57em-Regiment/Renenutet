import { container } from '@/infrastructure/container';
import { declareRoute } from '@/shared/utils/declareRoute';
import { itemRefContract } from '@57eme-regiment/renenutet-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { ItemRefController } from './itemRef.controller';

export async function itemRefRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(ItemRefController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  declareRoute(
    server,
    itemRefContract.createRange,
    ctrl.createRange.bind(ctrl),
  );
  declareRoute(server, itemRefContract.drop, ctrl.drop.bind(ctrl));
}
