import React from "react";
import { Link } from "react-router-dom";

export default function Banner({data}) {
  return (
    <div className="bg-[#121625] h-[12rem] flex justify-around items-center">
      <h1 className="text-2xl text-white capitalize">{data.title}</h1>
      <Link to={data.urlButton} className="bg-blue-500 rounded-sm py-1 px-5 text-white">{data.textButton}</Link>
    </div>
  );
}
