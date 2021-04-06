declare namespace NodeJS {
  interface ProcessEnv {
    /* eslint @typescript-eslint/naming-convention: ["error", {
      selector: 'memberLike',
      format: ['UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    }] */
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASS: string;
    POSTGRES_NAME: string;

    NODE_ENV: string;
  }
}
