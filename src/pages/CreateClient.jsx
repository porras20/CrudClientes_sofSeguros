import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function CreateClient() {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const data = {
    title: "Nuevo cliente",
    urlButton: "/client/list",
    textButton: "Lista de clientes",
  };
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    numero_documento: "",
    email: "",
    fecha_nacimiento: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    numero_documento: "",
    email: "",
    fecha_nacimiento: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos
    let hasErrors = false;
    const newErrors = {
      name: "",
      numero_documento: "",
      email: "",
      fecha_nacimiento: "",
    };

    if (formData.name.trim() === "") {
      newErrors.name = "El nombre es requerido";
      hasErrors = true;
    }

    // Validar número de documento (ejemplo de longitud mínima de 6 caracteres)
    if (formData.numero_documento.trim().length < 6) {
      newErrors.numero_documento =
        "El número de documento debe tener al menos 6 caracteres";
      hasErrors = true;
    }

    // Validar email (ejemplo de formato de email)
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Ingrese un email válido";
      hasErrors = true;
    }

    // Validar fecha de nacimiento (ejemplo de edad mínima de 18 años)
    const fecha_nacimiento = new Date(formData.fecha_nacimiento);
    const today = new Date();
    const age = today.getFullYear() - fecha_nacimiento.getFullYear();
    if (age < 18) {
      newErrors.fecha_nacimiento = "Debe tener al menos 18 años";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      // Enviar formulario
      saveClient(formData);
      // Resetear los campos y errores
      setFormData({
        name: "",
        numero_documento: "",
        email: "",
        fecha_nacimiento: "",
      });
      setErrors({
        name: "",
        numero_documento: "",
        email: "",
        fecha_nacimiento: "",
      });
    }
  };

  const saveClient = async (data) => {
    try {
      await axios.post(`${apiUrl}/users/`, data);
      enqueueSnackbar('Se creo el cliente correctamente', { variant: 'success' })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Banner data={data} />
      <div className="bg-white mx-16 py-5 px-10 flex flex-col items-center mb-5">
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre completo
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name && "border-red-500"
              }`}
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre completo"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numero_documento"
            >
              Número de documento
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.numero_documento && "border-red-500"
              }`}
              id="numero_documento"
              type="text"
              name="numero_documento"
              value={formData.numero_documento}
              onChange={handleChange}
              placeholder="Número de documento"
            />
            {errors.numero_documento && (
              <p className="text-red-500 text-xs italic">
                {errors.numero_documento}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email && "border-red-500"
              }`}
              id="email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fecha_nacimiento"
            >
              Fecha de nacimiento
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.fecha_nacimiento && "border-red-500"
              }`}
              id="fecha_nacimiento"
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              placeholder="Fecha de nacimiento"
            />
            {errors.fecha_nacimiento && (
              <p className="text-red-500 text-xs italic">
                {errors.fecha_nacimiento}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Guardar cliente
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
