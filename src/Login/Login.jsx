import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login( props) {

  const[errorList , setErrorList ]=useState([]);
  const[isLoading , setIsLoading ]=useState(false);
  let navigate = useNavigate();
  const[error , setError]=useState('');
  const[user , setUser]=useState({
      email : "",
      password : ""
  });

function getUser(e){
 let myUser= {...user};
 myUser[e.target.name] = e.target.value; 
 setUser(myUser); 
}

async function submitLogin(e){
e.preventDefault();
setIsLoading(true)
let validationResult = validateLoginForm(user)

if(validationResult.error)
{
  setIsLoading(false)
  setErrorList(validationResult.error.details)
}
else
{
  setIsLoading(true)
  let {data} = await axios.post(`https://routeegypt.herokuapp.com/signin` , user)
      if(data.message === "success")
      {
          localStorage.setItem("userToken" , data.token)
          setIsLoading(false)
          props.getUserData();
          navigate("/home")
      }else
      {
          setError(data.message)
          setIsLoading(false)
      }

}
}


function validateLoginForm(user)
{
  let schema = Joi.object({
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

  return schema.validate(user , {abortEarly:false});
}

return <>
<form onSubmit={submitLogin} className='mx-auto w-75 py-5'>

<h2 className='mb-4'>Login Now</h2>

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
  
<label htmlFor="email">Email :</label>
<input onChange={getUser} type="email"  className='form-control mb-3 mt-2' name='email' id='email'/>

<label htmlFor="password">Password :</label>
<input onChange={getUser} type="password"  className='form-control mb-3 mt-2' name='password' id='password'/>

 <button className='btn btn-primary'>
  {isLoading?<i className='fas fa-spinner fa-spin'></i>:"Login"}   
  </button> 

</form>
</>
}
