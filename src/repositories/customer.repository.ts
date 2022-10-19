import {AppDataSource} from "../utils/data-source";
import {Customer} from "../entities/customer.entity";

/**
 * @summary Customer repository
 */
export class CustomerRepository{


    async create(customer: Customer){
        return await AppDataSource.manager.save(customer);
    }

    async getOneByEmail(email: string){
        const customerRepository = AppDataSource.getRepository(Customer)
        return await customerRepository.findOneBy({email});
    }

    async getOneById(id: number){
        const customerRepository = AppDataSource.getRepository(Customer)
        return await customerRepository.findOneBy({id});
    }


}