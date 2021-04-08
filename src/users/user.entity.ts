import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { nanoid } from 'nanoid';

@Entity()
export class User {
  @PrimaryKey()
  userId: string = nanoid(10);

  @Property()
  @Expose({ groups: ['TokenIncluded'] })
  token = `${nanoid(64)}.${this.userId}`;

  @Property()
  @Exclude()
  createdAt: number = Date.now();

  @Property({ onUpdate: () => Date.now() })
  @Exclude()
  updatedAt: number = Date.now();

  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property()
  @Exclude()
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
