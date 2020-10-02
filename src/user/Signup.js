import React, {useState} from "react";
import Layout from "../core/Layout";
import { API } from "../config";
const Signup = () => {
  const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success: false

  })

  const {name, email, password} = values;
  const signup = (user)=>{
    console.log(user);
    fetch(`${API}/signup`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    })
    .then(responce=>{
      return responce.json();
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const handleChange = field => {
    return event => {
      setValues({ ...values, error:false, [field]:event.target.value})
    }
  }
  const clickSubmit = (event)=>{
    event.preventDefault();
    signup({name, email, password});
  }
  const signUpFrom = ()=>(
    <form action="">
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control"/>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
    </form>
  );
  return (
    <Layout title="Signup page" description="Signup to Node React App"
    className="container col-md-8 offset-md-2">
      {signUpFrom()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
