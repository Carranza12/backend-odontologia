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
        profileImage: user.profileImage,
        user_id: user._id
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }
  async getUsers(page:number, limit: number): Promise<any> {
    try {
      const totalUsers = await this.userModel.countDocuments();
      const totalPages = totalUsers === 0 ? 1 : Math.ceil(totalUsers / limit);
      console.log("limit:", limit)
      console.log("totalUsers:", totalUsers)
      console.log("totalPages:", totalPages)
      console.log("page:", page)
      if (page < 1 || page > totalPages) {
        throw new Error('Página no válida');
      }
      const users = await this.userModel.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
      return {
        items: users || [],
        currentPage: page,
        totalPages: Array.from({ length: totalPages }, (_, i) => (i + 1).toString()),
      }
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }

  async getMaestros(page:number, limit: number): Promise<any> {
    try {
      const totalUsers = await this.userModel.countDocuments({ role_default: 'maestro' });
      const totalPages = totalUsers === 0 ?  1 : Math.ceil(totalUsers / limit);
      console.log("limit:", limit)
      console.log("totalUsers:", totalUsers)
      console.log("totalPages:", totalPages)
      console.log("page:", page)
      if (page < 1 || page > totalPages) {
        throw new Error('Página no válida');
      }
      const users = await this.userModel.find({ role_default: 'maestro' })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return {
        items: users || [],
        currentPage: page,
        totalPages: Array.from({ length: totalPages }, (_, i) => (i + 1).toString()),
      }
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }


  async getEstudiantes(page:number, limit: number): Promise<any> {
    try {
      const totalUsers = await this.userModel.countDocuments({ role_default: 'estudiante' });
      const totalPages = totalUsers === 0 ? 1 : Math.ceil(totalUsers / limit);
      if (page < 1 || page > totalPages) {
        throw new Error('Página no válida');
      }
      const users = await this.userModel.find({ role_default: 'estudiante' })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return {
        items: users,
        currentPage: page,
        totalPages: Array.from({ length: totalPages }, (_, i) => (i + 1).toString()),
      }
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

  

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const respuesta = await this.userModel.findOne({ email }).exec();
      return respuesta
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
      console.log("body:", body)
      const { password } = body;

      const hash = await bcrypt.hash(password, 10);

      if (profileImage) {
        body.profileImage = `148.212.195.49:3000/avatars/${profileImage.filename}`;
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

      body.profileImage = `148.212.195.49:3000/avatars/${userId}_avatar.jpg`;

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
    
      let hash = "";
      const {  ...updatedUserData } = userData;
      if(!userData.password){
        delete userData.password
      }
      if(userData.password){
        console.log("si existe pass...")
        hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash
      }
     

      if (profileImage) {
        userData.profileImage = `148.212.195.49:3000/avatars/${profileImage.filename}`;
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
  
        userData.profileImage = `148.212.195.49:3000/avatars/${userId}_avatar.jpg`;
  
      }
      let item_to_udate = {
        ...userData,
        profileImage: userData.profileImage,
      }

    

      console.log("item_to_udate:", item_to_udate)
      await this.userModel.findByIdAndUpdate(userId, item_to_udate);

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
