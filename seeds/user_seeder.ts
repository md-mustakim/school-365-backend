import { Knex } from 'knex';
import { hashPassword } from '../src/lib/helper';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      name: 'Super Admin',
      email: 'super@gmail.com',
      phone: '01234567890',
      password: await hashPassword('01234567890'),
    },
  ]);

  await knex('branches').del();

  // Inserts seed entries
  await knex('branches').insert([
    {
      name: 'Campus 1',
    },
    {
      name: 'Campus 2',
    },
    {
      name: 'English Version',
    },
  ]);
}
