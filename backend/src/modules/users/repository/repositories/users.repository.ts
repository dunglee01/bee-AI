import { Injectable } from "@nestjs/common";
import { DatabaseMongoUUIDRepositoryAbstract } from "src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract";
import { UsersDoc, UsersEntity } from "../entities/users.entity";
import { DatabaseModel } from "src/common/database/decorators/database.decorator";
import { Model } from "mongoose";


@Injectable()
export class UsersRepository extends DatabaseMongoUUIDRepositoryAbstract<
    UsersEntity,
    UsersDoc
> {
    constructor(
        @DatabaseModel(UsersEntity.name)
        private readonly usersModel: Model<UsersEntity>
    ) {
        super(usersModel);
    }
}
