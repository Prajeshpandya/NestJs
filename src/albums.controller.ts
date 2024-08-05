import { Controller, Get } from '@nestjs/common';

@Controller('/albums')
export class AlbumController {
  @Get('/name')
  getAlbumName() {
    return 'This is my album';
  }
}
