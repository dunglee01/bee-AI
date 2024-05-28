import { Injectable } from "@nestjs/common";
import { IUsersService } from "../interfaces/users-service.interface";
import { ConfigService } from "@nestjs/config";
import { UsersRepository } from "../repository/repositories/users.repository";
import { UsersDoc, UsersEntity } from "../repository/entities/users.entity";
import { IAuthPassword } from "src/common/auth/interfaces/auth.interface";
import { IDatabaseCreateOptions, IDatabaseExistOptions } from "src/common/database/interfaces/database.interface";
import { ENUM_USER_STATUS } from "src/modules/user/constants/user.enum.constant";
import { HelperDateService } from "src/common/helper/services/helper.date.service";

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly configService: ConfigService,
        private readonly helperDateService: HelperDateService,
    ) {
    }

    async create(
        {
            username,
            phone,
            email,
        },
        { passwordExpired, passwordHash, salt, passwordCreated }: IAuthPassword,
        options?: IDatabaseCreateOptions
    ): Promise<UsersDoc> {
        const create: UsersEntity = new UsersEntity();
        create.email = email;
        create.username = username;
        create.phone = phone;
        create.status = ENUM_USER_STATUS.ACTIVE;
        create.blocked = false;
        create.password = passwordHash;
        create.salt = salt;
        create.passwordExpired = passwordExpired;
        create.passwordCreated = passwordCreated;
        create.passwordAttempt = 0;
        create.createdAt= this.helperDateService.create()
        create.signUpDate = this.helperDateService.create()

        return this.usersRepository.create<UsersEntity>(create);
    }

    async existByMobileNumber(
        phone: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.usersRepository.exists(
            {
                phone,
            },
            { ...options, withDeleted: true }
        );
    }

 }