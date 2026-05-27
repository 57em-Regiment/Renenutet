import type { createItemRef } from '@57eme-regiment/renenutet-api-contract';
import type { IItemRefService } from '@/service/itemRef/itemRef.service.interface';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

/** Contrôleur HTTP pour la gestion des références d'articles. */
@injectable()
export class ItemRefController {
  constructor(
    @inject('IItemRefService')
    private readonly itemRefService: IItemRefService,
  ) {}

  /** Crée un ensemble de références d'articles et retourne les ressources créées (201). */
  async createRange(req: FastifyRequest<{ Body: createItemRef[] }>, reply: FastifyReply) {
    const items = await this.itemRefService.createRange(req.body);
    return reply.status(201).send(items);
  }

  /** Supprime toutes les références d'articles (204 sans corps). */
  async drop(_req: FastifyRequest, reply: FastifyReply) {
    await this.itemRefService.drop();
    return reply.status(204).send();
  }
}
