import { Injectable } from '@nestjs/common';

export interface User {
  name: string;
  age: number;
  id: number;
  location: { country: string; city: string };
}

@Injectable()
export class Userservices {
  constructor() {
    console.log('Called the services');
  }
  private store = new Map<number, User>();

  addUser(user: User) {
    console.log('addUser called with:', user);
    console.log('UserCreate Service called');
    return this.store.set(user.id, user);
  }

  getUser(id: number) {
    console.log('getUser called with:', id);
    return this.store.get(id);
  }
  getUsers() {
    return Array.from(this.store).map(([_, user]) => user);
  }
  updateUser(id: number, user: User) {
    this.store.set(id, user);
  }
  deleteUser(id: number) {
    this.store.delete(id);
  }
  testPipe() {
    console.log('Test ok');
  }
}
