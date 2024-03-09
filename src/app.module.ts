import { Module } from '@nestjs/common';
import { UserModule } from './user/infrastructure/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/infrastructure/rol.module';
import { RoomModule } from './room/infrastructure/room.module';
import { CleaningTypeModule } from './cleaningType/cleaningType/infrastructure/cleaning-type.module';

@Module({
  imports: [UserModule, RolModule, RoomModule, CleaningTypeModule,
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
      synchronize: true
    }),
  ],
})
export class AppModule {}
