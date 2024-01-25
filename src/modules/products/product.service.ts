import { Injectable, Body } from '@nestjs/common';
import { ProductsDto } from 'src/dto/product.dto';
import { ProductsModel } from 'src/models/product.model';

@Injectable()
export class ProductsService {

    private products: ProductsModel[] = [
        { id: '1', name: 'Product 1', price: 100, categoryId: "1" },
        { id: '2', name: 'Product 2', price: 200, categoryId: "2" },
        { id: '3', name: 'Product 3', price: 300, categoryId: "3" },
        { id: '4', name: 'Product 4', price: 400, categoryId: "4" },
        { id: '5', name: 'Product 5', price: 500, categoryId: "5" },
        { id: '6', name: 'Product 6', price: 600, categoryId: "6" },
        { id: '7', name: 'Product 7', price: 700, categoryId: "7" },
        { id: '8', name: 'Product 8', price: 800, categoryId: "8" },
        { id: '9', name: 'Product 9', price: 900, categoryId: "9" },
        { id: '10', name: 'Product 10', price: 1000, categoryId: "10" },
    ];

    getAllProducts(): ProductsModel[] {
        return this.products;
    }
    getDetailProduct(id: number): ProductsModel {
        return this.products.find(item => item.id === id.toString())
    }

    createProduct(body: ProductsDto): ProductsModel {
        const newProduct: ProductsModel = {
            id: (this.products.length + 1).toString(),
            ...body
        };
        this.products.push(newProduct);
        return newProduct;
    }

    updateProduct(id: number, body: ProductsDto): ProductsModel {
        const product = this.products.find(item => item.id === id.toString());
        product.name = body.name;
        product.price = body.price;
        product.categoryId = body.categoryId;
        return product;
    }

    deleteProduct(id: number): boolean {
        const index = this.products.findIndex(item => item.id === id.toString());
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }

}