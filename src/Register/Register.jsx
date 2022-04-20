import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function Register() {

    const[errorList , setErrorList ]=useState([]);
    const[isLoading , setIsLoading ]=useState(false);
    let navigate = useNavigate();
    const[error , setError]=useState('');
    const[user , setUser]=useState({
        first_name: "",
        last_name : "",
        age : 0,
        email : "",
        password : ""
    });

function getUser(e){
   let myUser= {...user};
   myUser[e.target.name] = e.target.value; 
   setUser(myUser); 
}

 async function submitRegister(e){
 e.preventDefault();
 setIsLoading(true)
 let validationResult = validateRegisterForm(user)

 if(validationResult.error)
 {
    setIsLoading(false)
    setErrorList(validationResult.error.details)
 }
 else
 {
    setIsLoading(true)
    let {data} = await axios.post(`https://routeegypt.herokuapp.com/signup` , user)
        if(data.message === "success")
        {
            setIsLoading(false)
            navigate("/login")
        }else
        {
            setError(data.message)
            setIsLoading(false)
        }

 }
}


function validateRegisterForm(user)
{
    let schema = Joi.object({
        first_name:Joi.string().alphanum().min(3).max(8).required(),
        last_name:Joi.string().alphanum().min(3).max(8).required(),
        age:Joi.number().min(15).max(60).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

    return schema.validate(user , {abortEarly:false});
}

  return <>
  <form onSubmit={submitRegister} className='mx-auto w-75 py-5'>

  <h2 className='mb-4'>Register Now</h2>

   { errorList.map( (error , index)=> {

       if(error.path[0]==="password")
       {
        return <div key={index} className='alert alert-danger'>Password Valid</div>
       }
       else
       {
        return <div key={index} className='alert alert-danger'>{error.message}</div>
       }

   } 
   
   )} 

  {error?<div className="alert alert-danger">{error}</div>:""}
    
  <label htmlFor="first_name">First Name :</label>
  <input onChange={getUser} type="text"  className='form-control mb-3 mt-2' name='first_name' id='first_name'/>
  
  <label htmlFor="last_name">last Name :</label>
  <input onChange={getUser} type="text"  className='form-control mb-3 mt-2' name='last_name' id='last_name'/>

  <label htmlFor="age">Age :</label>
  <input onChange={getUser} type="number"  className='form-control mb-3 mt-2' name='age' id='age'/>

  <label htmlFor="email">Email :</label>
  <input onChange={getUser} type="email"  className='form-control mb-3 mt-2' name='email' id='email'/>

  <label htmlFor="password">Password :</label>
  <input onChange={getUser} type="password"  className='form-control mb-3 mt-2' name='password' id='password'/>

   <button className='btn btn-primary'>
    {isLoading?<i className='fas fa-spinner fa-spin'></i>:"Register"}   
    </button> 
  
  </form>
  </>
}
