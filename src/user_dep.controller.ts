import { Controller, Get, Inject, Optional } from '@nestjs/common';
import { UserStore } from './users.store';
import { Subject } from 'rxjs';

// @Controller()
// export class user_dep {
//   constructor( private store: UserStore) {
//     //@Optional(): its not necessory to provide that respective store
//     //if the instance name and class is not same then we have to use the @Inject("storeName") .
//     console.log(this.store);

//     //for access the string value , its necessory to use @Inject('DbName')
//   }
// }

//useFactory understanding!!

@Controller('/users' ,)
export class user_dep {
  constructor(
    @Inject('DATABASE_CONNECTION') private eventbus: Subject<any>,
    @Inject('EVENT_STORE') private readonly eventStore: Subject<any>,
    private readonly userStore: UserStore
  ) {
    console.log(this.eventStore);
    console.log(this.eventbus);
    console.log(userStore)
  }

  @Get()
  getUsers() {
    this.userStore.getUsers();
    return "Usersss..."
  }
}
