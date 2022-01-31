import { compare } from 'bcryptjs';
import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user)
            throw new Error("Email or password incorrect!");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch)
            throw new Error("Email or password incorrect!");

        const token = sign(
            {},
            "9d034b60ef45004868ae928e54486f28",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return{
            token,
            user:{
                name: user.name,
                email
            }
        } as IResponse
    }
}

export { AuthenticateUserUseCase }