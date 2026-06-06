import { container } from '@/infrastructure/container';
import { declareRoute } from '@57eme-regiment/nabu-fastify';
import { inventoryContract } from '@57eme-regiment/renenutet-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { InventoryController } from './inventory.controller';

export async function inventoryRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(InventoryController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  declareRoute(
    server,
    inventoryContract.getInventoriesList,
    ctrl.getInventoriesList.bind(ctrl),
  );
  declareRoute(server, inventoryContract.getAll, ctrl.getAll.bind(ctrl));
  declareRoute(
    server,
    inventoryContract.getInventoryDetails,
    ctrl.getInventoryDetails.bind(ctrl),
  );
  declareRoute(server, inventoryContract.create, ctrl.create.bind(ctrl));
  declareRoute(server, inventoryContract.update, ctrl.update.bind(ctrl));
  declareRoute(server, inventoryContract.delete, ctrl.delete.bind(ctrl));
}
