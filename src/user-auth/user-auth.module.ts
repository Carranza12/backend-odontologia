import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user-auth.schema';
import { secretKey } from './config'; 
import { UserTrabajador, UserTrabajadorSchema } from './schemas/user-trabajador.schema';
import { MulterModule } from '@nestjs/platform-express';
import { AuthGuard } from './auth.guard';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: UserTrabajador.name, schema: UserTrabajadorSchema },
    ]),
    JwtModule.register({
      secret: secretKey.secret,
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService]
})
export class UserAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   }
}