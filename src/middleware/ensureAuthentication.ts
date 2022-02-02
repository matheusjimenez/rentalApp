import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload{
    sub: string;
}

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction){

    const authHeader = request.headers.authorization;

    if(!authHeader)
        throw new AppError("Token is missing", 401);

    const [, token] = authHeader.split(" ");

    try{
        const { sub: user_id } = verify(token, "9d034b60ef45004868ae928e54486f28") as IPayload;

        const usersRepository = new UserRepository();

        const user = await usersRepository.findById(user_id);

        if(!user)
            throw new AppError("User doesn't exist!", 401);

        request.user = {
            id: user_id
        };

        next();
    }catch(err){
        throw new AppError("Invalid token!", 401);
    }
}