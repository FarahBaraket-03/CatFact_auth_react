import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword }from 'firebase/auth';
import {auth,db} from '../Firebase_config';
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const Signup=()=>{
    
    const createAccount=(data)=>{
        createUserWithEmailAndPassword(auth,data.email,data.password).then((cred)=>{
            let User=doc(db,"users",cred.user.uid);
            setDoc(User,{...data});
            Swal.fire({
                position: "center",
                icon: "success",
                title: "You have signed up ",
                showConfirmButton: false,
                timer: 1900
              });
        }).catch((err)=>{
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.message,
                showConfirmButton: false,
                timer: 1900
              });
        })
    }


    const schema=yup.object().shape({
        name:yup.string().required('name is required').min(3).max(45),
        email:yup.string('is not email right form').required('email is required').email("is not right form "),
        age:yup.number().integer().required('age is required').min(15).positive(),
        password:yup.string().required('password is required').min(4).max(20),
        gender :yup.string().oneOf(['H','F']).required(),
        conpwd:yup.string().required().oneOf([yup.ref('password'),null],"confrom password doesn't match with password")
    });
    const {handleSubmit,register,formState:{errors}}=useForm({resolver:yupResolver(schema)});

    const handleForm=(data)=>{
        createAccount(data);
    }

    return (
    <>
    <div className="container box">
        <h1 className="text-center">Sign Up</h1>
        <form  onSubmit={handleSubmit(handleForm)}>
            <div className="row">
                <label>Full Name :</label>
                <input type="text" placeholder="aziz .." {...register("name")} />
                <span className="text-danger">{errors.name?.message}</span>
            </div>
            <div className="row">
                <label>Email :</label>
                <input type="text" placeholder="exemple@gmail.com" {...register("email")} />
                <span className="text-danger">{errors.email?.message}</span>
            </div>
            <div className="row">
                <label>Age :</label>
                <input type="number" placeholder="15>=" {...register("age")} />
                <span className="text-danger">{errors.age?.message}</span>
            </div>
            <div className="row">
                <label>Password :</label>
                <input type="password"  {...register("password")} />
                <span className="text-danger">{errors.password?.message}</span>
            </div>
            <div className="row">
                <label>Confirm Password :</label>
                <input type="password"  {...register("conpwd")} />
                <span className="text-danger">{errors.conpwd?.message}</span>
            </div>
            <div className="row">
                <label>Gender :</label>
                <div className=" fs-4 radio">
                <input type="radio" name='gender' value="H" {...register("gender")} />H 
                <input type="radio" name='gender' value="F" {...register("gender")} />F 
                </div>
                <span className="text-danger">{errors.gender?.message}</span>
            </div>
                <button type='submit' className='btn btn-secondary'>Sign Up</button>
                <Link to='/' className="link_s">you have account , click here to login</Link>
        </form>
    </div>
    </>
    )
}

export default Signup