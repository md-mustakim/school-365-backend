import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@Inject('KNEX_CONNECTION') private knex: Knex) {}

  async register({ name, email, phone, password }: any) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await this.knex('users')
      .insert({ name, email, phone, password: hashedPassword })
      .returning(['id', 'name', 'email', 'phone']);

    return user;
  }

  async login({ phone, password }: any) {
    const user = await this.knex('users').where({ phone }).first();
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = jwt.sign(
      { userId: user.id, phone: user.phone },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '7d' },
    );

    return { token };
  }

  async profile(userId: number) {
    return this.knex('users')
      .where({ id: userId })
      .select('id', 'name', 'email', 'phone')
      .first();
  }
}
