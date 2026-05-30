import { Database } from '@/infrastructure/database';
import type {
  CreateInventory,
  Inventory,
  UpdateInventory,
} from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';

/** Contrat d'accès aux données pour les inventaires. */
@injectable()
export class InventoryRepository {
  constructor(private readonly db: Database) {}

  /** Retourne tous les inventaires. */
  findAll(): Promise<Inventory[]> {
    return this.db.context.inventory.findMany({});
  }

  /** Retourne un inventaire par son id, ou `null` s'il est introuvable. */
  findById(id: string): Promise<Inventory | null> {
    return this.db.context.inventory.findUnique({ where: { id } });
  }

  /** Persiste un nouvel inventaire. */
  create(data: CreateInventory): Promise<Inventory> {
    return this.db.context.inventory.create({ data });
  }

  /** Met à jour les champs d'un inventaire existant. */
  update(id: string, data: UpdateInventory): Promise<Inventory> {
    return this.db.context.inventory.update({ where: { id }, data });
  }

  /** Supprime un inventaire. */
  async delete(id: string): Promise<void> {
    await this.db.context.inventory.delete({ where: { id } });
  }
}
