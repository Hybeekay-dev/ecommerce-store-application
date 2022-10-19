import {AppDataSource} from "../utils/data-source";
import {Product} from "../entities/product.entity";

export class ProductRepository{

    async create(product: Product){
        return await AppDataSource.manager.save(product);
    }

    async getOneById(id: number){
        const productRepository = await AppDataSource.getRepository(Product);
        return productRepository.findOneBy({id});
    }

    async getOneByName(name: string){
        const productRepository = await AppDataSource.getRepository(Product);
        return productRepository.findOneBy({name});
    }

    async geAll(){
        const productRepository = await AppDataSource.getRepository(Product);
        return productRepository.find();
    }

}