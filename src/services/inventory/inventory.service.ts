import { krangApi, wanUserApi } from '@/lib/api-client';
import { AppError } from '@57eme-regiment/nabu-errors';
import type {
  CreateInventory,
  Inventory,
  InventoryDetails,
  UpdateInventory,
} from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';
import { StockService } from '../stock/stock.service';
import { InventoryRepository } from './inventory.repository';

/** Service métier pour la gestion des inventaires. */
@injectable()
export class InventoryService {
  constructor(
    private readonly inventoryRepo: InventoryRepository,
    private readonly stockService: StockService,
  ) {}

  /** Retourne tous les id de tous les inventaires. */
  async getAll(): Promise<Inventory[]> {
    return this.inventoryRepo.findAll({ select: { id: true } });
  }

  /**
   * Retourne un inventaire et tout ces details par son identifiant.
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async getInventoryDetails(id: string): Promise<InventoryDetails> {
    const inventory = await this.inventoryRepo.findByIdOrThrow(id);
    if (!inventory)
      throw new AppError('Inventory not found', 404, 'INVENTORY_NOT_FOUND');
    if (!inventory.ownerId)
      throw new AppError(
        'Inventory owner not defined',
        404,
        'INVENTORY_NOT_FOUND',
      );

    const owner = await wanUserApi.getById({
      params: {
        userId: inventory.ownerId,
      },
    });
    if (owner.status != 200)
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');

    const location = await krangApi.location.getNames({
      params: { id: inventory.locationId },
    });
    if (location.status != 200)
      throw new AppError('Location not found', 404, 'LOCATION_NOT_FOUND');

    const stocksByInventory = await this.stockService.getByInventory(
      inventory.id,
    );

    return {
      ...inventory,
      owner: owner.body,
      location: location.body,
      stocks: stocksByInventory,
    };
  }

  /**
   * Retourne un inventaire par son identifiant.
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async getById(id: string): Promise<Inventory> {
    const inventory = await this.inventoryRepo.findByIdOrThrow(id);
    if (!inventory)
      throw new AppError('Inventory not found', 404, 'INVENTORY_NOT_FOUND');
    return inventory;
  }

  /** Crée un nouvel inventaire. */
  async create(data: CreateInventory): Promise<Inventory> {
    return this.inventoryRepo.create(data);
  }

  /**
   * Met à jour un inventaire existant.
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async update(id: string, data: UpdateInventory): Promise<Inventory> {
    await this.getById(id);
    return this.inventoryRepo.update(id, data);
  }

  /**
   * Supprime un inventaire.
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async delete(id: string): Promise<void> {
    await this.getById(id);
    return this.inventoryRepo.delete(id);
  }
}
