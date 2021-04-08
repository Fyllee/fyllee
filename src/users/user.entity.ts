import {
 Collection,
 Entity,
 OneToMany,
 PrimaryKey,
 Property,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { nanoid } from 'nanoid';
import type { Application } from '../applications/application.entity';

@Entity()
export class User {
  @PrimaryKey()
  userId: string = nanoid(10);

  @Property()
  @Expose({ groups: ['TokenIncluded'] })
  token = `${nanoid(64)}.${this.userId}`;

  @Property()
  @Exclude()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @Exclude()
  updatedAt: Date = new Date();

  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property()
  @Exclude()
  password: string;

  @Property()
  displayName: string;

  @OneToMany('Application', 'owner')
  applications = new Collection<Application>(this);

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.displayName = username;
    this.email = email;
    this.password = password;
  }
}
