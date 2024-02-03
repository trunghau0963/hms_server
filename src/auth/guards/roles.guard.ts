import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { Role } from "../enum";
import { ROLES_KEY } from "src/roles.decoration";
import { IS_PUBLIC_KEY } from "src/public.decorator";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("RolesGuard");

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      console.log("isPublic");
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    console.log("requiredRoles", requiredRoles);
    // const { user } = context.switchToHttp().getRequest();
    // console.log("user in role guard", user);
    // console.log(
    //   "user",
    //   requiredRoles.some((role) => user.role?.includes(role)),
    // );
    // return requiredRoles.some((role) => user.role?.includes(role));
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      console.log("!token");
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.access,
      });
      console.log("payload", payload);
      console.log(
        "user",
        requiredRoles.some((role) => payload.role?.includes(role)),
      );
      request["user"] = payload;
      return requiredRoles.some((role) => payload.role?.includes(role));
    } catch {
      throw new UnauthorizedException();
    }
    // return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
