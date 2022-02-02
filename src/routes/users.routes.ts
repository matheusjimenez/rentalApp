import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthentication } from '../middleware/ensureAuthentication';

const usersRoutes = Router();

const upladAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthentication,
    upladAvatar.single("avatar"), 
    updateUserAvatarController.handle
);

export { usersRoutes }