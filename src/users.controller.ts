import { Controller, Get, HostParam, Ip, Req } from '@nestjs/common';
import { Request } from 'express';

// @Controller({path: "/users" , host:"app.domain.com"}) //here we can specify the domain for taking request and accept!
@Controller({ path: '/users', host: ':app.domain.com' }) //here we can also get dynamic Host and access that dynamic param.
//the default router for the below funtions like expressJs.
export class UsersController {
  @Get('/profile')
  getProfile(@Req() req: Request) {
    console.log(req); //with this @Req we can access the Request object and its values like Body,Params,Query etc..
    return 'Hello Parth!';
  }
  getParam(@HostParam() params: Record<string, any>) {
    console.log(params); //with this @Req we can access the Request object and its values like Body,Params,Query etc..
    return 'successfully get params domain.';
  }
  getIp(@Ip() ip: string) {
    console.log(ip); 
    return 'successfully get ip.';
  }
}
