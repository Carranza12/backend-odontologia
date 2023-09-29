import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user-auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserTrabajador } from './schemas/user-trabajador.schema';

@Injectable()
export class UserAuthService {
  private readonly logger = new Logger(UserAuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserTrabajador.name) private userTrabajadorModel: Model<UserTrabajador>,
    private jwtService: JwtService,
  ) {}

  async registerUser(userData: User): Promise<{ message: string }> {
    try {
      const { password } = userData;
      const hash = await bcrypt.hash(password, 10);
      await this.userModel.create({ ...userData, password: hash });
      return { message: 'Usuario registrado con exito!' };
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
  }
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
        full_name: user.name + " " + user.last_name,
        role: user.role,
        email: user.email
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
      const user = await this.userModel.findById(userId).exec();
      return user;
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
  async registerTrabajador(body: any) {
    try {
      const { password, email, name, last_name, role } = body;
      const hash = await bcrypt.hash(password, 10);
      const userModelResult = await this.userModel.create({ email, name, last_name, role, password: hash });
      const userId = userModelResult._id;
      await this.userTrabajadorModel.create({ ...body, password: hash, _id:userId });
      return { message: 'Trabajador registrado con exito!' };
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
  }
}
