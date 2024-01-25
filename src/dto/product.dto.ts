import { MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class ProductsDto {
    @MinLength(5, { message: 'Name is too short, must be greater than 5 character' })
    name?: string;
    @IsNumber({}, { message: 'Price must be number' })
    price?: number;
    @IsNotEmpty({ message: 'Category is required' })
    categoryId?: string;
}