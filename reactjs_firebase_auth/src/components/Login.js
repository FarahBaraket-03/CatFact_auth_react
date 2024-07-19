import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import {signInWithEmailAndPassword}from 'firebase/auth';
import {auth} from '../Firebase_config';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Login=()=>{
    const schema=yup.object().shape({
        email:yup.string('is not email right form').required('email is required').email("is not right form "),
        password:yup.string().required('password is required').min(4).max(20),
    });

    const {handleSubmit,register,formState:{errors}}=useForm({resolver:yupResolver(schema)});

    const handleForm=(data)=>{
        signInWithEmailAndPassword(auth,data.email,data.password).then(()=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "You have logged in",
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

    return (
    <>
    <div className="container box">
        <h1 className="text-center">LogIn</h1>
        <form  onSubmit={handleSubmit(handleForm)}>
            <div className="row">
                <label>Email :</label>
                <input type="text" placeholder="exemple@gmail.com" {...register("email")} />
                <span className="text-danger">{errors.email?.message}</span>
            </div>
            <div className="row">
                <label>Password :</label>
                <input type="password"  {...register("password")} />
                <span className="text-danger">{errors.password?.message}</span>
            </div>
                <button type='submit' className='btn btn-danger'>Login</button>
                <Link to='/signup' className="link_s">don't have account , click here to sign Up</Link>
        </form>
    </div>
    </>)
}

export default Login