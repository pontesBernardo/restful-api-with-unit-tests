import type { User } from "../models/user.model";

export class UserRepository {
  private users: User[] = [];

  create(user: User) {
    this.users.push(user);
    return user;
  }

  findByEmail(email: string) {
    return this.users.find((u) => u.email === email);
  }

  getAll() {
    return this.users;
  }
}

export const userRepository = new UserRepository();
