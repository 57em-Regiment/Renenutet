import { container } from '@/infrastructure/container';
import { declareRoute } from '@57eme-regiment/nabu-fastify';
import { productionRequestsContract } from '@57eme-regiment/renenutet-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { ProductionRequestsController } from './productionRequests.controller';

export async function productionRequestsRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(ProductionRequestsController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  declareRoute(
    server,
    productionRequestsContract.create,
    ctrl.create.bind(ctrl),
  );
  declareRoute(
    server,
    productionRequestsContract.updateQuantity,
    ctrl.updateQuantity.bind(ctrl),
  );
  declareRoute(
    server,
    productionRequestsContract.delete,
    ctrl.delete.bind(ctrl),
  );
  declareRoute(
    server,
    productionRequestsContract.getAll,
    ctrl.getAll.bind(ctrl),
  );
}
