import type { Stock } from "@/generated/client";
import type { UpdateStock } from "@57eme-regiment/renenutet-api-contract/schemas/stock.schema";

/** Contrat métier pour la gestion des stocks. */
export interface IStockService {
  /** Retourne tous les stocks. */
  getAll(): Promise<Stock[]>;

  /** Retourne tous les stocks d'un inventaire donné. */
  getByInventory(inventoryId: string): Promise<Stock[]>;

  /** Retourne tous les stocks pour un item donné. */
  getByItem(itemId: string): Promise<Stock[]>;

  /**
   * Retourne le stock précis d'un item dans un inventaire via la clé composite.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  getByKey(itemId: string, inventoryId: string): Promise<Stock>;

  /**
   * Met à jour le stock d'un item dans un inventaire.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  update(itemId: string, inventoryId: string, data: UpdateStock): Promise<Stock>;
}
