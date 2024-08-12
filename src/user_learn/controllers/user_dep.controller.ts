import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UserStore } from '../../users.store';
import { Subject } from 'rxjs';
import { Userservices } from '../services/users.services';
import { CreateUserDto } from '../dtos/createUserDto';
import { ParseDatePipe } from 'src/parse-date.pipe';

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

  @UsePipes(ParseIntPipe)
  @Get(':id')
  getUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    //learn parsePipes for data converstion. if its not expacted data it will automatically throw the error response with the statusCode 400
    //also i can modify the response as per my requirement for that we need to create a instance and then pass options
    //NOTE: i can also use the UsePipes for all the get data transfer in respective request
    //We can specify the defaultValues also with usePipes and pass the value with new instance
    //we can also apply multiple pipes as well.
    return this.userService.getUser(id);
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
  @Post('/test')
  getDate(@Body('timestamp', ParseDatePipe) date) {
    //here we can specify which type of return type we need with Eg. date:String
    console.log(date);
    return this.userService.testPipe();
  }
}
