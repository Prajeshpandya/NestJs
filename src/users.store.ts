import { Injectable, Scope } from '@nestjs/common';

interface User {
  name: string;
  age: number;
  id: number;
}

//here we made a store for made available for use as a dependencies, so here we need to add the Injactable()
// it will ready for the use as a dependecies
// now we have to made the instance of this dependencies, in the app.module.ts and then nestjs register in the IOC container

@Injectable({ scope: Scope.REQUEST }) //here we can specify the dependency scope ,  instance create of this store at every gain req from the client.
// with the TRANSIENT it will create instance of the every module that use that perticular store!
export class UserStore {
  private store = new Map<number, User>();
  constructor() {
    console.log('User Store Init!');
  }
  
  addUser(user: User) {
    this.store.set(user.id, user);
  }

  getUser(id: number) {
    return this.store.get(id);
  }
  getUsers() {
    return Array.from(this.store).map((_, user) => user);
  }
  updateUser(id: number, user: User) {
    this.store.set(id, user);
  }
  deleteUser(id: number) {
    this.store.delete(id);
  }
}
