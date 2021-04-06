import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { nanoid } from 'nanoid';

@Entity()
export class User {
  @PrimaryKey()
  userId: string = nanoid(10);

  @Property()
  token = `${nanoid(64)}.${this.userId}`;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @Property()
  displayName: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.displayName = username;
    this.email = email;
    this.password = password;
  }
}
