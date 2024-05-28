import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesUsersModule } from './routes/routers.users.module';

@Module({})
export class RouterModule {
    static forRoot(): DynamicModule {
        const imports: (
            | DynamicModule
            | Type<any>
            | Promise<DynamicModule>
            | ForwardReference<any>
        )[] = [];

        if (process.env.HTTP_ENABLE === 'true') {
            imports.push(
                RoutesUsersModule,
                NestJsRouterModule.register([
                    {
                        path: '/users',
                        module: RoutesUsersModule,
                    },
                ])
            );
        }

        return {
            module: RouterModule,
            providers: [],
            exports: [],
            controllers: [],
            imports,
        };
    }
}
