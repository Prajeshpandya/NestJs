import { Controller } from '@nestjs/common';
import { cacheService } from './cache.services';

@Controller()
export class cacheController {
  constructor(private cacheService: cacheService) {
    console.log('cacheService' + cacheService);
  }
}
