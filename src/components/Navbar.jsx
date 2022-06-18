import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { UserContext } from '../context/AuthContext';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { cerrarSession, userInfo } = useContext(UserContext)
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex items-center justify-between h-20 font-bold rounded-div'>
      <Link to='/home'>
        <h1 className='text-2xl'>Marvel Api {userInfo && userInfo.nombre}</h1>
      </Link>
      <div className='hidden md:block'>
        <ThemeToggle />
      </div>
      {!nav && (
        <div className='hidden md:block'>
          {localStorage.getItem("correo") !== null ?
            <><button onClick={cerrarSession} className='p-4 hover:text-accent'>
              Cerrar Sesion
            </button>
              <Link to='/account' className='px-5 py-2 ml-2 shadow-lg bg-button text-btnText rounded-2xl hover:shadow-2xl'>
                Informacion
              </Link>
            </> : <> <Link to='/signin' className='p-4 hover:text-accent'>
              Iniciar sesión
            </Link>
              <Link
                to='/signup'
                className='px-5 py-2 ml-2 shadow-lg bg-button text-btnText rounded-2xl hover:shadow-2xl'
              >
                Registrarse
              </Link></>}
        </div>
      )}
      {/* Menu Icon */}
      <div onClick={handleNav} className='z-10 block cursor-pointer md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      {/* Mobile Menu */}
      <div
        className={
          nav
            ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10'
            : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'
        }
      >
        <ul className='w-full p-4'>
          <li onClick={handleNav} className='py-6 border-b'>
            <Link to='/'>Home</Link>
          </li>
          {localStorage.getItem("correo") !== null && <li onClick={handleNav} className='py-6 border-b'>
            <Link to='/account'>Informacion</Link>
          </li>}
          <li className='py-6 '>
            <ThemeToggle />
          </li>
        </ul>
        <div className='flex flex-col w-full p-4'>
          {localStorage.getItem("correo") !== null ? <button onClick={cerrarSession} className='p-4 hover:text-accent'>
            Cerrar Sesion
          </button> : <><Link to='/'>
            <button
              onClick={handleNav}
              className='w-full p-3 my-2 border shadow-xl bg-primary text-primary border-secondary rounded-2xl'
            >
              Iniciar sesión
            </button>
          </Link>
            <Link onClick={handleNav} to='/signup'>
              <button className='w-full p-3 my-2 shadow-xl bg-button text-btnText rounded-2xl'>
                Registrarse
              </button>
            </Link></>}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
