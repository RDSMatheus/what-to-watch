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
}

export interface TMDBmovieScore extends TMDBmovie {
  combinedScore: number;
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
}
