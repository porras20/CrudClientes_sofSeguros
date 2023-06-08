import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Modal from "./Modal";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function CardClient({ client, setListClientDelete, listClientDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const deleteClient = async (client, id) => {
    client.state = false;
    try {
      await axios.put(
        `${apiUrl}/users/${id}/`,
        client
      );
      setListClientDelete([...listClientDelete, { client }])
      enqueueSnackbar("El cliente se ha eliminado correctamente", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Ocurrio un error al eliminar el cliente", { variant: "error" });
    }
  };
  return (
    <div className="card flex justify-between">
      <div className="flex items-center gap-8">
        <img
          className="w-[5rem] rounded-full"
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=360&t=st=1686175240~exp=1686175840~hmac=cccb296ccc8c9bfc2bfc5790cc65da4565924575156b529fc9732c9932c42317"
          alt=""
        />
        <div>
          <h2 className="font-bold text-2xl">{client.name}</h2>
          <p className="mt-2">{client.email}</p>
        </div>
      </div>
      <div className="">
        <p className="mb-3">{client.fecha_nacimiento}</p>
        <button
          className="bg-blue-500 p-2 mr-5 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <MdEdit className="text-2xl text-white" />
        </button>
        <button
          className="bg-red-500 p-2 rounded-md"
          onClick={() => deleteClient(client, client.id)}
        >
          <AiFillDelete className="text-2xl text-white" />
        </button>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} dataClient={client} />}
    </div>
  );
}
