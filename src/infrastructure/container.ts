import { InventoryController } from '@/controller/inventory/inventory.controller';
import { ItemRefController } from '@/controller/itemRef/itemRef.controller';
import { LocationRefController } from '@/controller/locationRef/locationRef.controller';
import { StockController } from '@/controller/stock/stock.controller';
import { InventoryRepository } from '@/repository/inventory/inventory.repository';
import { IInventoryRepository } from '@/repository/inventory/inventory.repository.interface';
import { ItemRefRepository } from '@/repository/itemRef/itemRef.repository';
import { IItemRefRepository } from '@/repository/itemRef/itemRef.repository.interface';
import { LocationRefRepository } from '@/repository/locationRef/locationRef.repository';
import { ILocationRefRepository } from '@/repository/locationRef/locationRef.repository.interface';
import { StockRepository } from '@/repository/stock/stock.repository';
import { IStockRepository } from '@/repository/stock/stock.repository.interface';
import { InventoryService } from '@/service/inventory/inventory.service';
import { IInventoryService } from '@/service/inventory/inventory.service.interface';
import { ItemRefService } from '@/service/itemRef/itemRef.service';
import { IItemRefService } from '@/service/itemRef/itemRef.service.interface';
import { LocationRefService } from '@/service/locationRef/locationRef.service';
import { ILocationRefService } from '@/service/locationRef/locationRef.service.interface';
import { StockService } from '@/service/stock/stock.service';
import { IStockService } from '@/service/stock/stock.service.interface';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Database } from './database';

container.registerSingleton(Database);

container.registerSingleton<IInventoryRepository>(
  'IInventoryRepository',
  InventoryRepository,
);
container.registerSingleton<IInventoryService>(
  'IInventoryService',
  InventoryService,
);
container.registerSingleton(InventoryController);

container.registerSingleton<IStockRepository>(
  'IStockRepository',
  StockRepository,
);
container.registerSingleton<IStockService>('IStockService', StockService);
container.registerSingleton(StockController);

container.registerSingleton<IItemRefRepository>(
  'IItemRefRepository',
  ItemRefRepository,
);
container.registerSingleton<IItemRefService>('IItemRefService', ItemRefService);
container.registerSingleton(ItemRefController);

container.registerSingleton<ILocationRefRepository>(
  'ILocationRefRepository',
  LocationRefRepository,
);
container.registerSingleton<ILocationRefService>(
  'ILocationRefService',
  LocationRefService,
);
container.registerSingleton(LocationRefController);

export { container };
