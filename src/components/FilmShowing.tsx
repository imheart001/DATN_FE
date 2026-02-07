import React from "react";
import { Link } from "react-router-dom";
import { IFilms } from "../interface/model";

type Props = {
  data: IFilms;
};

const FilmShowing = ({ data }: Props) => {
  console.log(data);

  return (
    <div className="w-[245px] h-[420px]">
      <Link to={`/movie_about/${data.id}`}>
        <img
          srcSet={data.image}
          alt=""
          className="rounded-2xl w-[205px] h-[300px]"
        />
        <h3 className="text-[#FFFFFF] my-[10px] mb-[7px] font-bold text-[26px]">
          {data.name} {/* Access the name directly */}
        </h3>
        <div className="space-x-5 text-[#8E8E8E] text-[11px]">
          <span>Drama</span>
          <span>IMDB 8.6</span>
          <span>13+</span>
        </div>
      </Link>
    </div>
  );
};

export default FilmShowing;
