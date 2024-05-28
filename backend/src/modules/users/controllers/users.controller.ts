import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ClientSession, Connection } from "mongoose";
import { DatabaseConnection } from "src/common/database/decorators/database.decorator";
import { UsersService } from "../services/users.service";
import { UsersCreateDoc } from "../docs/users.docs";
import { ENUM_USER_STATUS_CODE_ERROR } from "src/modules/user/constants/user.status-code.constant";
import { IAuthPassword } from "src/common/auth/interfaces/auth.interface";
import { AuthService } from "src/common/auth/services/auth.service";
import { ENUM_APP_STATUS_CODE_ERROR } from "src/app/constants/app.status-code.constant";

@ApiTags('modules.users')
@Controller({
    version: '1',
})
export class UsersController {
    constructor(
        @DatabaseConnection() private readonly databaseConnection: Connection,
        private readonly usersService: UsersService,
        private readonly authService: AuthService,

    ) {}

    @UsersCreateDoc()
    @Post('/create')
        async create(
            @Body()
            {
                username,
                phone,
                email,
                password: passwordString,
            }
        ) {

            if(!username || !phone || !email|| !passwordString) {
                throw new BadRequestException({
                    statusCode:
                        ENUM_USER_STATUS_CODE_ERROR.REGISTER_ERROR,
                    message: 'user.error.register',
                });
            }

              const isExitedPhone =  await this.usersService.existByMobileNumber(phone)

              if(isExitedPhone) {
                throw new BadRequestException({
                    statusCode:
                        ENUM_USER_STATUS_CODE_ERROR.MOBILE_NUMBER_EXIST_ERROR,
                    message: 'user.error.MOBILE_NUMBER_EXIST_ERROR',
                });
              }

            const password: IAuthPassword =
            await this.authService.createPassword(passwordString);

            try {
                const created = await this.usersService.create(
                    {
                        username,
                        phone,
                        email,
                    },
                    password,
                );
    
                return {
                    data: { _id: created._id },
                };
            } catch (err: any) {

                console.log(err)
    
                throw new InternalServerErrorException({
                    statusCode: ENUM_APP_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                    message: 'http.serverError.internalServerError',
                    _error: err.message,
                });
            }
        }
}