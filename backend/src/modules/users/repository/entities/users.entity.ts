import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { RoleEntity } from 'src/modules/role/repository/entities/role.entity';
import {
    ENUM_USER_STATUS,
} from 'src/modules/user/constants/user.enum.constant';

export const UserDatabaseName = 'users';

@DatabaseEntity({ collection: UserDatabaseName })
export class UsersEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 50,
    })
    username: string;

    @Prop({
        required: true,
        trim: true,
        sparse: true,
        unique: true,
        type: String,
        maxlength: 10,
        minlength: 10,
    })
    phone: string;

    @Prop({
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        type: String,
        maxlength: 100,
    })
    email: string;

    @Prop({
        required: false,
        ref: RoleEntity.name,
        index: true,
    })
    role?: string;

    @Prop({
        required: true,
        type: String,
        minlength: 8,
    })
    password: string;

    @Prop({
        required: true,
        type: Date,
    })
    passwordExpired: Date;

    @Prop({
        required: true,
        type: Date,
    })
    passwordCreated: Date;

    @Prop({
        required: true,
        default: 0,
        type: Number,
    })
    passwordAttempt: number;

    @Prop({
        required: true,
        type: Date,
    })
    signUpDate: Date;

    @Prop({
        required: true,
        type: String,
    })
    salt: string;

    @Prop({
        required: false,
        default: ENUM_USER_STATUS.ACTIVE,
        index: true,
        type: String,
        enum: ENUM_USER_STATUS,
    })
    status?: ENUM_USER_STATUS;

    @Prop({
        required: false,
        default: false,
        index: true,
        type: Boolean,
    })
    blocked?: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(UsersEntity);

export type UsersDoc = UsersEntity & Document;
