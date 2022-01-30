import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController{
    handle(request: Request, response: Response): Response{
        const { file } = request;
       
        console.log("file:");
        console.log(file);
        
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        importCategoryUseCase.execute(file);

        return response.status(201).send();
    }
}

export { ImportCategoryController }