import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { User } from './schemas/user-auth.schema';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { UserTrabajador } from './schemas/user-trabajador.schema';

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('register')
  @UseGuards(AuthGuard)
  async registerUser(@Body() body: User | UserTrabajador , @Req() request: Request): Promise<{ message: string }> {
    try {
      const currentUser = await this.userAuthService.getUserById(request.user.userId);
      if (currentUser.role !== 'superAdmin') {
        throw new UnauthorizedException('No tienes permiso para registrar nuevos usuarios.');
      }
      if(body.role === "trabajador"){
        return await this.userAuthService.registerTrabajador(body);
      }
      if(body.role === "superAdmin"){
        return await this.userAuthService.registerUser(body);
      }
    } catch (error) {
      throw new UnauthorizedException('No tienes permiso para registrar nuevos usuarios.');
    }
  }

  @Post('login')
  async loginUser(
    @Body() body: { email: string; password: string },
  ): Promise<{ message: string; token: string }> {
    const { email, password } = body;
    const respuesta = await this.userAuthService.loginUser(email, password);
    return { message: 'Login successful', ...respuesta };
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(@Req() request: Request): Promise<User[]> {
    try {
      const user = await this.userAuthService.getUserById(request.user.userId);
      if (user.role === 'superAdmin') {
        return this.userAuthService.getUsers();
      } else {
        throw new UnauthorizedException(
          'No tienes permiso para acceder a esta ruta.',
        );
      }
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta ruta.',
      );
    }
  }
}
