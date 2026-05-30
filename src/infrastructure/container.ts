import { InventoryController } from '@/services/inventory/inventory.controller';
import { InventoryRepository } from '@/services/inventory/inventory.repository';
import { InventoryService } from '@/services/inventory/inventory.service';
import { ItemRefController } from '@/services/itemRef/itemRef.controller';
import { ItemRefRepository } from '@/services/itemRef/itemRef.repository';
import { ItemRefService } from '@/services/itemRef/itemRef.service';
import { LocationRefController } from '@/services/locationRef/locationRef.controller';
import { LocationRefRepository } from '@/services/locationRef/locationRef.repository';
import { LocationRefService } from '@/services/locationRef/locationRef.service';
import { StockController } from '@/services/stock/stock.controller';
import { StockRepository } from '@/services/stock/stock.repository';
import { StockService } from '@/services/stock/stock.service';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Database } from './database';

container.registerSingleton(Database);

container.registerSingleton(InventoryRepository);
container.registerSingleton(InventoryService);
container.registerSingleton(InventoryController);

container.registerSingleton(StockRepository);
container.registerSingleton(StockService);
container.registerSingleton(StockController);

container.registerSingleton(ItemRefRepository);
container.registerSingleton(ItemRefService);
container.registerSingleton(ItemRefController);

container.registerSingleton(LocationRefRepository);
container.registerSingleton(LocationRefService);
container.registerSingleton(LocationRefController);

export { container };
