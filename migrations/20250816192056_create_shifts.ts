import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('shifts', (table) => {
    table.increments('id');
    table.bigInteger('branch_id');
    table.string('name');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('shifts');
}
