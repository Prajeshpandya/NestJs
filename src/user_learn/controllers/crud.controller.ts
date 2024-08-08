import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUserDto';

let Users = [
  {
    name: 'Parth',
    age: 20,
    id: 123,
  },
  {
    name: 'Ravindra',
    age: 25,
    id: 123456,
  },
];

@Controller('/crud')
export class Crud {
  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    Users.push(createUser);
    return 'User Created!';
  }

  @Get()
  getUsers() {
    return Users;
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return Users.find((user) => user.id === Number(id));
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUser: CreateUserDto) {
    const user = Users.find((user) => user.id === Number(id));
    if (!user) return 'No User Found!';

    user.age = updateUser.age;
    user.name = updateUser.name;
    user.id = updateUser.id;

    return 'User Updated!';
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    Users= Users.filter((user) => user.id !== Number(id));

    return 'User Delete!';  
  }
}
