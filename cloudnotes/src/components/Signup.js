import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
let navigate = useNavigate();

  const [credentials, setCredentials] = useState({name:'',email:'',password:'',cpassword:''});

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value});

  }

  const handleSubmit = async (e) =>{
e.preventDefault();
//API call
const response = await fetch("http://localhost:5000/api/auth/createuser",{
  method: 'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})
});
const serverResp = await response.json();
console.log(serverResp);
if(serverResp.success){
localStorage.setItem('token', serverResp.authToken);
navigate('/');
props.showAlert("Congrats! The cloud is yours!", "primary")
}else{
props.showAlert("Enter proper details mate", "danger")
}

  }
  return (
    <>
    <div className={`container md-5" `}>
      <h2 className={`d-flex justify-content-center text-${props.theme==='light'?'black':'white'}`}>Get started with Cloud Notes</h2>
      <form onSubmit={handleSubmit}>
     <div className='container my-5 md-5' style={{width: 500}}>
                <div className="form-floating mb-3 ">
                    <input type="text" className="form-control" id="name" name='name' placeholder="Your Sweet Name" value={credentials.name} onChange={onChange} required/>
                    <label htmlFor="floatingInput">Your Lovely Name</label>
                </div>
                <div className="form-floating mb-3 ">
                    <input type="email" className="form-control" id="email" name='email' placeholder="name@example.com" value={credentials.email} onChange={onChange} required/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={credentials.password} onChange={onChange} required/>
                    <label htmlFor="floatingPassword">Password (which you can remember)</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="cpassword" name='cpassword' placeholder="Password" value={credentials.cpassword} onChange={onChange} required/>
                    <label htmlFor="floatingPassword">Match with above Password</label>
                </div>
                <button  type="submit" className="btn btn-warning my-3">Sign Up</button>
            </div>
            </form>
            </div>
    </>
  )
}

export default Signup
