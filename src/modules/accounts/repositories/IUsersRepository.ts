import { ICreateUsersDTO } from "../../DTOs/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository{
    create(data: ICreateUsersDTO): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
}

export { IUsersRepository, ICreateUsersDTO }