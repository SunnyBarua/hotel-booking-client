import { LoadingOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { stripeSuccessRequest } from '../actions/stripe'

const StripeSuccess = () => {
    const hotelId=useParams().hotelId
    const history=useHistory()
    const {auth}=useSelector((state)=>({...state}));
    const {token}=auth

    useEffect(()=>{
        stripeSuccessRequest(token,hotelId)
        .then(res=>{
            if(res.data.success){
                console.log('stripe success response',res.data)
            history.push("/dashboard")
            }
            else{
                history.push("/stripe/cancel")
            }
        })

    },[hotelId])
    return (
        <div className="container">
            <div className="col justify-content-center p-5">
               
               <LoadingOutlined className="display-1 text-danger pt-5"/>
            </div>
        </div>
    )
}

export default StripeSuccess
