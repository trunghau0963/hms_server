export class ResponseData<Type> {
    constructor(
        public data: Type | Type[],
        public status: number,
        public message: string,
    ) { 
        this.data = data;
        this.status = status;
        this.message = message;

        return this;
    }
}