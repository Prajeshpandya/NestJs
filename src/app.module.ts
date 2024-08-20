import { Injectable, Module, OnModuleInit } from '@nestjs/common';
import { UsersController } from './user_learn/controllers/users.controller';
import { AlbumController } from './user_learn/controllers/albums.controller';
import { Crud } from './user_learn/controllers/crud.controller';
import { UserStore } from './users.store';
import { user_dep } from './user_learn/controllers/user_dep.controller';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { config } from 'process';
import { resolve } from 'path';
import { rejects } from 'assert';
import { test } from './user_learn/controllers/test.controller';
import { Userservices } from './user_learn/services/users.services';
import { userModule } from './user_learn/user.module';
import { jobs } from './jobs/jobs.module';
import { cacheModule } from './cache-store/cache.module';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { AppExceptionFilter } from './exception/app-exception.filter';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

// const IS_DEV = true;

// @Injectable()
// class EnvConfig {
//   envType: 'DEV' | 'STAGE' | 'PROD';
//   constructor() {
//     this.envType = 'DEV';
//   }
// }

// const connection = async (options: Record<string, any>) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(options);
//       resolve('Connection established');
//     }, 2000);
//   });
// };

@Module({
  // // controllers: [UsersController, AlbumController, Crud, user_dep, test],
  // // providers:[{provide:UserStore,useClass:UserStore}]              //this class will be use as a dependencies , it will create instance if that class
  // //first value is injection token(with which name we can access that instance )
  // // second value: then pass the reference of this class

  // // providers: [UserStore],
  // // providers: [UserStore, {provide:"name of another instance", useExisting:UserStore}],
  // // means when we access the provide it return the alreadyExisting Store.

  // // providers:[{provide:"DATABASE_NAME" ,useValue:"DATA"} ] //we can also pass the string,array,objects value for the deps.

  // //factory provider:

  // // providers: [
  // //   {
  // //     provide: 'EVENT_STORE',
  // //     useFactory: (config: EnvConfig, limit: number = 4) => {
  // //       // const eventBus = IS_DEV
  // //       //   ? new ReplaySubject(2)
  // //       //   : new BehaviorSubject(null);
  // //       // console.log(limit);

  // //       //we can use the class as a dependecies so its below
  // //       const eventBus =
  // //         config.envType === 'DEV'
  // //           ? new ReplaySubject(2)
  // //           : new BehaviorSubject(null);
  // //       console.log(limit);
  // //       return eventBus; //here we conditionally pass the data of eventbus to the controllers.
  // //     }, //if the factory need some dependecies so we can pass as a inject :like here need limit to run it
  // //     inject: [EnvConfig, { token: 'limit', optional: true }], //we can also make it optional
  // //     //also we can pass the class as a dependecies
  // //   },
  // //   {
  // //     provide: 'limit',
  // //     useValue: 2,
  // //   },

  // // ],
  // // For async useFactory.. like untill this not resolve the all the services will wait

  // //aysnc and sync Dependecies...
  // // providers: [
  // //   UserStore,
  // //   {
  // //     provide: 'DATABASE_CONNECTION',
  // //     useFactory: async (options) => {
  // //       const data = await connection(options);
  // //       return data;
  // //     },
  // //     inject: ['DB_OPTIONS'],
  // //   },
  // //   {
  // //     provide: 'DB_OPTIONS',
  // //     useValue: { url: '', user: '', password: '' },
  // //   },
  // //   {
  // //     provide: 'EVENT_STORE',
  // //     useFactory: (config: EnvConfig, limit: number = 4) => {
  // //       const eventBus =
  // //         config.envType === 'DEV'
  // //           ? new ReplaySubject(2)
  // //           : new BehaviorSubject(null);
  // //       console.log(limit);
  // //       return eventBus;
  // //     },
  // //     inject: [EnvConfig, { token: 'limit', optional: true }], //we can also make it optional
  // //   },
  // //   {
  // //     provide: 'limit',
  // //     useValue: 2, // Provide a value for 'limit'
  // //   },
  // //   EnvConfig, //NOTE :-> Register EnvConfig for injection because ITS A CLASS DIRECTLY pass to inject array..

  // // ],

  //perform crud operation video:15;
  // controllers: [user_dep],
  // providers: [Userservices],

  //sharedModule : You can use the modal in the another modal as well , also use all the exports of that module.
  //globleModule : We can use @Globle at perticular module, so we can access that module anywhere.
  //NestedModule : we can also made the nestedModule as well
  //DynamicModule: we can also create a dynamic module as per our requirement and also can change the providers,services as well,
  //for access that perticular dynamic modal or store we have to use .register , .forRoot, forFeature as well, for more details visit : https://youtu.be/WF3sGagdmgU?si=yIBPEpz8Rdyvw6G_
  imports: [
    userModule,
    jobs,
    cacheModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      cache: true,
      // expandVariables:true //we can use template litrals in the env file
      isGlobal: true, //we can specify the diffrent file name rather .env
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest_app_db'),
  ],
  providers: [{ provide: APP_FILTER, useClass: AppExceptionFilter }],

  //dynamic Route it will be add in the imports : basically it will be use as a prefix for all the controllers like express we do

  // const router = [
  //   {
  //       path: 'content',
  //       module: ContentTeamModule,
  //       children: [              //we can also pass the children as well ,if we not add that it will only apply to that controller only
  //           {
  //               path: 'packages',
  //               module: PackagesModule,
  //           },]}]
  // RouterModule.register([{path:"user", module:userModule},{path:"job", module:jobModule}])
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('App module run Successfully!');
  }

  //there are more methods like that!
  //if we want to logs of close if we do CTRL + C, then also we can get the logs of the methods that call after the close app..
  //app.enableShutdownHooks()
}

//onModuleInit()	:Called once the host module's dependencies have been resolved.
// onApplicationBootstrap(): 	Called once all modules have been initialized, but before listening for connections.
// onModuleDestroy()*	: Called after a termination signal (e.g., SIGTERM) has been received.
// beforeApplicationShutdown()* :	Called after all onModuleDestroy() handlers have completed (Promises resolved or rejected);
// once complete (Promises resolved or rejected), all existing connections will be closed (app.close() called).
// onApplicationShutdown()*	: Called after connections close (app.close() resolves).

//MOST IMP THINGS IN NEST.Js : MIDDLEWARE at module, GUARD,INTERCEPTOR,PIPE
