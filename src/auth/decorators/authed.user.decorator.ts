import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const AuthedUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    console.log(user);
    return user;
}) 