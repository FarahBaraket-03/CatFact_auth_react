import {  useEffect, useState } from "react";
import man from "./resources/business-3d-close-up-of-businessman-in-dark-blue-suit-looking-at-phone.png" ;
import woman from "./resources/business-3d-close-up-of-businesswoman-in-blue-suit-with-phone-looking-straight.png"
import Api from "./Api";
import { getDoc,doc } from "firebase/firestore";
import { auth, db } from "../Firebase_config";
import { signOut } from "firebase/auth";


const Content=(props)=>{
    const [profile,setPro]=useState(null);
    const getData=(info)=>{
        getDoc(doc(db,"users",info.user.uid)).then((u)=>{
            let d=u.data();
            setPro(d);
            
        })
    }
    useEffect(()=>{
        getData(props);
    },[])

    return (
    <>
    <div className="container mt-4">
        <div className="row ">
            <div className="col-3 text-center profile">
                <img src={profile &&(profile.gender === 'H'? man : woman)} className="w-75 img-fluid mt-3  mb-3" alt="person..." />
                <h1 className=" fw-bold text-dark-emphasis">Info</h1>
                <p className="text-secondary">Email : {profile && profile.email}</p>
                <p className=" text-secondary ">Name : {profile && profile.name}</p>
                <p className=" text-secondary ">Age : {profile && profile.age}</p>
                <p className=" text-secondary ">Gender : {profile && profile.gender}</p>
                <button className="btn btn-danger" onClick={()=>signOut(auth)}>Log Out</button>
            </div>
            <div className="col-8">
                <Api/>
            </div>
        </div>
    </div>
    </>
    )
}

export default Content;