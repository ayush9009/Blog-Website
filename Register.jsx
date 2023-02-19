import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setError] = useState(null);

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  console.log(inputs);

  const handleSubmit = async e => {//async function becaise we are making api request so to get data from api time lage isliye async function
    //for making api requests we use axios
    e.preventDefault();  //ye isilye kara taki jaise hi user submit button click kare page refresh na ho
    // axios is a libaray which is used to communicate with the backend
    // aab backedn se kaise bat karogey,connection establish kar diya
    //lakin jo api hai unse data kaise recevie hoga uske liye hai axios,it makes requests to api,and return the data ,it receive from the frontedn
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }

  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder='username' name='username' onChange={handleChange} />
        <input required type="email" placeholder='email' name='email' onChange={handleChange} />
        <input required type="password" placeholder='password' name='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        
        {err && <p>{err}</p>}
        {/* here we use span for grouping the inline elements */}
        <span>Do you have an account?<Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register