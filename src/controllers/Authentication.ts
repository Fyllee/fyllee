import type { NextFunction, Request, Response } from 'express';

type Strategy = (req: Request, res: Response, next: NextFunction) => Promise<void>;

class Authentication {
  private _strategies: Record<string, Strategy> = {};

  public use(name: string, strategy: Strategy): void {
    if (name in this._strategies)
      throw new Error(`${name} authentication strategy already exists.`);

    this._strategies[name] = strategy;
  }

  public unuse(name: string): void {
    if (!(name in this._strategies))
      throw new Error(`${name} authentication strategy doesn't exists.`);

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this._strategies[name];
  }

  public authenticate(name: string): Strategy {
    if (!(name in this._strategies))
      throw new Error(`${name} authentication strategy doesn't exists.`);

    return this._strategies[name];
  }
}

export default new Authentication();
