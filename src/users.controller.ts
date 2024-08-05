import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/users') //the default router for the below funtions like expressJs.
export class UsersController {

  @Get('/profile')
  getProfile(@Req() req: Request) {
    console.log(req); //with this @Req we can access the Request object and its values like Body,Params,Query etc..
    return 'Hello Parth!';
  }
}