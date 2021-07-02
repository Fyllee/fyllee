import {
 Collection,
 Entity,
 Index,
 OneToMany,
 PrimaryKey,
 Property,
 Unique,
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
  @Index()
  token = `${nanoid(64)}.${this.userId}`;

  @Property()
  @Exclude()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @Exclude()
  updatedAt: Date = new Date();

  @Property()
  @Unique()
  @Index()
  username: string;

  @Property()
  @Unique()
  @Index()
  email: string;

  @Property()
  @Exclude()
  password: string;

  @Property()
  displayName: string;

  @OneToMany('Application', 'owner')
  @Exclude()
  applications = new Collection<Application>(this);

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.displayName = username;
    this.email = email;
    this.password = password;
  }
}
