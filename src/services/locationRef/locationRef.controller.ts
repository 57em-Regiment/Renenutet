import { LocationRefService } from '@/services/locationRef/locationRef.service';
import type { createLocationRef } from '@57eme-regiment/renenutet-api-contract';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';

/** Contrôleur HTTP pour la gestion des références de localisation. */
@injectable()
export class LocationRefController {
  constructor(
    private readonly locationRefService: LocationRefService,
  ) {}

  /** Crée un ensemble de références de localisation et retourne les ressources créées (201). */
  async createRange(
    req: FastifyRequest<{ Body: createLocationRef[] }>,
    reply: FastifyReply,
  ) {
    const items = await this.locationRefService.createRange(req.body);
    return reply.status(201).send(items);
  }

  /** Supprime toutes les références de localisation (204 sans corps). */
  async drop(_req: FastifyRequest, reply: FastifyReply) {
    await this.locationRefService.drop();
    return reply.status(204).send();
  }
}
