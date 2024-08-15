import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface User {
  name: string;
  age: number;
  id: number;
  location: { country: string; city: string };
}

@Injectable()
export class Userservices {
  constructor(private configService: ConfigService) {
    console.log('env', configService.get('secret_key'));
    console.log('Called the services');
  }
  private store = new Map<number, User>();
  private recentSearchMap = new Map<string, User[]>();

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

  recentSearch(params: string, user: User) {
    if (!this.recentSearchMap.has(params)) {
      this.recentSearchMap.set(params, []); // Initialize array if it doesn't exist
    }
    const users = this.recentSearchMap.get(params);
    if (users) {
      users.push(user); // Add the user to the array
    }
  }

  getRecentSearch() {
    return Array.from(this.recentSearchMap.entries()).map(([key, users]) => ({
      key,
      users,
    }));
  }
}
