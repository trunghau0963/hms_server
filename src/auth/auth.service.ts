import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtPayload } from "./jwt-payload";
import { JwtService } from "@nestjs/jwt";
import {
  LoginDtoByPhone,
  RegisterDto,
  RefreshTokenDto,
} from "./dtos/auth.dtos";
import { hash, compare } from "bcrypt";
import { PrismaService } from "src/prisma.service";
import { Role } from "./enum";
import { User } from "@prisma/client";
import { jwtConstants } from "./constants";
// import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    // private configService: ConfigService,
  ) {}

  async updateRefreshTokenInDb(data, refreshToken) {
    if (data.role === Role.Patient) {
      await this.prismaService.patient.update({
        where: {
          id: data.sub,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
    } else if (data.role === Role.Staff) {
      await this.prismaService.staff.update({
        where: {
          id: data.sub,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
    } else if (data.role === Role.Admin) {
      await this.prismaService.userAdmin.update({
        where: {
          id: data.sub,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
    } else if (data.role === Role.Dentist) {
      await this.prismaService.dentist.update({
        where: {
          id: data.sub,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
    }
  }

  async signIn(data: LoginDtoByPhone): Promise<any> {
    let user;

    if (data.role === Role.Patient) {
      user = await this.prismaService.patient.findUnique({
        where: {
          phoneNumber: data.phoneNumber,
        },
      });
    } else if (data.role === Role.Staff) {
      user = await this.prismaService.staff.findUnique({
        where: {
          phoneNumber: data.phoneNumber,
        },
      });
    } else if (data.role === Role.Admin) {
      user = await this.prismaService.userAdmin.findUnique({
        where: {
          phoneNumber: data.phoneNumber,
        },
      });
    } else if (data.role === Role.Dentist) {
      user = await this.prismaService.dentist.findUnique({
        where: {
          phoneNumber: data.phoneNumber,
        },
      });
    }

    if (!user) {
      console.log("user not found");
      throw new HttpException(
        { message: "Account is not exist." },
        HttpStatus.NOT_FOUND,
      );
    }

    const verify = await compare(data.password, user?.password);
    if (!verify) {
      throw new HttpException(
        { message: "Password is not correct." },
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      const payload: JwtPayload = {
        sub: user.id,
        username: user.userName,
        role: data.role,
      };
      const accessToken = await this.jwtService.signAsync(payload);

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.refresh,
        expiresIn: "7d",
      });

      await this.updateRefreshTokenInDb(payload, refreshToken);

      console.log("login success");
      return {
        ...user,
        accessToken,
        refreshToken,
      };
    }
  }

  async signUp(userData: RegisterDto): Promise<User> {
    let responeUser;

    const hashedPassword = await hash(userData.password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        id: Math.random().toString(36).substring(7), // Random ID
        userName: userData.userName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: hashedPassword,
        role: userData.role,
      },
    });

    if (createdUser.role === Role.Patient) {
      const user = await this.prismaService.patient.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber },
          ],
        },
      });
      if (user) {
        await this.prismaService.user.delete({
          where: {
            id: createdUser.id,
          },
        });
        throw new HttpException({ message: "Patient already exists" }, 400);
      } else {
        responeUser = await this.prismaService.patient
          .create({
            data: {
              id: createdUser.id,
              email: createdUser.email,
              phoneNumber: createdUser.phoneNumber,
              userName: createdUser.userName,
              password: createdUser.password,
              dob: null,
              userAddress: null,
              islock: false,
            },
          })
          .then(() => null);
      }
    } else if (createdUser.role === Role.Staff) {
      const user = await this.prismaService.staff.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber },
          ],
        },
      });
      if (user) {
        await this.prismaService.user.delete({
          where: {
            id: createdUser.id,
          },
        });
        throw new HttpException({ message: "Staff already exists" }, 400);
      } else {
        responeUser = await this.prismaService.staff
          .create({
            data: {
              id: createdUser.id,
              email: createdUser.email,
              phoneNumber: createdUser.phoneNumber,
              userName: createdUser.userName,
              password: createdUser.password,
              dob: null,
              userAddress: null,
              islock: false,
            },
          })
          .then(() => null);
      }
    } else if (createdUser.role === Role.Admin) {
      const user = await this.prismaService.userAdmin.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber },
          ],
        },
      });
      if (user) {
        await this.prismaService.user.delete({
          where: {
            id: createdUser.id,
          },
        });
        throw new HttpException({ message: "Admin already exists" }, 400);
      } else {
        responeUser = await this.prismaService.userAdmin
          .create({
            data: {
              id: createdUser.id,
              email: createdUser.email,
              phoneNumber: createdUser.phoneNumber,
              userName: createdUser.userName,
              password: createdUser.password,
              dob: null,
              userAddress: null,
            },
          })
          .then(() => null);
      }
    } else if (createdUser.role === Role.Dentist) {
      const user = await this.prismaService.dentist.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber },
          ],
        },
      });
      if (user) {
        await this.prismaService.user.delete({
          where: {
            id: createdUser.id,
          },
        });
        throw new HttpException({ message: "Dentist already exists" }, 400);
      } else {
        responeUser = await this.prismaService.dentist
          .create({
            data: {
              id: createdUser.id,
              email: createdUser.email,
              phoneNumber: createdUser.phoneNumber,
              userName: createdUser.userName,
              password: createdUser.password,
              dob: null,
              userAddress: null,
              islock: false,
            },
          })
          .then(() => null);
      }
    } else {
      throw new HttpException({ message: "Role is not exist" }, 400);
    }
    return responeUser;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    let user;
    if (payload.role === Role.Patient) {
      user = await this.prismaService.patient.findUnique({
        where: {
          id: payload.sub,
        },
      });
    } else if (payload.role === Role.Staff) {
      user = await this.prismaService.staff.findUnique({
        where: {
          id: payload.sub,
        },
      });
    } else if (payload.role === Role.Admin) {
      user = await this.prismaService.userAdmin.findUnique({
        where: {
          id: payload.sub,
        },
      });
    } else if (payload.role === Role.Dentist) {
      user = await this.prismaService.dentist.findUnique({
        where: {
          id: payload.sub,
        },
      });
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async refreshToken(data: RefreshTokenDto): Promise<any> {
    const role = data.role;
    console.log("role", role);
    console.log("refreshToken", data.refreshToken);

    let user;
    if (role === Role.Patient) {
      console.log("patient");
      user = await this.prismaService.patient.findFirstOrThrow({
        where: {
          refreshToken: data.refreshToken,
        },
      });
    } else if (role === Role.Staff) {
      console.log("staff");
      user = await this.prismaService.staff.findFirst({
        where: {
          refreshToken: data.refreshToken,
        },
      });
    } else if (role === Role.Admin) {
      console.log("admin");
      user = await this.prismaService.userAdmin.findFirst({
        where: {
          refreshToken: data.refreshToken,
        },
      });
    } else if (role === Role.Dentist) {
      console.log("dentist");
      user = await this.prismaService.dentist.findFirst({
        where: {
          refreshToken: data.refreshToken,
        },
      });
    }

    if (!user) {
      throw new HttpException(
        "Refresh token is not valid",
        HttpStatus.UNAUTHORIZED,
      );
    }

    // verify refresh token
    const verifyRefreshToken = await this.jwtService.verifyAsync(
      data.refreshToken,
      {
        secret: jwtConstants.refresh,
      },
    );
    if (!verifyRefreshToken) {
      throw new HttpException(
        "Refresh token is expired",
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.userName,
      role: role,
    };
    const newAccessToken = await this.jwtService.signAsync(payload);
    const newRefreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refresh,
      expiresIn: "7d",
    });

    await this.updateRefreshTokenInDb(verifyRefreshToken, newRefreshToken);

    return {
      ...user,
      newAccessToken,
      newRefreshToken,
    };
  }
}
