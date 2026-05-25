import { inject, injectable } from "tsyringe";
import { IStockService } from "@/service/stock/stock.service.interface";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  StockParams,
  UpdateStock,
} from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";

/** Contrôleur HTTP pour les opérations de lecture et mise à jour des stocks. */
@injectable()
export class StockController {
  constructor(
    @inject("IStockService") private readonly stockService: IStockService,
  ) {}

  /** Retourne la liste complète des stocks. */
  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const stocks = this.stockService.getAll();
    return reply.send(stocks);
  }

  /**
   * Retourne un stock par son identifiant.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async getById(
    req: FastifyRequest<{ Params: StockParams }>,
    reply: FastifyReply,
  ) {
    const stock = this.stockService.getById(req.params.id);
    return reply.send(stock);
  }

  /** Retourne tous les stocks appartenant à un inventaire. */
  async getByItem(
    req: FastifyRequest<{ Params: StockParams }>,
    reply: FastifyReply,
  ) {
    const stock = this.stockService.getByItem(req.params.itemId);
    return reply.send(stock);
  }

  /** Retourne tous les stocks associés à un item. */
  async getByInventory(
    req: FastifyRequest<{ Params: StockParams }>,
    reply: FastifyReply,
  ) {
    const stock = this.stockService.getByInventory(req.params.inventoryId);
    return reply.send(stock);
  }

  /**
   * Retourne le stock d'un item précis dans un inventaire.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async getStock(
    req: FastifyRequest<{ Params: StockParams }>,
    reply: FastifyReply,
  ) {
    const stock = this.stockService.getStock(req.params.inventoryId, req.params.itemId);
    return reply.send(stock);
  }

  /**
   * Met à jour la quantité (ou les champs) d'un stock existant.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  async update(
    req: FastifyRequest<{ Params: StockParams; Body: UpdateStock }>,
    reply: FastifyReply,
  ) {
    const stock = await this.stockService.update(req.params.id, req.body);
    return reply.send(stock);
  }
}
