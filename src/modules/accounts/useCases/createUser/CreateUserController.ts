import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { User } from '../../entities/User';
import { CreateUserUsecase } from './CreateUserUseCase';

class CreateUserController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { name, password, email, driver_license } = request.body;

        const createUserUseCase = container.resolve(CreateUserUsecase);

        await createUserUseCase.execute({
            name,
            password,
            email,
            driver_license
        });

        return response.status(201).send();
    }

    return ;
}

export { CreateUserController }