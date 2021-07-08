import type { Readable } from 'stream';
import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import type { Express } from 'express';
import mimeType from '../mime-type';
import { fileFilter, notUndef, validateNumber } from '../utils';

describe('Util: file-filter', () => {
  test('GIVEN fileFilter THEN it is a function', () => {
    expect(fileFilter).toBeDefined();
    expect(typeof fileFilter).toBe('function');
  });

  const request = createMock<Request>();
  const baseFile: Omit<Express.Multer.File, 'mimetype' | 'originalname'> = {
    buffer: createMock<Buffer>(),
    destination: './uploads',
    encoding: 'utf-8',
    fieldname: 'file',
    filename: 'myimage',
    path: 'path/',
    size: 50_000_000,
    stream: createMock<Readable>(),
  };

  test('GIVEN valid files THEN returns true', () => {
    for (const [mimetype, [ext]] of Object.entries(mimeType.extensions)) {
      const file = { ...baseFile, originalname: `file.${ext}`, mimetype };
      fileFilter(request, file, (error: Error, acceptFile: boolean) => {
        expect(error).toBeNull();
        expect(acceptFile).toBe(true);
      });
    }
  });

  test('GIVEN invalid files THEN throws exception', () => {
    const invalidTypes = [
      ['application/java-archive', 'jar'],
      ['application/octet-stream', 'exe'],
      ['application/andrew-inset', 'ez'],
      ['application/applixware', 'aw'],
    ];

    for (const [mimetype, ext] of invalidTypes) {
      const file = { ...baseFile, originalname: `file.${ext}`, mimetype };
      fileFilter(request, file, (error: Error, acceptFile: boolean) => {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid file type');
        expect(acceptFile).toBe(false);
      });
    }
  });
});

describe('Util: not-undefined', () => {
  test('GIVEN notUndef THEN it is a function', () => {
    expect(notUndef).toBeDefined();
    expect(typeof notUndef).toBe('function');
  });

  test('GIVEN undefined values THEN returns false', () => {
    // eslint-disable-next-line no-undefined, unicorn/no-useless-undefined
    expect(notUndef(undefined)).toBe(false);
    expect(notUndef(void 0)).toBe(false);
  });

  test('GIVEN defined values THEN returns true', () => {
    expect(notUndef(true)).toBe(true);
    expect(notUndef(false)).toBe(true);
    expect(notUndef(null)).toBe(true);
    expect(notUndef('')).toBe(true);
    expect(notUndef(0)).toBe(true);
    expect(notUndef('hello')).toBe(true);
  });
});

describe('Util: validate-number', () => {
  test('GIVEN validateNumber THEN it is a function', () => {
    expect(validateNumber).toBeDefined();
    expect(typeof validateNumber).toBe('function');
  });

  test('GIVEN NaN THEN returns false', () => {
    // eslint-disable-next-line unicorn/prefer-number-properties
    expect(validateNumber(NaN)).toBe(false);
    expect(validateNumber(Number.NaN)).toBe(false);
    expect(validateNumber(3 / 0)).toBe(false);
  });

  test('GIVEN numbers THEN returns true', () => {
    expect(validateNumber(0)).toBe(true);
    expect(validateNumber(50)).toBe(true);
    expect(validateNumber(100)).toBe(true);
  });

  test('GIVEN out of range number THEN returns false', () => {
    expect(validateNumber(-1)).toBe(false);
    expect(validateNumber(101)).toBe(false);
    expect(validateNumber(3, 4, 5)).toBe(false);
    expect(validateNumber(-1, -2, -3)).toBe(false);
  });
});
