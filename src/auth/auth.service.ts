import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { loginDtoByPhone, registerDto } from './dtos/auth.dtos';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) { }

  async signIn(data: loginDtoByPhone): Promise<any> {
    let user, verify;
    if (data.role === 'Patient') {
      user = await this.prismaService.patient.findUnique({
        where: {
          phoneNumber: data.phoneNumber
        }
      });
    } else if (data.role === 'Staff') {
      user = await this.prismaService.staff.findUnique({
        where: {
          phoneNumber: data.phoneNumber
        }
      });
    } else if (data.role === 'Admin') {
      user = await this.prismaService.userAdmin.findUnique({
        where: {
          phoneNumber: data.phoneNumber
        }
      });
    } else if (data.role === 'Dentist') {
      user = await this.prismaService.dentist.findUnique({
        where: {
          phoneNumber: data.phoneNumber
        }
      });
    }

    if (!user) {
      console.log('user not found')
      throw new HttpException({ message: "Account is not exist." }, HttpStatus.UNAUTHORIZED)
    }
    else {
      verify = await compare(data.password, user.password)

      if (!verify) {
        throw new HttpException({ message: "Password doese not correct." }, HttpStatus.UNAUTHORIZED)
      }
      else {
        const payload: JwtPayload = {
          sub: user.id, username: user.userName, role: data.role
        };
        const accessToken = await this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: '1h'
        })

        const refreshToken = await this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: '7d'
        })

        if (data.role === 'Patient') {
          user = await this.prismaService.patient.update({
            where: {
              phoneNumber: data.phoneNumber
            },
            data: {
              refreshToken: refreshToken
            }
          });
        } else if (data.role === 'Staff') {
          user = await this.prismaService.staff.update({
            where: {
              phoneNumber: data.phoneNumber
            },
            data: {
              refreshToken: refreshToken
            }
          });
        } else if (data.role === 'Admin') {
          user = await this.prismaService.userAdmin.update({
            where: {
              phoneNumber: data.phoneNumber
            },
            data: {
              refreshToken: refreshToken
            }
          });
        } else if (data.role === 'Dentist') {
          user = await this.prismaService.dentist.update({
            where: {
              phoneNumber: data.phoneNumber
            },
            data: {
              refreshToken: refreshToken
            }
          });
        }

        console.log('login success')
        return {
          ...user,
          accessToken,
          refreshToken
        };
      }
    }
  }


  async signUp(userData: registerDto): Promise<User> {
    const hashedPassword = await hash(userData.password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        id: Math.random().toString(36).substring(7), // Random ID
        userName: userData.userName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: hashedPassword,
        role: userData.role,
      }
    })

    if (createdUser.role === 'Patient') {
      const user = await this.prismaService.patient.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber }
          ]
        }
      })
      console.log('user', user)
      if (user) {
        const deleteUser = await this.prismaService.user.delete({
          where: {
            id: createdUser.id
          }
        });
        throw new HttpException({ message: 'Patient already exists' }, 409);
      }
      else {
        return this.prismaService.patient
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
          .then(() => null)
      }
    } else if (createdUser.role === 'Staff') {
      const user = await this.prismaService.staff.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber }
          ]
        }
      })
      if (user) {
        await this.prismaService.user.delete({
          where: {
            id: createdUser.id
          }
        })
        throw new HttpException({ message: 'Staff already exists' }, 409);
      }
      else {
        return this.prismaService.staff
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
          .then(() => null)
      }
    } else if (createdUser.role === 'Admin') {
      const user = await this.prismaService.userAdmin.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber }
          ]
        }
      })
      if (user) {
        await this.prismaService.user.delete({
          where: {
            id: createdUser.id
          }
        })
        throw new HttpException({ message: 'Admin already exists' }, 409);
      }
      else {
        return this.prismaService.userAdmin
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
          .then(() => null)
      }
    } else if (createdUser.role === 'Dentist') {
      const user = await this.prismaService.dentist.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber }
          ]
        }
      })
      if (user) {
        await this.prismaService.user.delete({
          where: {
            id: createdUser.id
          }
        })
        throw new HttpException({ message: 'Dentist already exists' }, 409);
      }
      else {
        return this.prismaService.dentist
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
          .then(() => null)
      }
    } else {
      throw new Error('Invalid role');
    }
  }

  async getRole(Token: string): Promise<string> {
    console.log('getRole')
    console.log(typeof Token, Token)
    try {
      if (!Token || typeof Token !== 'string') {
        throw new UnauthorizedException();
      }
      else {
        console.log('Token', Token)
        const data = await this.jwtService.verify(Token, { secret: process.env.REFRESH_TOKEN_KEY });
        console.log('data', data.role)
        return data.role;
      }
    } catch (error) {
      console.log('error', error)
      throw new UnauthorizedException();
    }
  }

  async logout(user: any) {
    console.log('logout')
    const payload = { sub: user.id, username: user.userName };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: '1h'
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: '7d'
    })

    return {
      ...user,
      accessToken,
      refreshToken
    };
  }
}