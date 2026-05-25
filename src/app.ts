import { env } from '@/config/env';
import { AppError } from '@/shared/errors/app-error';
import Fastify from 'fastify';
import { inventoryRoutes } from './controller/inventory/inventory.route';

export function buildApp() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  app.setErrorHandler((error: unknown, req, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: error.code ?? error.name,
        message: error.message,
      });
    }
    if (error instanceof Error && 'validation' in error) {
      return reply.status(422).send({
        error: 'VALIDATION_ERROR',
        message: error.message,
      });
    }
    req.log.error(error);
    return reply
      .status(500)
      .send({ error: 'INTERNAL_ERROR', message: 'Internal server error' });
  });

  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));
  app.register(inventoryRoutes, { prefix: '/api/inventories' });

  return app;
}
