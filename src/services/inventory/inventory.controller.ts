import { InventoryService } from '@/services/inventory/inventory.service';
import type {
  CreateInventory,
  InventoryParams,
  UpdateInventory,
  UpdateInventoryCode,
} from '@57eme-regiment/renenutet-api-contract';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';

/** Contrôleur HTTP pour les opérations CRUD sur les inventaires. */
@injectable()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  /** Retourne la liste complète des inventaires. */
  async getInventoriesList(_req: FastifyRequest, reply: FastifyReply) {
    const inventories = await this.inventoryService.getAllIds();
    console.log(
      '🚀 ~ InventoryController ~ getInventoriesList ~ inventories:',
      inventories,
    );
    return reply.send(inventories);
  }

  /** Retourne la liste complète des inventaires. */
  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const inventories = await this.inventoryService.getAll();
    return reply.send(inventories);
  }

  /**
   * Retourne un inventaire par son id.
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async getInventoryDetails(
    req: FastifyRequest<{ Params: InventoryParams }>,
    reply: FastifyReply,
  ) {
    const inventory = await this.inventoryService.getInventoryDetails(
      req.params.id,
    );
    return reply.send(inventory);
  }

  /**
   * Retourne le code d'un inventaire par l'id de l'inventaire.
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async getInventoryCode(
    req: FastifyRequest<{ Params: InventoryParams }>,
    reply: FastifyReply,
  ) {
    const inventory = await this.inventoryService.getInventoryCode(
      req.params.id,
    );
    return reply.send(inventory);
  }

  /**
   * Met à jour le code d'accès d'un inventaire.
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async updateCode(
    req: FastifyRequest<{ Params: InventoryParams; Body: UpdateInventoryCode }>,
    reply: FastifyReply,
  ) {
    const code = await this.inventoryService.updateCode(
      req.params.id,
      req.body,
    );
    return reply.send(code);
  }

  /** Crée un nouvel inventaire et retourne la ressource créée (201). */
  async create(
    req: FastifyRequest<{ Body: CreateInventory }>,
    reply: FastifyReply,
  ) {
    const inventory = await this.inventoryService.create(req.body);
    return reply.status(201).send(inventory);
  }

  /**
   * Met à jour un inventaire existant.
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async update(
    req: FastifyRequest<{ Params: InventoryParams; Body: UpdateInventory }>,
    reply: FastifyReply,
  ) {
    const inventory = await this.inventoryService.update(
      req.params.id,
      req.body,
    );
    return reply.send(inventory);
  }

  /**
   * Supprime un inventaire (204 sans corps).
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async delete(
    req: FastifyRequest<{ Params: InventoryParams }>,
    reply: FastifyReply,
  ) {
    await this.inventoryService.delete(req.params.id);
    return reply.status(204).send();
  }
}
