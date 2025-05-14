export interface TMDBmovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
}

export interface TMDBmovieScore extends TMDBmovie {
  combinedScore: number;
  genre_names: string[]
}

export interface TMDBSearch {
  page: number;
  results: TMDBmovieScore[];
  total_pages: number;
  total_results: number;
}

export interface TMDBSearchResponse {
  movieTitle: string;
  recommendations: TMDBmovieScore[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface TMDBGenres {
  genres: { id: number; name: string }[];
}
