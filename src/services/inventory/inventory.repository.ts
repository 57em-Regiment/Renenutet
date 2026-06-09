import { inventory } from '@/drizzle/schema';
import { Database } from '@/infrastructure/database';
import type {
  CreateInventory,
  Inventory,
  InventoryCode,
  UpdateInventory,
  UpdateInventoryCode,
} from '@57eme-regiment/renenutet-api-contract';
import { eq } from 'drizzle-orm';
import { injectable } from 'tsyringe';

/** Accès aux données de la table `Inventory`. */
@injectable()
export class InventoryRepository {
  constructor(private readonly db: Database) {}

  /** Retourne tous les inventaires avec l'ensemble de leurs champs. */
  findAll(): Promise<Inventory[]> {
    return this.db.context.select().from(inventory);
  }

  /** Retourne uniquement les identifiants de tous les inventaires. */
  findAllIds(): Promise<{ id: string }[]> {
    return this.db.context.select({ id: inventory.id }).from(inventory);
  }

  /**
   * Retourne un inventaire par son identifiant.
   * @throws {Error} si aucun inventaire ne correspond à l'id.
   */
  async findByIdOrThrow(id: string): Promise<Inventory> {
    const result = await this.db.context
      .select()
      .from(inventory)
      .where(eq(inventory.id, id))
      .limit(1);
    if (!result[0]) throw new Error(`Inventory not found: ${id}`);
    return result[0];
  }

  /**
   * Retourne le code d'accès d'un inventaire.
   * @returns `undefined` si l'inventaire est introuvable, `{ code: null }` s'il n'a pas de code.
   */
  async getInventoryCodeAsync(
    id: string,
  ): Promise<InventoryCode | undefined | null> {
    const result = await this.db.context
      .select()
      .from(inventory)
      .where(eq(inventory.id, id))
      .limit(1);
    if (!result[0]) return undefined;
    return { code: result[0].accessCode ?? null };
  }

  /** Met à jour le code d'accès d'un inventaire et retourne l'enregistrement mis à jour. */
  async updateCode(
    id: string,
    { code }: UpdateInventoryCode,
  ): Promise<Inventory> {
    const result = await this.db.context
      .update(inventory)
      .set({ accessCode: code })
      .where(eq(inventory.id, id))
      .returning();
    return result[0];
  }

  /** Insère un nouvel inventaire et retourne l'enregistrement créé. */
  async create(data: CreateInventory): Promise<Inventory> {
    const result = await this.db.context
      .insert(inventory)
      .values(data as typeof inventory.$inferInsert)
      .returning();
    return result[0];
  }

  /** Met à jour les champs d'un inventaire et retourne l'enregistrement mis à jour. */
  async update(id: string, data: UpdateInventory): Promise<Inventory> {
    const result = await this.db.context
      .update(inventory)
      .set(data)
      .where(eq(inventory.id, id))
      .returning();
    return result[0];
  }

  /** Supprime un inventaire par son identifiant. */
  async delete(id: string): Promise<void> {
    await this.db.context.delete(inventory).where(eq(inventory.id, id));
  }
}
