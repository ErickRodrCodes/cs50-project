export class Helper {
  static getPoster(poster: string): string {
    return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster}`;
  }

  static getBackdrop(backdrop: string): string {
    return `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop}`;
  }
}
