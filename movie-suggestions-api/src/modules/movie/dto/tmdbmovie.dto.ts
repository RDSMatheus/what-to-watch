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
  genre_names: string[];
}

export interface TMDBSearch {
  page: number;
  results: TMDBmovieScore[];
  total_pages: number;
  total_results: number;
}

export interface TMDBSearchResponse extends TMDBSearch {
  movieTitle: string;
}

export interface TMDBUpcomingResponse extends TMDBSearch {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export interface Genres {
  id: number;
  name: string;
}

export interface TMDBGenres {
  genres: Genres[];
}

interface Actor {
  id: number;
  name: string;
  popularity: number;
  profile_path: string;
  character: string;
  order: number;
}

export interface TMDBDetails {
  cast: Actor[];
}

export interface Credits extends TMDBDetails {
  id: number;
}

export interface TMDBMovieDetailsResponse {
  backdrop_path: string;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  origin_country: string[];
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  title: "Fight Club";
  vote_average: 8.438;
}

export interface TMDBMovieDetails extends TMDBMovieDetailsResponse {
  cast: Actor[];
}
