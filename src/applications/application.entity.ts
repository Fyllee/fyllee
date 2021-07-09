import {
  Cascade,
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Exclude, Expose, Transform } from 'class-transformer';
import { nanoid } from 'nanoid';
import type { Content } from '../contents/content.entity';
import { TOKEN_INCLUDED } from '../global/constants';
import { User } from '../users/user.entity';

@Entity()
@Unique({ properties: ['name', 'owner'] })
export class Application {
  @PrimaryKey()
  applicationId: string = nanoid(10);

  @Property()
  @Expose({ groups: [TOKEN_INCLUDED] })
  @Index()
  token = `${nanoid(64)}.${this.applicationId}`;

  @Property()
  @Transform(({ value }: { value: Date }) => new Date(value).getTime())
  @Exclude()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @Transform(({ value }: { value: Date }) => new Date(value).getTime())
  @Exclude()
  updatedAt: Date = new Date();

  @Property()
  name!: string;

  @Property()
  displayName: string;

  @Property()
  website: string;

  @Property()
  description: string;

  @ManyToOne()
  @Transform(({ value }) => value.userId)
  owner!: User;

  @OneToMany('Content', 'application', { cascade: [Cascade.REMOVE] })
  @Exclude()
  contents = new Collection<Content>(this);

  constructor(owner: User, name: string, website = '', description = '') {
    this.owner = owner;
    this.name = name;
    this.displayName = name;
    this.website = website;
    this.description = description;
  }
}
