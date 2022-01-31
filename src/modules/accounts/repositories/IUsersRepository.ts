import { ICreateUsersDTO } from "../../DTOs/ICreateUserDTO";

interface IUsersRepository{
    create(data: ICreateUsersDTO): Promise<void>
}

export { IUsersRepository, ICreateUsersDTO }