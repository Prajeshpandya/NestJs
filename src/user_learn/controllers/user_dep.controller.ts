import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Optional,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserStore } from '../../users.store';
import { Subject } from 'rxjs';
import { Userservices } from '../services/users.services';
import { CreateUserDto } from '../dtos/createUserDto';

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

@Controller('/users')
export class user_dep {
  constructor(
    // @Inject('DATABASE_CONNECTION') private eventbus: Subject<any>,
    // @Inject('EVENT_STORE') private readonly eventStore: Subject<any>,
    // private readonly userStore: UserStore,
    private userService: Userservices,
  ) {
    // console.log(this.eventStore);
    // console.log(this.eventbus);
    // console.log(userStore);
    console.log(' console in userService ' + userService);
  }

  // getUsers() {
  //   this.userStore.getUsers();
  //   return "Usersss..."
  // }
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    console.log('controller called');
    this.userService.addUser(CreateUserDto);
    return { message: 'User Created!' };
  }
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(+id);
  }
  @Put(':id')
  updateUser(@Param('id') id: number, updateUserDto: CreateUserDto) {
    this.userService.updateUser(+id, updateUserDto);
    return { message: 'user updtaed!' };
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    this.userService.deleteUser(+id);
    return { message: 'user deleted!' };
  }
}
