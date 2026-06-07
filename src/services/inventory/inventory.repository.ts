import { InventorySelect } from '@/generated/models';
import { Database } from '@/infrastructure/database';
import type {
  CreateInventory,
  Inventory,
  InventoryCode,
  UpdateInventory,
  UpdateInventoryCode,
} from '@57eme-regiment/renenutet-api-contract';
import { injectable } from 'tsyringe';

/** Contrat d'accès aux données pour les inventaires. */
@injectable()
export class InventoryRepository {
  constructor(private readonly db: Database) {}

  /** Retourne tous les inventaires. */
  findAll({ select }: { select: InventorySelect }): Promise<Inventory[]> {
    return this.db.context.inventory.findMany({
      ...(select && { select }),
    });
  }

  /** Retourne un inventaire par son id, ou `null` s'il est introuvable. */
  findByIdOrThrow(id: string): Promise<Inventory | null> {
    return this.db.context.inventory.findUniqueOrThrow({ where: { id } });
  }

  /**
   * Retourne le code d'un inventaire par l'id de l'inventaire.
   */
  async getInventoryCodeAsync(
    id: string,
  ): Promise<InventoryCode | undefined | null> {
    const inventory = await this.db.context.inventory.findUniqueOrThrow({
      where: { id },
    });

    if (!inventory) return undefined;
    return { code: inventory.accessCode ?? null };
  }

  /** Met à jour le code d'accès d'un inventaire. */
  updateCode(id: string, { code }: UpdateInventoryCode): Promise<Inventory> {
    return this.db.context.inventory.update({
      where: { id },
      data: { accessCode: code },
    });
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
