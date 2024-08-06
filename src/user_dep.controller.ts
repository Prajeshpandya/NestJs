import { Controller, Inject, Optional } from '@nestjs/common';
import { UserStore } from './users.store';

@Controller()
export class user_dep {
  constructor( private store: UserStore) {
    //@Optional(): its not necessory to provide that respective store
    //if the instance name and class is not same then we have to use the @Inject("storeName") . 
    console.log(this.store);
  }
}
