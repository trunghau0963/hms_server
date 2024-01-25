// Purpose: Request and reponse handler for products module

import { Controller, Get, Post, Body, Put, Delete, Param, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./product.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ProductsModel } from "src/models/product.model";
import { ProductsDto } from "src/dto/product.dto";

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @Get()
    getAllProducts(): ResponseData<ProductsModel[]> {
        try {
            return new ResponseData<ProductsModel[]>(this.productService.getAllProducts(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        }
        catch (err) {
            return new ResponseData<ProductsModel[]>(null, HttpStatus.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }
    }
    @Get('/:id')
    getDetailProduct(@Param('id') id: number): ResponseData<ProductsModel> {
        try {
            return new ResponseData<ProductsModel>(this.productService.getDetailProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (err) {
            return new ResponseData<ProductsModel>(null, HttpStatus.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }
    }

    @Post()
    createProduct(@Body(new ValidationPipe) body: ProductsDto): ResponseData<ProductsModel> {
        console.log(body);
        try {
            return new ResponseData<ProductsModel>(this.productService.createProduct(body), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (err) {
            return new ResponseData<ProductsModel>(null, HttpStatus.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }
    }

    @Put('/:id')
    updateProduct(@Param('id') id: number, @Body(new ValidationPipe) body: ProductsDto): ResponseData<ProductsModel> {
        try {
            return new ResponseData<ProductsModel>(this.productService.updateProduct(id, body), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (err) {
            return new ResponseData<ProductsModel>(null, HttpStatus.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }
    }

    @Delete('/:id')
    deleteProduct(@Param('id') id: number): ResponseData<boolean> {
        try {
            return new ResponseData<boolean>(this.productService.deleteProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (err) {
            return new ResponseData<boolean>(null, HttpStatus.BAD_REQUEST, HttpMessage.BAD_REQUEST);
        }
    }
}