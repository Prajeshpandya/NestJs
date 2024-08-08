import { Global, Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { AlbumController } from "./controllers/albums.controller";
import { Crud } from "./controllers/crud.controller";
import { user_dep } from "./controllers/user_dep.controller";
import { test } from "./controllers/test.controller";
import { Userservices } from "./services/users.services";
import { UserStore } from "src/users.store";

@Global() //globle module that can use anywhere now
@Module({
    imports:[],
    controllers:[UsersController,AlbumController,Crud,user_dep,test],
    providers: [Userservices,UserStore],
    exports:[Userservices,UserStore]

})
export class userModule {}