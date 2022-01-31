import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { ICreateUsersDTO, IUsersRepository } from "../IUsersRepository";


class UserRepository implements IUsersRepository{
    private repository: Repository<User>;
    
    constructor(){
        this.repository = getRepository(User);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email});

        return user;
    }

    async create({ name, password, email, driver_license}: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create({
            name, password, email, driver_license
        });

        await this.repository.save(user);
    }
}

export { UserRepository }