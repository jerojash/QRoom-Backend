import { Global, Module } from '@nestjs/common';
import { adapterUserRepository } from './user.adapter';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { createUserService } from '../application/createUserService';
import { getUserService } from '../application/getUserService';
import { RolEntity } from 'src/rol/infrastructure/entities/rol.entity';
import { authService } from '../application/authService';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { sendEmailPasswordRecoveryService } from '../application/sendEmailPasswordRecoveryService';
import { updateUserPasswordService } from '../application/updateUserPasswordService';

@Global()
@Module({
  controllers: [UserController],
  providers: [
    adapterUserRepository,
    createUserService,
    getUserService,
    authService,
    sendEmailPasswordRecoveryService,
    updateUserPasswordService
  ],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RolEntity]),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class UserModule {}
