import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    private specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        this.specifications.push();
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (specification) => specification.name === name
        );
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) =>
            ids.includes(specification.id)
        );

        return allSpecifications;
    }
}

export { SpecificationRepositoryInMemory };
