import { env } from '@/config/env';
import { createErrorHandler } from '@57eme-regiment/nabu-errors';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import {
  createJsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from '@fastify/type-provider-zod';
import apiReference from '@scalar/fastify-api-reference';
import Fastify from 'fastify';
import qs from 'qs';
import { logger } from './config/logger';
import { inventoryRoutes } from './services/inventory/inventory.route';
import { itemRefRoutes } from './services/itemRef/itemRef.route';
import { locationRoutes } from './services/location/location.route';
import { locationRefRoutes } from './services/locationRef/locationRef.route';
import { productionRequestsRoutes } from './services/productionRequests/productionRequests.route';
import { stockRoutes } from './services/stock/stock.route';

export function buildApp() {
  const app = Fastify({
    logger: { level: 'error' },
    querystringParser: str => qs.parse(str),
  });

  app.addHook('onRequest', (req, _reply, done) => {
    logger.info(
      `→ reqId:"${req.id}" ${req.method} ${req.url} from:${req.host} user:${req.user ? req.user.username : 'no user'} msg:"incoming request"`,
    );
    done();
  });

  app.addHook('onResponse', (req, reply, done) => {
    logger.info(
      `← reqId:"${req.id}" ${req.method} ${req.url} ${reply.statusCode} ${reply.elapsedTime.toFixed(2)}ms msg:"request completed"`,
    );
    done();
  });

  app.register(cors, {
    origin: env.CORS_ORIGINS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler(createErrorHandler(logger));

  if (env.ALLOWED_HOST) {
    app.addHook('onRequest', (request, reply, done) => {
      const host = request.headers.host ?? '';
      const hostname = host.split(':')[0];
      if (hostname !== env.ALLOWED_HOST) {
        reply.code(404).send();
        return;
      }
      done();
    });
  }

  if (env.NODE_ENV !== 'production') {
    const baseTransform = createJsonSchemaTransform({});
    app.register(fastifySwagger, {
      openapi: {
        info: { title: 'Renenutet API', version: '1.0.0' },
      },
      transform: document => {
        try {
          return baseTransform(document);
        } catch (err) {
          logger.warn(
            `[swagger] transform failed for ${document.url} — schema hidden. ${err}`,
          );
          return { schema: { hide: true }, url: document.url };
        }
      },
    });
    app.register(apiReference, {
      routePrefix: '/docs',
      configuration: {
        hideClientButton: true,
        hideDarkModeToggle: true,
        hiddenClients: true,
        metaData: {
          title: 'Renenutet API docs',
        },
        operationTitleSource: 'summary',
        persistAuth: true,
      },
    });
  }

  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));
  app.register(inventoryRoutes);
  app.register(stockRoutes);
  app.register(itemRefRoutes);
  app.register(locationRefRoutes);
  app.register(locationRoutes);
  app.register(productionRequestsRoutes);

  app.get('/openapi.json', async (req, res) => {
    return app.swagger();
  });

  return app;
}
