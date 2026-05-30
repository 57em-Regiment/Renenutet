import type { CreateInventory, Inventory, UpdateInventory } from '@57eme-regiment/renenutet-api-contract';
import { AppError } from '@/shared/errors/appError';
import { injectable } from 'tsyringe';
import { InventoryRepository } from './inventory.repository';

/** Service métier pour la gestion des inventaires. */
@injectable()
export class InventoryService {
  constructor(
    private readonly inventoryRepo: InventoryRepository,
  ) {}

  /** Retourne tous les inventaires. */
  async getAll(): Promise<Inventory[]> {
    return this.inventoryRepo.findAll();
  }

  /**
   * Retourne un inventaire par son identifiant.
   * @throws {AppError} 404 si l'inventaire est introuvable.
   */
  async getById(id: string): Promise<Inventory> {
    const inventory = await this.inventoryRepo.findById(id);
    if (!inventory) throw new AppError('Inventory not found', 404, 'INVENTORY_NOT_FOUND');
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
