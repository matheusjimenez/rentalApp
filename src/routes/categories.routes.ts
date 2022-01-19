import { Router } from 'express';

import { Category } from '../model/Category';

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response)=>{
    const { name, description } = request.body;

    return response.status(201).send();
});

export { categoriesRoutes }