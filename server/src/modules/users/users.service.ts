import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { IUser, ISavedUser, IUserOutput } from './users.interfaces';
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../../core/config/saltRounds.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(entity: IUser): Promise<IUserOutput> {
    const hashedPassword = await bcrypt.hash(entity.password, saltRounds);
    const response = await this.userModel.create({
      ...entity,
      password: hashedPassword,
    });

    const { password, ...user } = response.toJSON();

    return user as IUserOutput;
  }

  async getAuthUserByEmail(email: string): Promise<ISavedUser | null> {
    const response = await this.userModel.findOne({
      where: { email },
    });
    return response ? (response.toJSON() as ISavedUser) : null;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll({ attributes: { exclude: ['password'] } });
  }
}
