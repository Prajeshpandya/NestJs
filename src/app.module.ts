import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AlbumController } from './albums.controller';
import { Crud } from './crud.controller';
import { UserStore } from './users.store';
import { user_dep } from './user_dep.controller';

@Module({
  controllers: [UsersController, AlbumController, Crud, user_dep],
  // providers:[{provide:UserStore,useClass:UserStore}]              //this class will be use as a dependencies , it will create instance if that class
  //first value is injection token(with which name we can access that instance )
  // second value: then pass the reference of this class

  // providers: [UserStore],
  providers: [UserStore, {provide:"name of another instance", useExisting:UserStore}], 
  // means when we access the provide it return the alreadyExisting Store.

})
export class AppModule {}
