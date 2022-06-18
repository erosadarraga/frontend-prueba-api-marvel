import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa';

import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';

const HeroID = () => {
  const [hero, setHero] = useState({});
  const [loader, setLoader] = useState(true)
  const params = useParams()

  const url =
    `https://gateway.marvel.com:443/v1/public/characters/${params.id}?ts=1&apikey=75158ce13ba0fd52199416d808d2c1c1&hash=3d4c9a890966be9ed1d34f9d78c75257`;
  console.log(params);

  useEffect(() => {
    axios.get(url).then((response) => {
      setHero(response.data.data.results[0]);
      setLoader(false)
    });
  }, [url]);

  return (
    <div className='py-4 my-8 rounded-div'>
      {!loader ? <>
        <div className='flex-row justify-center m-auto sm:justify-around sm:flex '>
          <div className='p-6 sm:p-0 sm:mr-4 sm:w-72 sm:h-72'>
            <img className='p-6 rounded shadow-md sm:p-0 sm:mr-4 sm:w-72 sm:h-72' src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt='/' />
          </div>
          <div className='self-center'>
            <p className='ml-4 text-3xl font-bold sm:text-6xl sm:w-72 sm:h-72'>{hero.name}</p>
          </div>
        </div>
        <div className='grid gap-8 pt-2 md:grid-cols-2'>
          <div className='py-2'>
            <div className='flex-row items-center justify-between'>
              <p className='self-center text-3xl font-bold'>Descripción</p>
              <p className='pt-2 '>{hero.description === "" ? "No hay descripción" : hero.description}</p>
            </div>
          </div>
          <div>
            <p className='py-2 text-xl font-bold'>Lista de cómics</p>
            <div className='flex-row justify-between h-56 py-2 overflow-y-scroll'>
              <ul class=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {hero.comics.items.map((item, idx) => (
                  <li key={idx} class="w-full px-4 py-2 border-b hover:bg-slate-200 border-gray-200 hover:dark:bg-gray-400 rounded-t-lg dark:border-gray-600">{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </> : <Loader />}
    </div>
  );
};

export default HeroID;  
