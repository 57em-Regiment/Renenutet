import { inject, injectable } from "tsyringe";
import { IStockService } from "@/service/stock/stock.service.interface";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  StockParams,
  UpdateStock,
} from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";

@injectable()
export class StockController {
  constructor(
    @inject("IStockService") private readonly stockService: IStockService,
  ) {}

  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const stocks = this.stockService.getAll();
    return reply.send(stocks);
  }

  async getById(
    req: FastifyRequest<{ Params: StockParams }>,
    reply: FastifyReply,
  ) {
    const stock = this.stockService.getById(req.params.id);
    return reply.send(stock);
  }

  async getByItem(
    req: FastifyRequest<{ Params: StockParams }>,
    reply: FastifyReply,
  ) {
    const stock = this.stockService.getByItem(req.params.itemId);
    return reply.send(stock);
  }

  async getByInventory(
    req: FastifyRequest<{ Params: StockParams }>,
    reply: FastifyReply,
  ) {
    const stock = this.stockService.getByInventory(req.params.inventoryId);
    return reply.send(stock);
  }

  async getStock(
    req: FastifyRequest<{ Params: StockParams }>,
    reply: FastifyReply,
  ) {
    const stock = this.stockService.getStock(req.params.id, req.params.itemId);
    return reply.send(stock);
  }

  async update(
    req: FastifyRequest<{ Params: StockParams; Body: UpdateStock }>,
    reply: FastifyReply,
  ) {
    const stock = await this.stockService.update(req.params.id, req.body);
    return reply.send(stock);
  }
}
