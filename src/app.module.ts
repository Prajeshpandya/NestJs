import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AlbumController } from './albums.controller';

@Module({
  controllers: [UsersController,AlbumController],
})
export class AppModule {

}
