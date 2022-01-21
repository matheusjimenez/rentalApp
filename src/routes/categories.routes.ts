import { Router } from 'express';

import { createCategoryController, categoriesRepository } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response)=>{
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response)=>{
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.get("/findCategoryByName/:name", (request, response)=>{
    const { name } = request.params;
    const searchedCategory = categoriesRepository.findByName(name);

    return response.json({searchedCategory});
});

export { categoriesRoutes }