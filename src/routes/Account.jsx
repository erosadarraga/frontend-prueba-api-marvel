import React, { useContext } from 'react';
import { UserContext } from '../context/AuthContext'
import { UserAuth } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Account = () => {
    const { userInfo, token } = useContext(UserContext)
    if (token) {
        return (
            <div className='max-w-[1140px] mx-auto'>
                <div className='flex justify-between items-center my-12 py-8 rounded-div'>
                    <div>
                        <h1 className='text-2xl font-bold'>Bienvenido </h1>
                        <div>
                            <p className='text-lg font-medium' >Nombre completo: {userInfo && userInfo.nombre}</p>
                            <p className='text-lg font-medium' >Correo: {userInfo && userInfo.correo}</p>
                        </div>
                    </div>
                    <div>
                        <Link
                            to='/home'
                            className='border bg px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl'
                        >
                            Lista de Heroes
                        </Link>
                    </div>
                </div>
                <div className='flex justfiy-between items-center my-12 py-8 rounded-div'>
                    <div className='w-full min-h-[300px]'>
                        <h1 className='text-2xl font-bold py-4'>Token de seguridad</h1>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex'>

                                <div className='w-96' >
                                    <p className='h-32 overflow-x-auto font-bold'>{token} </p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        );
    } else {
        return <Navigate to='/signin' />;
    }
};

export default Account;