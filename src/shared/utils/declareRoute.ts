//TODO : DEPLACER DANS PACKAGE/REPO TOOLS-SHARE

import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from 'fastify';
import { z, type ZodType } from 'zod';

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
export const HttpMethodSchema = z.enum(HttpMethod);

export type ContractEndpoint = {
  method: HttpMethod;
  path: string;
  body?: ZodType;
  pathParams?: ZodType;
  responses: Record<number, ZodType>;
};

type ZodServer = FastifyInstance<any, any, any, any, ZodTypeProvider>;

/**
 * Enregistre une route Fastify à partir d'un endpoint de contrat ts-rest.
 * Mappe automatiquement `method`, `path`, `body`, `pathParams` et `responses`.
 *
 * @example
 * declareRoute(server, stockContract.create, ctrl.create.bind(ctrl));
 */
export function declareRoute(
  server: ZodServer,
  contract: ContractEndpoint,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (
    req: FastifyRequest<any>,
    reply: FastifyReply,
  ) => void | Promise<any>,
  options?: Omit<RouteShorthandOptions, 'schema'>,
): void {
  const method = contract.method.toLowerCase() as Lowercase<HttpMethod>;

  const schema: Record<string, unknown> = { response: contract.responses };
  if (contract.body) schema.body = contract.body;
  if (contract.pathParams) schema.params = contract.pathParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (server[method] as any)(contract.path, { ...options, schema }, handler);
}
