import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { UsersService } from '../users/users.service';
import { IUser, IUserOutput } from '../users/users.interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('NATS_CLIENT') private readonly client: ClientProxy,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserOutput | null> {
    const user = await this.usersService.getAuthUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  getAuthToken(user: IUser): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async register(user: IUser) {
    return this.usersService.createUser(user);
  }

  sendLoginEvent(user: IUser) {
    this.client.emit('user.login', {
      userId: user.id,
      username: user.name,
      action: 'login',
      timestamp: new Date(),
    });
  }
}
