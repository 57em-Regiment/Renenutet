import { UpdateStock } from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";
import { Stock } from "@/generated/client";

/** Contrat d'accès aux données pour les stocks. */
export interface IStockRepository {
  /** Retourne tous les stocks. */
  findAll(): Promise<Stock[]>;

  /**
   * Retourne le stock d'un item dans un inventaire via la clé composite,
   * ou `null` s'il est introuvable.
   */
  findByKey(itemId: string, inventoryId: string): Promise<Stock | null>;

  /** Retourne tous les stocks associés à un inventaire. */
  findByInventory(inventoryId: string): Promise<Stock[]>;

  /** Retourne tous les stocks associés à un item. */
  findByItem(itemId: string): Promise<Stock[]>;

  /** Met à jour les champs d'un stock via la clé composite. */
  update(itemId: string, inventoryId: string, data: UpdateStock): Promise<Stock>;
}
