import { Module } from "@nestjs/common";
import { UsersRepositoryModule } from "./repository/users.repository.module";
import { UsersService } from "./services/users.service";


@Module({
    imports: [UsersRepositoryModule],
    exports: [UsersService],
    providers: [UsersService],
    controllers: [],
})
export class UsersModule {}
