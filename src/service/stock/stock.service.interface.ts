import type { Stock } from "@/generated/client";
import type { UpdateStock } from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";

/** Contrat métier pour la gestion des stocks. */
export interface IStockService {
  /** Retourne tous les stocks. */
  getAll(): Promise<Stock[]>;

  /**
   * Retourne un stock par son identifiant.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  getById(id: string): Promise<Stock>;

  /** Retourne tous les stocks d'un inventaire donné. */
  getByInventory(inventoryId: string): Promise<Stock[] | null>;

  /** Retourne tous les stocks pour un item donné. */
  getByItem(itemId: string): Promise<Stock[] | null>;

  /**
   * Retourne le stock précis d'un item dans un inventaire.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  getStock(inventoryId: string, itemId: string): Promise<Stock | null>;

  /**
   * Met à jour la quantité (ou les champs) d'un stock.
   * @throws {AppError} 404 si le stock est introuvable.
   */
  update(id: string, data: UpdateStock): Promise<Stock>;
}
