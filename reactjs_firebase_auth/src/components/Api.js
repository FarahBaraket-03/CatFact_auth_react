import  Axios  from "axios";
import cat1 from "./resources/cat1.png";
import cat2 from "./resources/cat2.gif";
import cat3 from "./resources/cat3.png";
import cat4 from "./resources/cat4.png";
import cat5 from "./resources/cat5.png";
import {useQuery} from 'react-query'
import { useState } from "react";

const Api=()=>{
    const [photo,setphoto]=useState(cat1);
    const random_photo=()=>{let l=[cat1,cat2,cat3,cat4,cat5];
        setphoto(l[Math.floor(Math.random()*5)])
    };
    const {data,isLoading,refetch}=useQuery("cat",()=>{
        return Axios.get("https://catfact.ninja/fact").then((res)=>res.data);
    });

    return(
        <>
        <div className="container content">
            <div className="row cat text-center">
                <h1>Fact of Today</h1>
                {isLoading ?<h3>Loading Fact ...</h3>:<p>{data?.fact}</p>}
                <button className="btn btn-secondary" onClick={()=>{refetch();random_photo()}}>new Fact</button>
            </div>
            <div className="row">
                <img src={photo} alt="cat" className=" img-fluid" />
            </div>
        </div>
        </>
    );
}

export default Api;