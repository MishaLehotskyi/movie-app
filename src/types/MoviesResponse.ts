import { Movie } from './Movie';

export interface MoviesResponse {
    data: Movie [],
    next: number | null,
}
