export interface IFilms {
  id: string;
  name: string;
  slug: string;
  image: string;
  trailer: string;
  time: string;
  release_date: Date;
  end_date: Date;
  description: string;
  status: number;
}
export interface ICategorys {
  id: string;
  name: string;
  slug: string;
  status: number;
}
export interface ICinemas {
  id: string;
  name: string;
  address: string;
  status: number;
}
export interface IShowTime {
  id: string;
  date: Date;
  time_id: string;
  film_id: string;
  room_id: string;
}
export interface ITime {
  id: string;
  time: string;
}
export interface IBookTicket {
  id: string;
  user_id: string;
  id_chair: string;
  time: string;
  id_code: string;
}
export interface IFood {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface IMovieRoom {
  id: string;
  name: string;
  id_cinema: string;
  // name_cinema : string
}
export interface ICateDetail {
  id: string;
  category_id: string;
  film_id: string;
}
export interface IChairs {
  name: [];
  price: number;
  id_time_detail: string;
}
export interface IUser {
  name: string;
  phone: number;
  email: string;
  password: string;
}
