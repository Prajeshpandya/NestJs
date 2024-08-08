import { Controller, Get, Inject } from '@nestjs/common';
import { UserStore } from '../../users.store';

@Controller('/test')
export class test {
  constructor(private readonly userStore: UserStore) {
    console.log(userStore);
  }
  @Get()
  getData() {
    return this.userStore.getUsers;
  }
}
