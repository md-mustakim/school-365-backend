import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { KNEX_CONNECTION } from './database/constants';
import { Knex } from 'knex';

@Controller()
export class AppController {
  constructor(

    private readonly appService: AppService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
