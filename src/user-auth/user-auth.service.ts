import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user-auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserTrabajador } from './schemas/user-trabajador.schema';
import * as path from 'path';
import * as fs from 'fs';
import { createWriteStream } from 'fs';

@Injectable()
export class UserAuthService {
  private readonly logger = new Logger(UserAuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserTrabajador.name)
    private userTrabajadorModel: Model<UserTrabajador>,
    private jwtService: JwtService,
  ) { }


  async loginUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email });
      console.log('USUARIO ENCONTRADO:', user);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      const payload = { userId: user._id };
      const token = this.jwtService.sign(payload);
      console.log('token:', token);
      return {
        token,
        full_name: user.name + ' ' + user.last_name,
        roles: user.roles,
        role_default: user.role_default,
        email: user.email,
        profileImage: user.profileImage
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find({});
      return users;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }
  async getUserById(userId: string): Promise<User> {
    try {
      return await this.userModel.findById(userId).exec();
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async createNewUser(req,profileImage) {
    try {
      const { body } = req;
      const currentUser = await this.getUserById(
        req.user.userId,
      );

      if (currentUser.role_default !== 'superAdmin') {
        throw new UnauthorizedException(
          'No tienes permiso para registrar nuevos usuarios.',
        );
      }

      const { password } = body;

      const hash = await bcrypt.hash(password, 10);

      if (profileImage) {
        body.profileImage = `http://localhost:3000/avatars/${profileImage.filename}`;
      }

      const userModelResult = await this.userModel.create({
        ...body,
        password: hash,
        profileImage: body.profileImage,
      });

      const userId = userModelResult._id;
      const srcPath = path.join(__dirname, '../..','src', 'assets', 'avatars');
      
      const sourceFilePath = path.join(srcPath, profileImage.filename);
      const destFilePath = path.join(srcPath, `${userId}_avatar${path.extname(profileImage.filename)}`);
      
      fs.exists(sourceFilePath, (exists) => {
        if (exists) {
          fs.rename(sourceFilePath, destFilePath, (err) => {
            if (err) {
              console.error("Error al renombrar el archivo:", err);
            } else {
              console.log("Archivo renombrado con éxito.");
            }
          });
        } else {
          console.error("El archivo original no existe.");
        }
      });

      body.profileImage = `http://localhost:3000/avatars/${userId}_avatar.jpg`;

      await this.userModel.findByIdAndUpdate(userId, {
        ...body,
        password: hash,
        profileImage: body.profileImage,
      });
     
      return { message: 'Usuario registrado con exito!' };
    } catch (error) {
      console.log("error:", error)
      throw new Error('An error occurred while registering the user');
    }
  }

  async updateUser(
    userId: string,
    userData: User,
    profileImage
  ): Promise<any> {
    try {
      const existingUser = await this.userModel.findById(userId);

      if (!existingUser) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const { password, ...updatedUserData } = userData;
      const hash = await bcrypt.hash(password, 10);

      if (profileImage) {
        userData.profileImage = `http://localhost:3000/avatars/${profileImage.filename}`;
        const srcPath = path.join(__dirname, '../..','src', 'assets', 'avatars');
        const sourceFilePath = path.join(srcPath, profileImage.filename);
        const destFilePath = path.join(srcPath, `${userId}_avatar${path.extname(profileImage.filename)}`);
        
        fs.exists(sourceFilePath, (exists) => {
          if (exists) {
            fs.rename(sourceFilePath, destFilePath, (err) => {
              if (err) {
                console.error("Error al renombrar el archivo:", err);
              } else {
                console.log("Archivo renombrado con éxito.");
              }
            });
          } else {
            console.error("El archivo original no existe.");
          }
        });
  
        userData.profileImage = `http://localhost:3000/avatars/${userId}_avatar.jpg`;
  
      }

      await this.userModel.findByIdAndUpdate(userId, {
       ...userData,
        password: hash,
        profileImage: userData.profileImage,
      });

      return { message: 'Usuario actualizado con exito!' };
    } catch (error) {
      throw new Error('An error occurred while updating the user');
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const existingUser = await this.userModel.findById(userId);

      if (!existingUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      await this.userModel.findByIdAndRemove(userId);
    } catch (error) {
      throw new Error('An error occurred while deleting the user');
    }
  }
}
