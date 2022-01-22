import { response, Router } from 'express';
import multer from 'multer';

import { createCategoryController, categoriesRepository } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
});

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

categoriesRoutes.post("/import", upload.single("file"), (request, response)=>{
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes }