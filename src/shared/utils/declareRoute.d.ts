import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
import { z, type ZodType } from 'zod';
export declare const HttpMethod: {
    readonly GET: "GET";
    readonly POST: "POST";
    readonly PUT: "PUT";
    readonly DELETE: "DELETE";
    readonly PATCH: "PATCH";
};
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
export declare const HttpMethodSchema: z.ZodEnum<{
    readonly GET: "GET";
    readonly POST: "POST";
    readonly PUT: "PUT";
    readonly DELETE: "DELETE";
    readonly PATCH: "PATCH";
}>;
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
export declare function declareRoute(server: ZodServer, contract: ContractEndpoint, handler: (req: FastifyRequest<any>, reply: FastifyReply) => void | Promise<any>, options?: Omit<RouteShorthandOptions, 'schema'>): void;
export {};
//# sourceMappingURL=declareRoute.d.ts.map