import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AlbumController } from './albums.controller';
import { Crud } from './crud.controller';

@Module({
  controllers: [UsersController,AlbumController,Crud],
})
export class AppModule {

}
