import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { read, updateHotel } from '../actions/hotel'
import HotelEditForm from '../components/forms/HotelEditForm'

const EditHotel = () => {
    const {auth}=useSelector((state)=>({...state}))
    const {token}=auth

    const [values,setValues]=useState({
        title:"",
        content:"",
        image:"",
        price:"",
        from:"",
        to:"",
        bed:""
    });
    
    const [preview,setPreview]=useState('https://i1.adis.ws/i/carhartt_wip/no_pic/1--x100.png')
   
    const{title,content,location,image,price,from,to,bed}=values;

    const hotelId=useParams().hotelId
    console.log(hotelId)
    useEffect(()=>{
        loadSellerHotel()

    },[])
    const loadSellerHotel=async()=>{
        let res=await read(hotelId)
        console.log(res)
        setValues({...values,...res.data});
        setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        let hotelData=new FormData();
        hotelData.append("title",title)
        hotelData.append("content",content);
        hotelData.append("location",location)
        hotelData.append("price",price)
        image && hotelData.append("image",image)
        hotelData.append("from",from)
        hotelData.append("to",to)
        hotelData.append("bed",bed)

        try{
            let res=await updateHotel(token,hotelData,hotelId)
            console.log("HOTEL UPDATE RES",res)
            toast.success(`${res.data.title} is updated`);
        }catch(err){
            console.log(err)
            toast.error(err.response.data.err);
        }
    }
    const handleImageChange=(e)=>{
        setPreview(URL.createObjectURL(e.target.files[0]));
        setValues({...values,image:e.target.files[0]})
    }
    const handleChange=(e)=>{
        setValues({...values,[e.target.name]: e.target.value})

    }
    return (
        <>
         <div className="container-fluid bg-secondary p-5 text-center">
             <h2>Edit Hotel</h2>
             
        </div>   
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <br/>
                    <HotelEditForm
                      values={values}
                      setValues={setValues}
                      handleChange={handleChange}
                      handleImageChange={handleImageChange}
                      handleSubmit={handleSubmit}
                      />
                </div>
                <div className="col-md-2">
                    <img src={preview} alt="preview_image" className="img img-fluid m-2"/>
                </div>
            </div>
        </div>
        </>
    )
}

export default EditHotel
