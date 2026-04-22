import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "./roles.guard";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class CompositeAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtAuthGuard: JwtAuthGuard,
        private rolesGuard: RolesGuard,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (isPublic) {
            return true;
        }
        
        const isAuthenticated = await this.jwtAuthGuard.canActivate(context);
        if (!isAuthenticated) {
            return false;
        }

        const isAuthorized = await this.rolesGuard.canActivate(context);
        if (!isAuthorized) {
            return false;
        }

        return true;
    }
}