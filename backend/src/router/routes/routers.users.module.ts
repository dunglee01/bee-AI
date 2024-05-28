import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { SettingModule } from 'src/modules/setting/setting.module';
import { UsersController } from 'src/modules/users/controllers/users.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
    controllers: [UsersController],
    providers: [],
    exports: [],
    imports: [UsersModule, AuthModule, SettingModule],
})
export class RoutesUsersModule {}
