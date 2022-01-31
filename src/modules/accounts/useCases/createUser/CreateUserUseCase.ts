import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';

import { ICreateUsersDTO, IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUsecase{

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
        ) {}

    async execute({name, password, email, driver_license}: ICreateUsersDTO): Promise<void>{
        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if(userAlreadyExists)
            throw new Error("User already exists!");

        const passwordHash = await hash(password, 4)

        await this.userRepository.create({
            name, 
            password: passwordHash, 
            email, 
            driver_license
        });
    }
}

export { CreateUserUsecase }