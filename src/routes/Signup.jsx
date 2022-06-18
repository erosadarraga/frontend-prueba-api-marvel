import React, { useContext, useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonBadgeFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';

const Signup = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { registrese } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await registrese(correo, contraseña, apellidos, nombre)
      navigate('/')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <div>
      <div className='max-w-[350px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Registrarse</h1>
        {error ? <p className='p-3 my-2 bg-red-300'>{error}</p> : null}
        <form onSubmit={handleSubmit} >
          <div className='my-4'>
            <label>Nombre</label>
            <div className='relative w-full my-2 shadow-xl rounded-2xl'>
              <input
                onChange={(e) => setNombre(e.target.value)}
                className='w-full p-2 border bg-primary border-input rounded-2xl'
                type='text'
              />
              <BsFillPersonBadgeFill className='absolute text-gray-400 right-2 top-3' />
            </div>
          </div>
          <div className='my-4'>
            <label>Apellidos</label>
            <div className='relative w-full my-2 shadow-xl rounded-2xl'>
              <input
                onChange={(e) => setApellidos(e.target.value)}
                className='w-full p-2 border bg-primary border-input rounded-2xl'
                type='text'
              />
              <BsFillPersonBadgeFill className='absolute text-gray-400 right-2 top-3' />
            </div>
          </div>

          <div className='my-4'>
            <label>Correo</label>
            <div className='relative w-full my-2 shadow-xl rounded-2xl'>
              <input
                onChange={(e) => setCorreo(e.target.value)}
                className='w-full p-2 border bg-primary border-input rounded-2xl'
                type='email'
              />
              <AiOutlineMail className='absolute text-gray-400 right-2 top-3' />
            </div>
          </div>
          <div className='my-4'>
            <label>Contraseña</label>
            <div className='relative w-full my-2 shadow-xl rounded-2xl'>
              <input
                onChange={(e) => setContraseña(e.target.value)}
                className='w-full p-2 border bg-primary border-input rounded-2xl'
                type='password'
              />
              <AiFillLock className='absolute text-gray-400 right-2 top-3' />
            </div>
          </div>
          <button className='w-full p-3 my-2 shadow-xl bg-button text-btnText rounded-2xl'>
            Registrarse
          </button>
        </form>
        <p className='my-4'>
          Ya tienes una cuenta ?{' '}
          <Link to='/signin' className='text-accent'>
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
