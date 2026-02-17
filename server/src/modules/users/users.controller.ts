import { Inject, Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './users.interfaces';
import { JwtGuard } from 'src/core/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(@Inject() private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get()
  async list() {
    return this.usersService.findAllUsers();
  }
}
