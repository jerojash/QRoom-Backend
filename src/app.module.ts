import { Module } from '@nestjs/common';
import { UserModule } from './user/application/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
