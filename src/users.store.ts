import { Injectable } from "@nestjs/common";

interface User {
  name: string;
  age: number;
  id: number;
}

//here we made a store for made available for use as a dependencies, so here we need to add the Injactable()
// it will ready for the use as a dependecies 
// now we have to made the instance of this dependencies, in the app.module.ts and then nestjs register in the IOC container

@Injectable()
export class UserStore {
  private store = new Map<number, User>();

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
