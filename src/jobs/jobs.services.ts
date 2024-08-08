import { Injectable } from '@nestjs/common';

@Injectable()
export class jobService {
  constructor() {
    console.log('Job service Called!');
  }
}