import { CanActivate, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const user = context.switchToHttp().getRequest().user;
        if (!user) {
            return false;
        }
        console.log(user);
        const hasRole = roles.some(role => user.user_type.includes(role));
        return hasRole;
    }
}