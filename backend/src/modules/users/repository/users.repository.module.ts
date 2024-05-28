import { Module } from "@nestjs/common";
import { UsersRepository } from "./repositories/users.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersEntity, UsersSchema } from "./entities/users.entity";
import { DATABASE_CONNECTION_NAME } from "src/common/database/constants/database.constant";


@Module({
    providers: [UsersRepository],
    exports: [UsersRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: UsersEntity.name,
                    schema: UsersSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class UsersRepositoryModule {}
