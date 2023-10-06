import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UnauthorizedException,
  Req,
  Put,
  Param,
  Delete,
  Query,
  ParamData,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { User } from './schemas/user-auth.schema';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { UserTrabajador } from './schemas/user-trabajador.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/avatars.helper';

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('register')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './src/assets/avatars',
        filename: renameImage,
      }),
      fileFilter,
    }),
  )
  async registerUser(
    @UploadedFile() profileImage: Express.Multer.File,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    try {
      return await this.userAuthService.registerTrabajador(
        request,
        profileImage,
      );
    } catch (error) {
      console.log('error:', error);
      throw new UnauthorizedException(
        'No tienes permiso para registrar nuevos usuarios.',
      );
    }
  }

  @Put('users/:id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id') userId: string,
    @Body() body: User,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    try {
      const currentUser = await this.userAuthService.getUserById(
        request.user.userId,
      );
      currentUser.roles.forEach((role) => {
        if (role !== 'superAdmin') {
          throw new UnauthorizedException(
            'No tienes permiso para editar usuarios.',
          );
        }
      });

      await this.userAuthService.updateUser(userId, body);
      return { message: 'Usuario actualizado con éxito.' };
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para editar usuarios.',
      );
    }
  }

  @Delete('users/:id')
  @UseGuards(AuthGuard)
  async deleteUser(
    @Param('id') userId: string,
    @Req() request: Request,
    @Query('userRole') userRole: string,
  ): Promise<{ message: string }> {
    try {
      const currentUser = await this.userAuthService.getUserById(
        request.user.userId,
      );
      currentUser.roles.forEach((role) => {
        if (role !== 'superAdmin') {
          throw new UnauthorizedException(
            'No tienes permiso para eliminar usuarios.',
          );
        }
      });
      await this.userAuthService.deleteUser(userId, userRole);
      return { message: 'Usuario eliminado con éxito.' };
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para eliminar usuarios.',
      );
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
      user.roles.forEach((role) => {
        if (role === 'superAdmin') {
          return this.userAuthService.getUsers();
        }
      });
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta ruta.',
      );
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta ruta.',
      );
    }
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  async getUser(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<User> {
    try {
      const user = await this.userAuthService.getUserById(request.user.userId);
      user.roles.forEach((role) => {
        if (role === 'superAdmin') {
          return this.userAuthService.getUserById(id);
        }
      });
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta ruta.',
      );
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta ruta.',
      );
    }
  }
}
