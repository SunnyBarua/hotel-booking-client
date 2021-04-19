import React, { useState } from 'react'
import {toast} from "react-toastify"
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { login } from '../actions/auth'
import axios from 'axios'

const Login = () => {
    const history=useHistory()
    const dispatch=useDispatch()
   
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("SEND LOGIN DATA",{email,password});
        
        try{
            const res=await login({email,password});
            console.log("Login Respponse",res)

            if(res.data){

                console.log("SAVE USER RES")
            // console.log(res.data)
                window.localStorage.setItem('auth',JSON.stringify(res.data))
                dispatch({
                    type:"LOGGED_IN_USER",
                    payload:res.data
            })
            history.push("/");
        }
        
        }
        catch(err){
            console.log(err)
            if(err.response.status===400) toast.error(err.response.data);
        }
    }
    console.log(process.env.REACT_APP_API)
    return (
        <>
        <div className="container-fluid h1 p-5 text-center">
           <h1>Login</h1>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                      
                        <div className="form-group mb-3">
                            <label className="form-label">You Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">You Password</label>
                            <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                        </div>
                        <button disabled={!email,!password} className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login
