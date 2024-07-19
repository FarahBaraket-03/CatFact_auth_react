import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import cat2 from "./resources/cat2.gif" ;
import { auth } from "../Firebase_config";
import { useEffect, useState } from "react";
import Content from "./Content";

const Home=()=>{
    const [logg,setLog]=useState(false);
    const [User,setUser]=useState(null);
    const track=()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
                setLog(true);
            }
            else{
                setLog(false);
            }
        })
    }

    useEffect(()=>{
        track();
    },[])

    return (
    <>
    {
        ! logg ? (
        <div>
            <div className="alert alert-primary text-center" role="alert"> if you want know random informations of CATS then , Login and FOUND OUT intersting infos!</div>
            <Login/>
            <div className="text-center">
                <img src={cat2} alt="cat.." className="w-25 img-fluid "/>
            </div>
        </div>) : <Content user={User}  />
    }

    </>
    )
}

export default Home