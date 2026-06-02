import { env } from '@/config/env';
import { errorHandler } from '@/shared/errors/errorHandler';
import cors from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
} from '@fastify/type-provider-zod';
import Fastify from 'fastify';
import { logger } from './config/logger';
import { inventoryRoutes } from './services/inventory/inventory.route';
import { itemRefRoutes } from './services/itemRef/itemRef.route';
import { locationRefRoutes } from './services/locationRef/locationRef.route';
import { stockRoutes } from './services/stock/stock.route';

export function buildApp() {
  const app = Fastify({ logger: { level: 'error' } });

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
  app.setErrorHandler(errorHandler);

  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));
  app.register(inventoryRoutes);
  app.register(stockRoutes);
  app.register(itemRefRoutes);
  app.register(locationRefRoutes);

  return app;
}
