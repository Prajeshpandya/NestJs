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
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserStore } from '../../users.store';
import { Subject } from 'rxjs';
import { Userservices } from '../services/users.services';
import { CreateUserDto } from '../dtos/createUserDto';
import { ParseDatePipe } from 'src/parse-date.pipe';
import { idExceptionError } from 'src/exception/id-exception.filter';
import { IdException } from 'src/exception/id-exception';

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
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() CreateUserDto: CreateUserDto) {
    console.log('controller called');
    this.userService.addUser(CreateUserDto);
    return { message: 'User Created!' };
  }

  //if the createUser is array so we have to modify and add the new ParseArrayPipe({items:CreateUserDto})
  // @Post()
  // @UsePipes(ValidationPipe)
  // createUser(@Body(new ParseArrayPipe({items:CreateUserDto}),ValidationPipe) CreateUserDto: CreateUserDto) {
  //   console.log('controller called');
  //   this.userService.addUser(CreateUserDto);
  //   return { message: 'User Created!' };
  // }

  // new ValidationPipe({transform:true}) if we have to transform the data as per we predefined so validationpipe can directly transform as per mentioned
  //whitelist:true, it trim the properties that not mentioned in dtos
  //skipMissingProperties:true, it skip the properties validation that not mentioned in dtos
  //skipAtfirstError: as per name , only throw first error
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

  @Get('/testcutomerror/:id') //custom error throw
  @UseFilters(idExceptionError)
  cutom(@Param('id') id: number) {
    throw new IdException();
    console.log(+id);
    return { message: 'Success' };
  }
}
