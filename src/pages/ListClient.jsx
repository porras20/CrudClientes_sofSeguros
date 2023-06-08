import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import CardClient from "../components/CardClient";
import axios from "axios";

export default function ListClient() {
  const [dataClients, setDataClients] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const data = {
    title: "listado de clientes",
    urlButton: "/client/create",
    textButton: "Nuevo cliente",
  };

  const handleSearch = (event) => {
    setSearchValue((event.target.value));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/users/api/v1/users/"
        );
        setDataClients(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Banner data={data} />
      <div className="bg-white mx-16 py-5 px-10 flex flex-col items-center mb-5">
        <input
          type="text"
          className="w-full p-2 rounded-md utline-none  border-2 border-gray-400 capitalize"
          placeholder="Buscar..."
          value={searchValue}
          onChange={handleSearch}
        />
        <div className="w-full mt-5 px-5 flex flex-col gap-y-5">
          {dataClients
            .filter(
              (client) => client.state && client.name.includes(searchValue)
            ) // Filtrar por estado y valor de búsqueda en el nombre
            .map((client) => (
              <CardClient client={client} key={client.id} />
            ))}
        </div>
      </div>
    </>
  );
}
