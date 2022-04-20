import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Moviedetails() {
  let[searchParam , setSearchParam]=useSearchParams();
  let imgUrl = 'https://image.tmdb.org/t/p/original/';
  let [details,setDetails]=useState({});
  let [genres , setGenres] = useState([])
  let currentId = searchParam.get('id');
  async function getDetails(){
    let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${currentId}?api_key=f1aca93e54807386df3f6972a5c33b50`)
    setDetails(data);
    setGenres(data.genres)
    // console.log(data);
  }
  useEffect(()=>{
    getDetails()
  },[])
  return <>
  <div className="container">
  <div className="row py-3  ">
    <div className="col-md-4 ">
      <img src={imgUrl + `${details.poster_path}`} className='w-100 ' alt="" srcset="" />
    </div>
    <div className="col-md-8">
      <h3>{details.title}</h3>
      <h5 className='text-muted'>{details.tagline}</h5>
      <div className="d-flex py-4">
      {genres.map((got,index)=>
      <h6 className='me-3 fw-normal bg-primary p-2  rounded-2' key={index}>{got.name}</h6>
      )};
    </div>
        <h5 className='mb-4'>Vote : <span className='fw-normal'>{details.vote_average}</span> </h5>
        <h5 className='mb-4'>Vote Count : <span className='fw-normal'>{details.vote_count}</span> </h5>
        <h5 className='mb-4'>Popularity : <span className='fw-normal'>{details.popularity}</span> </h5>
        <h5 className='mb-4 '>Release_date : <span className='fw-normal'>{details.release_date}</span> </h5>
        <p>{details.overview}</p>
    </div>
  </div>
  </div>
  </>
}
