import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { createUserService } from 'src/user/application/createUserService';
import { UserModule } from 'src/user/infrastructure/user.module';
import { userMotherObject } from './motherObject/userMotherObject';

@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
    ], // Import modules here
    providers: [
        createUserService],
    exports: [userMotherObject],
})
export class TestModule { }