import { container } from '@/infrastructure/container';
import { stockContract } from '@57eme-regiment/renenutet-api-contract';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance } from 'fastify';
import { StockController } from './stock.controller';


export async function stockRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(StockController);
  const server = app.withTypeProvider<ZodTypeProvider>();

  declareRoute(server, stockContract.create, ctrl.create.bind(ctrl));
  declareRoute(server, stockContract.getAll, ctrl.getAll.bind(ctrl));
  declareRoute(server, stockContract.getByInventory, ctrl.getByInventory.bind(ctrl));
  declareRoute(server, stockContract.getByItems, ctrl.getByItem.bind(ctrl));
  declareRoute(server, stockContract.getStock, ctrl.getByKey.bind(ctrl));
  declareRoute(server, stockContract.increment, ctrl.increment.bind(ctrl));
  declareRoute(server, stockContract.decrement, ctrl.decrement.bind(ctrl));
}
