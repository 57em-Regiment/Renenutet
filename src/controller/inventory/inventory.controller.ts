import type { CreateInventory, InventoryParams, UpdateInventory } from '@57em-regiment/renenutet-api-contract';
import type { IInventoryService } from '@/service/inventory/inventory.service.interface';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class InventoryController {
  constructor(
    @inject('IInventoryService')
    private readonly inventoryService: IInventoryService,
  ) {}

  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const inventories = await this.inventoryService.getAll();
    return reply.send(inventories);
  }

  async getById(
    req: FastifyRequest<{ Params: InventoryParams }>,
    reply: FastifyReply,
  ) {
    const inventory = await this.inventoryService.getById(req.params.id);
    return reply.send(inventory);
  }

  async create(
    req: FastifyRequest<{ Body: CreateInventory }>,
    reply: FastifyReply,
  ) {
    const inventory = await this.inventoryService.create(req.body);
    return reply.status(201).send(inventory);
  }

  async update(
    req: FastifyRequest<{ Params: InventoryParams; Body: UpdateInventory }>,
    reply: FastifyReply,
  ) {
    const inventory = await this.inventoryService.update(req.params.id, req.body);
    return reply.send(inventory);
  }

  async delete(
    req: FastifyRequest<{ Params: InventoryParams }>,
    reply: FastifyReply,
  ) {
    await this.inventoryService.delete(req.params.id);
    return reply.status(204).send();
  }
}
