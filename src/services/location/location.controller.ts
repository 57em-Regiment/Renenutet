import { krangApi } from '@/lib/api-client';
import { LocationQuery } from '@57eme-regiment/krang-api-contract';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';

@injectable()
export class LocationController {
  async search(
    req: FastifyRequest<{ Querystring: LocationQuery }>,
    reply: FastifyReply,
  ) {
    const res = await krangApi.location.getAllNames({ query: req.query });
    if (res.status !== 200) return reply.status(res.status).send(res.body);
    return reply.send(res.body);
  }
}
