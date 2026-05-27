import type { createLocationRef } from '@57eme-regiment/renenutet-api-contract';
import type { ILocationRefService } from '@/service/locationRef/locationRef.service.interface';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LocationRefController {
  constructor(
    @inject('ILocationRefService')
    private readonly locationRefService: ILocationRefService,
  ) {}

  async createRange(req: FastifyRequest<{ Body: createLocationRef[] }>, reply: FastifyReply) {
    const items = await this.locationRefService.createRange(req.body);
    return reply.status(201).send(items);
  }

  async drop(_req: FastifyRequest, reply: FastifyReply) {
    await this.locationRefService.drop();
    return reply.status(204).send();
  }
}
