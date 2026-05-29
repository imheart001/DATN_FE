export interface IFilms {
  id: string;
  name: string;
  slug: string;
  image: string;
  trailer: string;
  time: string;
  release_date: Date;
  end_date: Date;
  limit_age: number;
  poster: string;
  description: string;
  status: number;
}
export interface ICategorys {
  id: string;
  name: string;
  slug: string;
  status: number;
}
export interface IVoucher {
  id: string;
  code: string;
  start_time: string;
  end_time: string;
  usage_limit: number;
  price_voucher: number;
  remaining_limit: number;
  limit: number;
  percent: number;
  minimum_amount: number;
  description: string;
}
export interface ICinemas {
  id: string;
  name: string;
  address: string;
  status: number;
}
export interface ISeatKepting {
  seat: string;
  id_user: string;
}
export interface IShowTime {
  id: string;
  date: Date;
  time_id: string;
  film_id: string;
  room_id: string;
  status: number;
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
  status: number;
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
  status: number;
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
  id: number;
  name: string;
  phone: number;
  image: string;
  email: string;
  date_of_birth: string;
  password: string;
  old_password: string;
  new_password: string;
  role: number;
  id_cinema: number;
}
export interface IBookTicketUser {
  time: string;
  total_price: string;
  film_name: string;
  film_image: string;
  id_code: string;
  date: string;
  time_td: string;
  food_names: string | undefined;
  chair_name: string;
  chair_price: string;
  cinema_name: string;
}
export interface IBlogs {
  id: string;
  title: string;
  slug: string;
  image: string;
  content: string;
  status: number;
}

export interface IComments {
  id: string;
  content: string;
}
