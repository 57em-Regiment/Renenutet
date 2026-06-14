import {
  CreateProductionRequest,
  UpdateProductionRequestQuantity,
} from '@57eme-regiment/renenutet-api-contract';
import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';
import { ProductionRequestsService } from './productionRequests.service';

@injectable()
export class ProductionRequestsController {
  constructor(private readonly prService: ProductionRequestsService) {}

  async create(
    req: FastifyRequest<{ Body: CreateProductionRequest }>,
    reply: FastifyReply,
  ) {
    const pr = await this.prService.create(req.body);
    return reply.status(201).send(pr);
  }

  async updateQuantity(
    req: FastifyRequest<{
      Params: { id: string };
      Body: UpdateProductionRequestQuantity;
    }>,
    reply: FastifyReply,
  ) {
    const pr = await this.prService.updateQuantity(
      req.params.id,
      req.body.quantity,
    );
    return reply.send(pr);
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    await this.prService.delete(req.params.id);
    return reply.status(204).send();
  }

  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const pr = await this.prService.getAll();
    return reply.send(pr);
  }
}
