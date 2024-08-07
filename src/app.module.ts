import { Injectable, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AlbumController } from './albums.controller';
import { Crud } from './crud.controller';
import { UserStore } from './users.store';
import { user_dep } from './user_dep.controller';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { config } from 'process';
import { resolve } from 'path';
import { rejects } from 'assert';

const IS_DEV = true;

@Injectable()
class EnvConfig {
  envType: 'DEV' | 'STAGE' | 'PROD';
  constructor() {
    this.envType = 'DEV';
  }
}

const connection = async (options: Record<string, any>) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(options);
      resolve('Connection established');
    }, 2000);
  });
};
@Module({
  controllers: [UsersController, AlbumController, Crud, user_dep],
  // providers:[{provide:UserStore,useClass:UserStore}]              //this class will be use as a dependencies , it will create instance if that class
  //first value is injection token(with which name we can access that instance )
  // second value: then pass the reference of this class

  // providers: [UserStore],
  // providers: [UserStore, {provide:"name of another instance", useExisting:UserStore}],
  // means when we access the provide it return the alreadyExisting Store.

  // providers:[{provide:"DATABASE_NAME" ,useValue:"DATA"} ] //we can also pass the string,array,objects value for the deps.

  //factory provider:

  // providers: [
  //   {
  //     provide: 'EVENT_STORE',
  //     useFactory: (config: EnvConfig, limit: number = 4) => {
  //       // const eventBus = IS_DEV
  //       //   ? new ReplaySubject(2)
  //       //   : new BehaviorSubject(null);
  //       // console.log(limit);

  //       //we can use the class as a dependecies so its below
  //       const eventBus =
  //         config.envType === 'DEV'
  //           ? new ReplaySubject(2)
  //           : new BehaviorSubject(null);
  //       console.log(limit);
  //       return eventBus; //here we conditionally pass the data of eventbus to the controllers.
  //     }, //if the factory need some dependecies so we can pass as a inject :like here need limit to run it
  //     inject: [EnvConfig, { token: 'limit', optional: true }], //we can also make it optional
  //     //also we can pass the class as a dependecies
  //   },
  //   // {
  //   //   provide: 'limit',
  //   //   useValue: 2,
  //   // },
  // ],

  // For async useFactory.. like untill this not resolve the all the services will wait

  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (options) => {
        const data = await connection(options);
        return data;
      },
      inject:["DB_OPTIONS"]
    },
    {
      provide: 'DB_OPTIONS',
      useValue: { url: '', user: '', password: '' },
    },
  ],
})
export class AppModule {}
