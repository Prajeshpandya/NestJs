import { Controller, Get, Post, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/albums')
export class AlbumController {
  @Get('/name')
  getAlbumName() {
    return 'This is my album';
  }

  @Get('/redirect')
  @Redirect("/albums/toRedirect")
  redirectTheReq() {
    return 'This is for redirect';
  }

  @Get('/toredirect')
  toRedirect() {
    return 'This is Redirected Req!';
  }



}
