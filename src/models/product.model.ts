export class ProductsModel {
    constructor(
        public id?: string,
        public name?: string,
        public price?: number,
        public categoryId?: string,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;

        return this;
    }
}