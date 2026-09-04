'use client';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const registerPage = () => {
    const router = useRouter();

    const onSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        console.log(user);

        const {data, error} = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
            role: user.role,
        })

        console.log("Data:", data);
console.log("Error:", error);

        
        console.log({data, error});

          if (user.password !== user.confirmPassword) {
    return toast.error("Passwords do not match");
}

        if(data){
            router.push("/")
        }

        if(error) {
            toast.error("something went wrong")
        }

        toast.success("Register Successful")

      


         if(data?.user?.role === "user"){
            router.push("/");
        }else if (data?.user?.role === "lawyer"){
            router.push("/");
        } else if (data?.user?.role === "admin") {
            router.push("/")
        } 
    };

   const handleGoogleRegister = async() => {
        await authClient.signIn.social({
            provider: "google"
        })
    }
    return(
        
        <div className="max-w-7xl mx-auto  ">
            
<h1 className="font-bold text-2xl flex justify-center items-center">Register</h1>
            <p className="text-gray-500 flex justify-center items-center">Create your account</p>
        
            
            <form onSubmit={onSubmit} className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">

                 <label className="font-semibold">Name</label>
  <input type="text" name="name" className="input" placeholder="Name" required/>
  

  <label className="font-semibold">Email</label>
  <input type="email" name="email" className="input" placeholder="Email" required />

   <label className="font-semibold">Photo URL</label>
  <input type="text" name="image" className="input" placeholder="Photo URL" />

  <label className="font-semibold">Password</label>
  <input type="password" name="password" className="input" placeholder="Password" required/>

  <label className="font-semibold">Confirm Password</label>
  <input type="password" name="confirmPassword" className="input" placeholder="Password" required/>


  <label className="font-semibold" >Register As</label>
  <select name="role" className="select" >
    <option value="user">User</option>
    <option value="lawyer">Lawyer</option>
    <option value="admin">Admin</option>
  </select>

  <button type="submit" className="btn bg-blue-400 text-white mt-4">Register</button>

 
</form>
<div className="flex justify-center items-center text-gray-500">
    OR
</div>
<div>
    <button onClick={handleGoogleRegister} className="btn bg-white text-black mt-4 w-full"><FcGoogle /> Continue with Google</button>
</div>
<div className="flex justify-center items-center">
 <p className="text-gray-500">Already have an account?<Link href={"/login"}>Login</Link></p>
 </div>
        </div>
        
    )
}
export default registerPage;