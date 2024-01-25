// Purpose: Request and reponse handler for products module

import { Controller, Get, Post, Body, Put, Delete, Param, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ProductsModel } from "src/models/product.model";
import { ProductsDto } from "src/dto/product.dto";

@Controller('users')
export class ProductsController {

    constructor(private readonly userService: UsersService) { }

    // @Get()
    // getRoles(): ResponseData {

}