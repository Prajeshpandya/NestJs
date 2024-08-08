import { Module } from '@nestjs/common';
import { cacheService } from './cache.services';
import { cacheController } from './cache.controller';

const DEFAULT_STORE_NAME = 'Default_Cache';
const DEFAULT_STORE_TYPE = 'Default_Store';

class STORE_OPTIONS{
    constructor(){
        console.log("Store options")
    }
}

@Module({
  providers: [
    cacheService,
    {
      provide: STORE_OPTIONS,
      useValue: {
        storeName: DEFAULT_STORE_NAME,
        storeType: DEFAULT_STORE_TYPE,
      },
    },
  ],
  controllers: [cacheController],
  exports: [cacheService],
})
export class cacheModule {}
