import { env } from '@/config/env';
import { errorHandler } from '@/shared/errors/errorHandler';
import { serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod';
import Fastify from 'fastify';
import { inventoryRoutes } from './controller/inventory/inventory.route';

export function buildApp() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler(errorHandler);

  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));
  app.register(inventoryRoutes, { prefix: '/api/inventories' });

  return app;
}
