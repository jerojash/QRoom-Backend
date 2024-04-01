import { Module, forwardRef } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { createUserService } from 'src/user/application/createUserService';
import { UserModule } from 'src/user/infrastructure/user.module';
import { userMotherObject } from './motherObject/userMotherObject';
import { mockUser } from './mocks/mockUser';

@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
    ], // Import modules here
    providers: [
        createUserService, userMotherObject, mockUser],
    exports: [userMotherObject],
})
export class TestModule { }