import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className='bg-[#202020] font-[Poppins] text-white py-2 px-5 fixed w-full'>
        <ul className='flex justify-between'>
            <Link to='/client/list'>Lista de clientes</Link>
            <Link to='/client/create'>Crear un nuevo cliente</Link>
        </ul>
    </nav>
  )
}
