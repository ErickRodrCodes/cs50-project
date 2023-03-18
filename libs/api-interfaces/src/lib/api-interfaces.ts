export interface Message {
  message: string;
}

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: any[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export type Movies = IMovie[];

export interface IPopularMovies {
  page: number;
  results: Movies;
  total_pages: number;
  total_results: number;
}

export interface IReview {
  id_review: number;
  id_movie: number;
  id_user: number;
  review: string;
  rating: number;
};

export type Reviews = IReview[];

export interface IUsers {
  id_user?: number;
  username: string;
  email: string;
  password_hash: string;
}
