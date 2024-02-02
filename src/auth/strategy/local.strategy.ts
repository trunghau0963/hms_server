import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Role } from "../enum";
import { JwtPayload } from "../jwt-payload";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException("Credentials incorrect");
    }

    const userIsPatient = user.patient !== null;
    const userIsAdmin = user.admin !== null;
    const userIsDentist = user.dentist !== null;
    const userIsStaff = user.staff !== null;

    let userRole = Role.Guest;
    if (userIsPatient) userRole = Role.Patient;
    if (userIsAdmin) userRole = Role.Admin;
    if (userIsDentist) userRole = Role.Dentist;
    if (userIsStaff) userRole = Role.Staff;
    return {
      userId: user.id,
      username: user.username,
      roles: [userRole],
    };
  }
}
