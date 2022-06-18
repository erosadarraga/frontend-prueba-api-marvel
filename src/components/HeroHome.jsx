import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';

const HeroHome = () => {

  const [trending, setTrending] = useState([]);
  const [loader, setLoader] = useState(true)
  const [searchText, setSearchText] = useState('');
  const url = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=75158ce13ba0fd52199416d808d2c1c1&hash=3d4c9a890966be9ed1d34f9d78c75257&limit=100";

  /* Your public key: 75158ce13ba0fd52199416d808d2c1c1 */
  /* Your private key: cff0a5c10be5573853a18f1b8eb1cf26492127a2 */
  /* ts:1
  1cff0a5c10be5573853a18f1b8eb1cf26492127a275158ce13ba0fd52199416d808d2c1c1
  hash: 3d4c9a890966be9ed1d34f9d78c75257
  */
  useEffect(() => {
    axios.get(url).then((response) => {
      setTrending(response.data.data.results);
      setLoader(false)
    });
  }, []);
  return (
    <div className='py-4 my-6 rounded-div text-primary'>
      <div className='flex flex-col justify-around pt-4 pb-6 text-center md:flex-row md:text-right'>
        <h1 className='my-2 text-2xl font-bold'>Heros</h1>
        <form className='flex justify-between  items-center'>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full px-4 py-2 border shadow-xl bg-primary border-input rounded-2xl'
            type='text'
            placeholder='Search a hero'
          />
        </form>
      </div>
      {loader && <Loader />}
      {!loader && <>
        <div className='overflow-x-hidden overflow-y-scroll h-[500px]'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>
            {trending.filter((value) => {
              if (searchText === '') {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return value;
              }
            })
              .map((item, idx) => (
                <Link key={idx} to={`/id/${item.id}`}> <div className='flex justify-between p-4 duration-300 ease-in-out rounded-div hover:scale-105'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex'>
                      <img
                        className='w-32 h-32 mr-4 rounded-full'
                        src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                        alt='/'
                      />
                      <div className='w-52'>
                        <p className='font-bold'>{item.name}</p>
                        <p>Número de cómics en los que aparece : {item.comics.available}</p>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              ))
            }
          </div>
        </div></>}
    </div>
  );
};

export default HeroHome;
