import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/albums')
export class AlbumController {
  @Get('/name')
  getAlbumName() {
    return 'This is my album';
  }

  @Get('/redirect')
  @Redirect('/albums/toRedirect')
  redirectTheReq() {
    return 'This is for redirect';
  }

  @Get('/toredirect')
  @HttpCode(304)
  toRedirect() {
    return 'This is Redirected Req!';
  }

  @Get('/videos')
  getVideosQuery(@Query() param: Record<string, any>) {
    // console.log(params)    //for whole object console.log
    console.log(param); //for get perticular id. we pass parameter name in @Param()
    return 'success';
  }
  @Get('/videos/headers')
  getVideosHeaders(@Headers('user-agent') headers: Record<string, any>) {
    console.log(headers);
    return 'success';
  }

  @Get('/videos/:id')
  getVideosParams(@Param('id') param: Record<string, any>) {
    // console.log(params)    //for whole object console.log
    console.log(param); //for get perticular id. we pass parameter name in @Param()
    return 'success';
  }

  @Post('/create')
  createAlbum(@Body() reqData: Record<string, any>) {
    console.log(reqData);
    const arr = {
      name: reqData.name,
      topic: reqData.topic,
    };

    const res = {
      message: 'Your Album Has been Added!',
      arr,
    };

    return res;
  }
}
