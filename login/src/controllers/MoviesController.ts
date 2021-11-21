import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Movies } from "../models/Movies";
class MoviesController {
  async store(request: Request, response: Response) {
    const repository = getRepository(Movies);

    const { title, description, releaseDate, pirate, magnet } = request.body;

    const movieExists = await repository.findOne({ where: { title } });

    if (movieExists) {
      return response.sendStatus(409).json("This movie is already registered");
    }

    const movie = repository.create({
      title,
      description,
      releaseDate,
      pirate,
      magnet,
      image: request.file?.filename,
    });
    await repository.save(movie);

    return response.json(movie);
  }

  async getAll(request: Request, response: Response) {
    const repository = getRepository(Movies);
    const index = await repository.find({});

    return response.json(index);
  }
}

export default new MoviesController();
