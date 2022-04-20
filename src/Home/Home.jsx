import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../Home/Home.module.css"
import { Link, useNavigate } from 'react-router-dom';
export default function Home() {
let baseImagUrl = 'https://image.tmdb.org/t/p/original/';
let [trendingMovies , setTrendingMovies] = useState([]);
let [trendingTvShows , setTrendingTvShows] = useState([]);
let [trendingPeople , setTrendingPeople] = useState([]);

async function getTrendingItems(mediaType , callback){
  let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
  callback(data.results);
}

useEffect(()=>{
  getTrendingItems("movie" , setTrendingMovies);
  getTrendingItems("tv" , setTrendingTvShows);
  getTrendingItems("person" , setTrendingPeople);
},[]);

let navigate=useNavigate();
function goToDetails(id){
  navigate({
    pathname:"/Moviedetails",
    search: `?id=${id}`
  })
}

function goToTv(id){
  navigate({
    pathname:"/Tvdetails",
    search: `?id=${id}`
  })
}

  return <>

  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div className='w-100'>
      <div className={ `w-25 ${styles.border}`}></div>
      <h2>Trending</h2>
      <h2>Movies</h2>
      <h2>To Watch Now</h2>
      <p className='secound'>Most Watched Movies By Day</p>
      <div className={ `w-100 ${styles.border}`}></div>
      </div>
    </div>
  {trendingMovies.map((movie , index)=> <div className='col-md-2' onClick={()=>goToDetails(movie.id)}  key={index}>
    <div>
      <Link to={`/Moviedetails/${movie.id}`}>
      <img src={baseImagUrl + movie.poster_path} className="w-100 mb-3" alt="" srcset="" />
      <h5 className='fw-normal mb-3'>{movie.title}</h5>
      </Link>
    </div>
  </div>)}
  </div>
  
  
  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div className='w-100'>
      <div className={ `w-25 ${styles.border}`}></div>
      <h2>Trending</h2>
      <h2>Tv Shows</h2>
      <h2>To Watch Now</h2>
      <p className='secound'>Most Watched Tv By Day</p>
      <div className={ `w-100 ${styles.border}`}></div>
      </div>
    </div>
  {trendingTvShows.map((tv , index)=> <div className='col-md-2' onClick={()=>goToTv(tv.id)} key={index}>
    <div>
    <Link to={`/Tvdetails/${tv.id}`}>
      <img src={baseImagUrl + tv.poster_path} className="w-100 mb-3" alt="" srcset="" />
      <h5 className='fw-normal mb-3'>{tv.name}</h5>
      </Link>
    </div>
  </div>)}
  </div>


  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div className='w-100'>
      <div className={ `w-25 ${styles.border}`}></div>
      <h2>Trending</h2>
      <h2>person Shows</h2>
      <h2>To Watch Now</h2>
      <p className='secound'>Most Watched person By Day</p>
      <div className={ `w-100 ${styles.border}`}></div>
      </div>
    </div>
  {trendingPeople.map((person , index)=> <div className='col-md-2 ' key={index}>
    <div>
      <img src={baseImagUrl + person.profile_path} className="w-100 mb-3" alt="" srcset="" />
      <h5 className='fw-normal mb-3'>{person.name}</h5>
    </div>
  </div>)}
  </div>

  </>
}
