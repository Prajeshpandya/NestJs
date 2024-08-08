import { Injectable } from '@nestjs/common';

@Injectable()
export class cacheService {
  constructor() {
    console.log('Cache Service called');
  }
}
