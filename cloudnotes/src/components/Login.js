import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    let navigate = useNavigate();
    

const [credentials, setCredentials]=useState({email:'', password:''});

    const handleSubmit = async (e)=>{
e.preventDefault();
//API call
const response = await fetch("http://localhost:5000/api/auth/login", {
    method : 'POST',
    headers :{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({email:credentials.email, password: credentials.password})

});
const serverResp = await response.json();
console.log(serverResp);
if(serverResp.success){
    //save the authtoken and redirect
    localStorage.setItem('token',serverResp.authToken);// saving the authtoken
    console.log(serverResp.name);
    localStorage.setItem('username', serverResp.name);
    navigate('/');// redirecting the page to homepage

   props.showAlert("Login Successfull","success"); // using props without destructuring
}
else{
    props.showAlert("Invalid Credentials","danger")
}
}

const onChange = (e) =>{
    setCredentials({...credentials , [e.target.name] : e.target.value});
}
    
    return (
        <>
        <div className="container md-5">
            
            <h2 className={`d-flex justify-content-center text-${props.theme==='light'?'black':'white'}`}>Login for your secure notes</h2>
        <form onSubmit={handleSubmit}>
            <div className='container my-5 md-5' style={{width: 500}}>
                <div className="form-floating mb-3 ">
                    <input type="email" className="form-control" id="email" name='email' placeholder="name@example.com" value={credentials.email} onChange={onChange}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={credentials.password} onChange={onChange}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-success my-3">Login</button>
            </div>
            </form>
            </div>
        </>
    )
}


export default Login
