import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    // Create a new user
    return this.usersService.createUser(email, password, name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Req() req: Request, @Body() updateData: UpdateUserDto) {
    // At this point, req.user is recognized as "User" from express-user.d.ts
    // We can safely access user.id, user.email, etc.
    const userId = req.user!.id;

    // Pass typed "updateData" to the service
    return this.usersService.updateUser(userId, updateData);
  }
}
