import React, { useState } from 'react'

import {  toast } from 'react-toastify';

import { useHistory } from 'react-router';
import { register } from '../actions/auth';


const Register = () => {
    const history=useHistory()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await register({
            name,email,password
        });
        toast.success('Register success. Please login')
        history.push("/login")
        }
        catch(err){
            console.log(err)
            if(err.response.status===400) toast.error(err.response.data);
        }
    }
    return (
        <>
        <div className="container-fluid h1 p-5 text-center">
           <h1>Register</h1>
        </div>
        
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label className="form-label">You Name</label>
                            <input type="text" className="form-control" placeholder="Enter name" value={name} onChange={e=>setName(e.target.value)}/>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">You Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">You Password</label>
                            <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                        </div>
                        <button disabled={!name,!email,!password} className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register
