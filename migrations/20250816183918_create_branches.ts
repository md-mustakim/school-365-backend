import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('branches', (table) => {
    table.increments('id');
    table.string('name');
    table.string('address').nullable();
    table.string('email').nullable();
    table.string('phone').nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('branches');
}
