import { inject, injectable } from 'tsyringe';
import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  createInventorySchema,
  inventoryParamsSchema,
  updateInventorySchema,
} from '@/models/inventory/inventory.schema';
import type { IInventoryService } from '@/service/inventory/inventory.service.interface';

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
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = inventoryParamsSchema.parse(req.params);
    const inventory = await this.inventoryService.getById(id);
    return reply.send(inventory);
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createInventorySchema.parse(req.body);
    const inventory = await this.inventoryService.create(data);
    return reply.status(201).send(inventory);
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = inventoryParamsSchema.parse(req.params);
    const data = updateInventorySchema.parse(req.body);
    const inventory = await this.inventoryService.update(id, data);
    return reply.send(inventory);
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = inventoryParamsSchema.parse(req.params);
    await this.inventoryService.delete(id);
    return reply.status(204).send();
  }
}
