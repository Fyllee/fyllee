declare namespace NodeJS {
  interface ProcessEnv {
    /* eslint @typescript-eslint/naming-convention: ["error", {
      selector: 'memberLike',
      format: ['UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    }] */
    MIKRO_ORM_HOST: string;
    MIKRO_ORM_PORT: number;
    MIKRO_ORM_PASSWORD: string;
    MIKRO_ORM_DB_NAME: string;

    POSTGRES_PASSWORD: string;

    PGADMIN_DEFAULT_EMAIL: string;
    PGADMIN_DEFAULT_PASSWORD: string;

    PORT: number;
    NODE_ENV: string;
  }
}
