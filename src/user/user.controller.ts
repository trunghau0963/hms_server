import { UserService } from "./user.service";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Dentist, Patient, Schedule, Staff } from "@prisma/client";
import { ChangeStatus } from "./dtos/user.dtos";
import { NormalUserEntity } from "./entities/user.entity";
import { Public } from "src/public.decorator";
import { ACGuard, UseRoles } from "nest-access-control";
import { Role } from "src/auth/enum";
import { Roles } from "src/roles.decorator";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  @Roles(Role.Admin)
  @Public()
  @Get("patient")
  @ApiOperation({ summary: "Get all patient" })
  @ApiResponse({
    status: 200,
    description: "Get patient",
    type: NormalUserEntity,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(HttpStatus.OK)
  async getAllPatient(@Req() req: any): Promise<Patient[]> {
    return this.userService.getAllPatient();
  }

  @Public()
  @Get("patient/all-name")
  @ApiOperation({ summary: "Get all name patient" })
  @ApiResponse({
    status: 200,
    description: "Get all name patient",
    type: String,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(HttpStatus.OK)
  async getNameAllPatient(@Req() req: any): Promise<string[]> {
    return this.userService.getNameAllPatient();
  }

  @Public()
  @Get("patient/:id")
  @ApiParam({ name: "id", required: true, type: String, example: "1e41m4" })
  @ApiOperation({ summary: "Get patient by id" })
  @ApiResponse({
    status: 200,
    description: "Get patient by id",
    type: NormalUserEntity,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(HttpStatus.OK)
  async getPatientById(@Req() req: any): Promise<Patient> {
    return this.userService.getPatientById(req.params.id);
  }

  @Public()
  @Get("dentist")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get dentist" })
  @ApiResponse({
    status: 200,
    description: "Get dentist",
    type: NormalUserEntity,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  async getAllDentist(@Req() req: any): Promise<Dentist[]> {
    return this.userService.getAllDentist();
  }

  @Public()
  @Get("dentist/:id")
  @ApiOperation({ summary: "Get all dentist" })
  @ApiParam({ name: "id", required: true, type: String, example: "32zzbq" })
  @ApiResponse({
    status: 200,
    description: "Get dentist",
    type: NormalUserEntity,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(HttpStatus.OK)
  async getDentistById(@Req() req: any): Promise<Dentist> {
    console.log("dentist controller");
    return this.userService.getDentistById(req.params.id);
  }

  @Public()
  @Get("staff")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get staff" })
  @ApiResponse({
    status: 200,
    description: "Get staff",
    type: NormalUserEntity,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  async getAllStaff(@Req() req: any): Promise<Staff[]> {
    return this.userService.getAllStaff();
  }

  @Public()
  @Get("staff/:id")
  @ApiOperation({ summary: "Get all staff" })
  @ApiParam({ name: "id", required: true, type: String, example: "4wyppm" })
  @ApiResponse({
    status: 200,
    description: "Get staff",
    type: NormalUserEntity,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(HttpStatus.OK)
  async getStaffById(@Req() req: any): Promise<Staff> {
    return this.userService.getStaffById(req.params.id);
  }

  @Public()
  @Put("changestatus/:id")
  @ApiParam({ name: "id", required: true, type: String, example: "1e41m4" })
  @ApiBody({ type: ChangeStatus })
  @ApiOperation({ summary: "Change status user" })
  @ApiResponse({
    status: 200,
    description: "Change status user",
    type: NormalUserEntity,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  async changStatusUser(
    @Req() req: any,
    @Body() data: ChangeStatus,
  ): Promise<any> {
    console.log(req.params.id);
    return this.userService.changStatusUser(req.params.id, data);
  }
}
