export interface IFilms {
  _id: string;
  name: string;
  slug: string;
  image: string;
  trailer: string;
  time: string;
  release_date: Date;
  description: string;
  status: number;
}
export interface ICinemas {
  _id: string;
  name: string;
  address: string;
  status: number;
}