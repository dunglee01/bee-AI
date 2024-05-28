import { IAuthPassword } from "src/common/auth/interfaces/auth.interface";
import { UsersDoc } from "../repository/entities/users.entity";

export interface IUsersService {
    create: ({
        username,
        phone,
        email},{ passwordExpired, passwordHash, salt, passwordCreated }: IAuthPassword) =>  Promise<UsersDoc>
}