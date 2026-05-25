import { UpdateStock } from "@57em-regiment/renenutet-api-contract/schemas/stock.schema";
import { Stock } from "@/generated/client";

/** Contrat d'accès aux données pour les stocks. */
export interface IStockRepository {
  /** Retourne tous les stocks. */
  findAll(): Promise<Stock[]>;

  /** Retourne un stock par son id, ou `null` s'il est introuvable. */
  findById(id: string): Promise<Stock | null>;

  /** Retourne tous les stocks associés à un inventaire. */
  findStocskByInventory(invId: string): Promise<Stock[] | null>;

  /** Retourne tous les stocks associés à un item. */
  getStockByItem(itemId: string): Promise<Stock[] | null>;

  /** Retourne le stock d'un item spécifique identifié par son id composite (id + itemId). */
  getStock(inventoryId: string, itemId: string): Promise<Stock | null>;

  /** Met à jour les champs d'un stock existant. */
  update(id: string, data: UpdateStock): Promise<Stock>;
}
