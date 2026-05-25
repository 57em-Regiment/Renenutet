import { container } from '@/infrastructure/container';
import type { FastifyInstance } from 'fastify';
import { InventoryController } from './inventory.controller';

export async function inventoryRoutes(app: FastifyInstance) {
  const ctrl = container.resolve(InventoryController);

  app.get('/', ctrl.getAll.bind(ctrl));
  app.get('/:id', ctrl.getById.bind(ctrl));
  app.post('/', ctrl.create.bind(ctrl));
  app.put('/:id', ctrl.update.bind(ctrl));
  app.delete('/:id', ctrl.delete.bind(ctrl));
}
