import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AlbumController } from './controllers/albums.controller';
import { Crud } from './controllers/crud.controller';
import { user_dep } from './controllers/user_dep.controller';
import { test } from './controllers/test.controller';
import { Userservices } from './services/users.services';
import { UserStore } from 'src/users.store';
import {
  userAgent,
  UserAgentMiddleware,
  UserAgentOptions,
} from 'src/middlewares/user_agent.middleware';

@Global() //globle module that can use anywhere now
@Module({
  imports: [],
  controllers: [UsersController, AlbumController, Crud, user_dep, test],
  providers: [
    Userservices,
    UserStore,
    // {
    //   provide: UserAgentOptions,
    //   useValue: { accepted: ['chrome', 'firefox', 'postman'] },
    // },
  ],
  exports: [Userservices, UserStore],
})
export class userModule {}

// export class userModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(UserAgentMiddleware).forRoutes('/users');
//     //we also specify wildcard like "/us*rs" , also "users/refs?" means refs is optional here
//     // {path:"users", method:RequestMethod.POST}
//     // after .apply , we can also specify the .exclude, so in that excludes we can specify the route for excluding perticular route.
//   }
// }
