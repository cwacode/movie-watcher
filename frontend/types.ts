export interface Movie {
    movie_id: number;
    name: string;
    year: number;
    genre: string;
    image: string;
}
export type SortKey = 'name' | 'year' | 'genre';