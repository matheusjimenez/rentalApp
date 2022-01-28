import { Specification } from "../entities/Specification";

interface ISpecificationDTO{
    name: string;
    description: string;
}

interface ISpecificationRepository{
    create( { name, description } : ISpecificationDTO): Promise<void>;
    findByName(name: string) : Promise<Specification>;
}

export { ISpecificationRepository, ISpecificationDTO }