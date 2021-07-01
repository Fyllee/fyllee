import path from 'path';
import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Exclude, Expose, Transform } from 'class-transformer';
import { nanoid } from 'nanoid';
import { Application } from '../applications/application.entity';
import mime from '../global/mime-type';
import type { ContentInformation } from '../global/types/content-information.interface';

@Entity()
export class Content {
  @PrimaryKey()
  contentId: string = nanoid(10);

  @Property()
  @Expose({ groups: ['TokenIncluded'] })
  token = `${nanoid(64)}.${this.contentId}`;

  @Property()
  @Transform(({ value }: { value: Date }) => new Date(value).getTime())
  @Exclude()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @Transform(({ value }: { value: Date }) => new Date(value).getTime())
  @Exclude()
  updatedAt: Date = new Date();

  @Property()
  originalName!: string;

  @Property()
  savedName!: string;

  @Property()
  mimeType!: string;

  @Property()
  size!: number;

  @ManyToOne()
  @Transform(({ value }) => value.applicationId)
  application!: Application;

  constructor(application: Application, name: string, size: number) {
    this.application = application;
    this.originalName = name;
    this.size = size;

    const extension = path.extname(name).replace('.', '');
    this.savedName = `${this.contentId}.${extension}`;

    const mimeType = mime.contentType(extension);
    this.mimeType = typeof mimeType === 'string' ? mimeType : 'unknown';
  }

  public toJSON(): ContentInformation {
    return {
      creation: new Date(this.createdAt).getTime(),
      application: this.application.applicationId,
      contentId: this.contentId,
      mimeType: this.mimeType,
      originalName: this.originalName,
      savedName: this.savedName,
      size: this.size,
    };
  }
}
