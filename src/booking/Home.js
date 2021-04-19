import React, { useEffect, useState } from 'react'
import {useSelector,useStore} from "react-redux"
import { allHotels } from '../actions/hotel';
import SmartCard from '../components/cards/SmartCard';

const Home = () => {
    const [hotels,setHotels]=useState([]);

    useEffect(()=>{
        loadAllhotels()
    },[]);

    const loadAllhotels=async()=>{
        let res=await allHotels();
        setHotels(res.data);
    }
    return (
        <>

        <div className="container-fluid bg-secondary p-5 text-center">
            <h1>All Hotels</h1>
        </div>
        <div className="container-fluid">
            {hotels.map((hotel)=><SmartCard key={hotels._id} hotel={hotel} owner={false}/>)}
        </div>
        </>
    )
}

export default Home
