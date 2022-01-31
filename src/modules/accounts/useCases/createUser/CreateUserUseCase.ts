import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../repositories/implementations/UsersRepository";
import { ICreateUsersDTO } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUsecase{

    constructor(
        @inject("UsersRepository")
        private userRepository: UserRepository
        ) {}

    async execute({name, password, email, driver_license}: ICreateUsersDTO): Promise<void>{
        await this.userRepository.create({
            name, password, email, driver_license
        });
    }
}

export { CreateUserUsecase }