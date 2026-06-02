import { StockService } from '@/services/stock/stock.service';
import {
  CreateStock,
  StockIdParams,
  UpdateStock,
} from '@57eme-regiment/renenutet-api-contract/schemas/stock.schema';
import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';

/** Contrôleur HTTP pour les opérations de lecture et mise à jour des stocks. */
@injectable()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  /** Crée un nouveau stock pour un item dans un inventaire. */
  async create(
    req: FastifyRequest<{ Body: CreateStock }>,
    reply: FastifyReply,
  ) {
    const stock = await this.stockService.create(req.body);
    return reply.status(201).send(stock);
  }

  /** Retourne la liste complète des stocks. */
  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const stocks = await this.stockService.getAll();
    return reply.send(stocks);
  }

  /** Retourne tous les stocks appartenant à un inventaire. */
  async getByInventory(
    req: FastifyRequest<{ Params: { inventoryId: string } }>,
    reply: FastifyReply,
  ) {
    const stocks = await this.stockService.getByInventory(
      req.params.inventoryId,
    );
    return reply.send(stocks);
  }

  /** Retourne tous les stocks associés à un item. */
  async getByItem(
    req: FastifyRequest<{ Params: { itemId: string } }>,
    reply: FastifyReply,
  ) {
    const stocks = await this.stockService.getByItem(req.params.itemId);
    return reply.send(stocks);
  }

  /**
   * Retourne le stock d'un item précis dans un inventaire (clé composite).
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async getByKey(
    req: FastifyRequest<{ Params: StockIdParams }>,
    reply: FastifyReply,
  ) {
    const stock = await this.stockService.getByKey(
      req.params.itemId,
      req.params.inventoryId,
    );
    return reply.send(stock);
  }

  /**
   * Met à jour le stock d'un item dans un inventaire.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async increment(
    req: FastifyRequest<{ Params: StockIdParams; Body: UpdateStock }>,
    reply: FastifyReply,
  ) {
    const stock = await this.stockService.increment(
      req.params.itemId,
      req.params.inventoryId,
      req.body,
    );
    return reply.send(stock);
  }
  /**
   * Met à jour le stock d'un item dans un inventaire.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async decrement(
    req: FastifyRequest<{ Params: StockIdParams; Body: UpdateStock }>,
    reply: FastifyReply,
  ) {
    const stock = await this.stockService.decrement(
      req.params.itemId,
      req.params.inventoryId,
      req.body,
    );
    return reply.send(stock);
  }
}
