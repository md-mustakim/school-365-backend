import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from './database/constants';
import { Knex } from 'knex';

@Injectable()
export class AppService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}
  async getHello() {
    const r = await this.knex.raw('SELECT 1+1 as result');
    console.log(r);
    return 'Hello World!';
  }
}
