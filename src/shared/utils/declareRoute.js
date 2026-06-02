"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethodSchema = exports.HttpMethod = void 0;
exports.declareRoute = declareRoute;
const zod_1 = require("zod");
exports.HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
};
exports.HttpMethodSchema = zod_1.z.enum(exports.HttpMethod);
/**
 * Enregistre une route Fastify à partir d'un endpoint de contrat ts-rest.
 * Mappe automatiquement `method`, `path`, `body`, `pathParams` et `responses`.
 *
 * @example
 * declareRoute(server, stockContract.create, ctrl.create.bind(ctrl));
 */
function declareRoute(server, contract, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
handler, options) {
    const method = contract.method.toLowerCase();
    const schema = { response: contract.responses };
    if (contract.body)
        schema.body = contract.body;
    if (contract.pathParams)
        schema.params = contract.pathParams;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server[method](contract.path, { ...options, schema }, handler);
}
