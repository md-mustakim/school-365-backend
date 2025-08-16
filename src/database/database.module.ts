import { Global, Module } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import config from '../../knexfile';
import knex, { Knex } from 'knex';
import { KNEX_CONNECTION } from './constants';

dotenvConfig();

const db: Knex = knex(config.development);

@Global()
@Module({
  providers: [
    {
      provide: KNEX_CONNECTION,
      useValue: db,
    },
  ],
  exports: [KNEX_CONNECTION],
})
export class DatabaseModule {}
