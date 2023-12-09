const Products = [ ];
module.exports = class Product {
    constructor(title){
        this.title = title
    }
    save(){
        Products.push(this);
    }
    static fetchAll(){
        return Products
    }
}