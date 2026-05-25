import {
  CreateInventory,
  UpdateInventory,
} from "@57em-regiment/renenutet-api-contract";
import { Inventory } from "@/generated/client";

export interface IInventoryRepository {
  findAll(): Promise<Inventory[]>;
  findById(id: string): Promise<Inventory | null>;
  create(data: CreateInventory): Promise<Inventory>;
  update(id: string, data: UpdateInventory): Promise<Inventory>;
  delete(id: string): Promise<void>;
}
