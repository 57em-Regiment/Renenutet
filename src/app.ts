import { env } from '@/config/env';
import { errorHandler } from '@/shared/errors/errorHandler';
import cors from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
} from '@fastify/type-provider-zod';
import Fastify from 'fastify';
import { inventoryRoutes } from './controller/inventory/inventory.route';
import { itemRefRoutes } from './controller/itemRef/itemRef.route';
import { locationRefRoutes } from './controller/locationRef/locationRef.route';
import { stockRoutes } from './controller/stock/stock.route';

export function buildApp() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  app.register(cors, {
    origin: env.CORS_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler(errorHandler);

  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));
  app.register(inventoryRoutes, { prefix: '/api/inventories' });
  app.register(stockRoutes, { prefix: '/api/stocks' });
  app.register(itemRefRoutes, { prefix: '/api/itemRef' });
  app.register(locationRefRoutes, { prefix: '/api/locationRef' });

  return app;
}
