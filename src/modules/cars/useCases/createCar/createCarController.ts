import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            brand,
            category_id,
            name,
            fine_amount,
            daily_rate,
            description,
            license_plate,
        } = request.body;

        const createCarUseCase = container.resolve(CreateCarUseCase);

        const car = await createCarUseCase.execute({
            brand,
            category_id,
            name,
            fine_amount,
            daily_rate,
            description,
            license_plate,
        });

        return response.status(201).json(car);
    }
}

export { CreateCarController };
