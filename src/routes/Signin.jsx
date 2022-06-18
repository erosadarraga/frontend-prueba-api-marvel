import React, { useState, useContext } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext'
const Signin = () => {
  const [correo, setCorreo] = useState('prueba@gmail.com');
  const [contraseña, setContraseña] = useState('pruebaContraseña');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { iniciarSesion } = useContext(UserContext)



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await iniciarSesion(correo, contraseña);
      navigate('/home')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>

      <div className='max-w-[550px]  mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Iniciar sesión</h1>
        <form onSubmit={handleSubmit} >
          <div className='my-4'>
            <label>Email</label>
            <div className='relative w-full my-2 shadow-xl rounded-2xl'>
              <input
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className='w-full p-2 border bg-primary border-input rounded-2xl'
                type='email'
              />
              <AiOutlineMail className='absolute text-gray-400 right-2 top-3' />
            </div>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='relative w-full my-2 shadow-xl rounded-2xl'>
              <input
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className='w-full p-2 border bg-primary border-input rounded-2xl'
                type='password'
              />
              <AiFillLock className='absolute text-gray-400 right-2 top-3' />
            </div>
          </div>
          <button className='w-full p-3 my-2 shadow-xl bg-button text-btnText rounded-2xl'>
            Iniciar sesión
          </button>
        </form>
        <p className='my-4'>
          No tienes una cuenta?{' '}
          <Link to='/signup' className='text-accent'>
            Registrarte
          </Link>
        </p>
      </div>
    </div>
  )
}


export default Signin;
