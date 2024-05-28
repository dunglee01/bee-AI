import { HttpStatus, applyDecorators } from "@nestjs/common";
import { DatabaseIdResponseDto } from "src/common/database/dtos/response/database.id.response.dto";
import { ENUM_DOC_REQUEST_BODY_TYPE } from "src/common/doc/constants/doc.enum.constant";
import { Doc, DocAuth, DocGuard, DocRequest, DocResponse } from "src/common/doc/decorators/doc.decorator";

export function UsersCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            summary: 'create a users',
        }),
        DocAuth({
            xApiKey: true,
            jwtAccessToken: true,
        }),
        DocRequest({
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse<DatabaseIdResponseDto>('users.create', {
            httpStatus: HttpStatus.CREATED,
            dto: DatabaseIdResponseDto,
        })
    );
}