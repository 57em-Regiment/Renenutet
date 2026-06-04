import { container } from '@/infrastructure/container';
import { declareRoute } from '@/shared/utils/declareRoute';
import { inventoryContract } from '@57eme-regiment/renenutet-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { InventoryController } from './inventory.controller';

const errorSchema = z.object({ message: z.string(), error: z.string() });

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
