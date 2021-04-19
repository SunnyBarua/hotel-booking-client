
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { read,diffDays, isAlreadyBooked } from '../actions/hotel';
import moment from "moment"
import { useSelector } from 'react-redux';
import { getSessionId } from '../actions/stripe';
import {loadStripe} from "@stripe/stripe-js"
const ViewHotel = () => {

    const history=useHistory()
    let hotelId=useParams().hotelId
    const [hotel,setHotel]=useState({});
    const [image,setImage]=useState("");
    const [loading,setLoading]=useState(false)
    const [alreadyBooked,setAlreadyBooked]=useState(false)

    const {auth}=useSelector((state)=>({...state}))
    useEffect(()=>{
        loadSellerHotel();
    },[])
    useEffect(()=>{
        if(auth && auth.token){
            isAlreadyBooked(auth.token,hotelId)
            .then(res=>{
                console.log(res)
                if(res.data.ok) setAlreadyBooked(true);
            })
        }
    },[])
    const loadSellerHotel=async()=>{
        let res=await read(hotelId);
        setHotel(res.data)
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
    }
    const hadnleClick=async(e)=>{

        e.preventDefault();

        if(!auth || !auth.token){
            history.push("/login");
            return;
        }
        setLoading(true)
        if(!auth) {
          history.push("/login")
        }
        let res=await getSessionId(auth.token,hotelId)
        console.log("get session id response",res)
        const stripe=await loadStripe(process.env.REACT_APP_STRIPE_KEY)
        stripe.redirectToCheckout({
            sessionId:res.data.sessionId,
        })
        .then((result)=>console.log(result))
    }
    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h2>{hotel.title}</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <br/>
                    <img src={image} alt={hotel.title} className="img img-fluid m-2"/>
                </div>
                <div className="col-md-6">
                    <br/>
                    <p>{hotel.content}</p>
                    <p className="alert alert-info mt-3">$ <bold>{hotel.price}</bold></p>
                    <p className="card-text">
                               <span className="float-right text-primary">
                                   for {diffDays(hotel.from, hotel.to)}
                                   {diffDays(hotel.from,hotel.to)<=1 ? "day":"days"}
                               </span>
                    </p>
                    <p><strong>From</strong> <br/>{moment(new Date(hotel.from)).format("MMM DD YYY, h:mm:ss a")}</p>
                    <p><strong>To</strong> <br/>{moment(new Date(hotel.to)).format("MMM DD YYY, h:mm:ss a")}</p>
                    <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
                    <br/>
                  <button onClick={hadnleClick} className="btn btn-block btn-lg btn-primary mt-3" disabled={loading || alreadyBooked}>
                      {loading ? "Loading ...":alreadyBooked ?"Already Booked" : auth && auth.token ? "Book Now":"Login to Book"}
                  </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ViewHotel
