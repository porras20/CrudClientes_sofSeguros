import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar  } from 'notistack' 

export default function Modal({ setIsOpen, dataClient }) {
  const [modalDataClient, setModaldataclient] = useState({
    name: dataClient.name,
    numero_documento: parseInt(dataClient.numero_documento),
    email: dataClient.email,
    fecha_nacimiento: dataClient.fecha_nacimiento,

  });

  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  
  const editClient = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/users/api/v1/users/${dataClient.id}/`,
        modalDataClient
      );
      navigate('/');
      setIsOpen(false);
      enqueueSnackbar('Se editó correctamente', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Ocurrio un error al editar el cliente', { variant: 'error' })
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-1/2 mx-auto rounded shadow-lg z-50">
        <div className="modal-body p-4">
          <form className="w-full max-w-sm mx-auto">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={modalDataClient.name}
                onChange={(e) =>
                  setModaldataclient((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                placeholder="Nombre"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="document"
              >
                Numero de documento
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="document"
                type="number"
                onChange={(e) =>
                  setModaldataclient((prevState) => ({
                    ...prevState,
                    numero_documento: e.target.value,
                  }))
                }
                value={modalDataClient.numero_documento}
                placeholder="Numero de documento"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                onChange={(e) =>
                  setModaldataclient((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                value={modalDataClient.email}
                placeholder="Correo electronico"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="birthdate"
              >
                Fecha de nacimiento
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="birthdate"
                type="date"
                onChange={(e) =>
                  setModaldataclient((prevState) => ({
                    ...prevState,
                    fecha_nacimiento: e.target.value,
                  }))
                }
                value={modalDataClient.fecha_nacimiento}
                placeholder="Fecha de nacimiento"
              />
            </div>
            <div className="flex items-center justify-between mt-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => editClient(modalDataClient.id)}
              >
                Guardar información
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 duration-200 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsOpen(false)}
              >
                Cerrar modal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
