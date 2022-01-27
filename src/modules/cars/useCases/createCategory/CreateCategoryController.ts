import { Request, Response} from 'express';
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController{

    handle(request: Request, response: Response): Response{
        const { name, description } = request.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
        
        createCategoryUseCase.execute({name, description});

        return response.status(201).send();
    }
}

export { CreateCategoryController }