import { getCustomRepository } from "typeorm";
import MoviesEntity from "../../movies/infra/typeorm/entities/MoviesEntity";
import UserMoviesRepository from "../infra/typeorm/repositories/UserMoviesRepository";

interface IUser {
    userId: string;
}
class ListMoviesUserService {
    public async execute({ userId }: IUser): Promise<MoviesEntity[]> {
        const userMoviesRepository = getCustomRepository(UserMoviesRepository);

        const userMovies = await userMoviesRepository.findById(userId);

        return userMovies;
    }
}

export default ListMoviesUserService;
