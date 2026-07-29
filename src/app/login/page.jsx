'use client';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const loginPage = () => {
    const router = useRouter();

    const onSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        console.log(user);

        const {data, error} = await authClient.signIn.email({
            email: user.email,
            password: user.password,
           
        });


     if(error) {
            toast.error("something went wrong");
            return;
        }

        toast.success("Login Successful")

         console.log({data, error});


        if(data?.user?.role === "user"){
            router.push("/");
        }else if (data?.user?.role === "lawyer"){
            router.push("/dashboard/lawyer");
        } else if (data?.user?.role === "admin") {
            router.push("/dashboard/admin/manage-users")
        } 
       

      //  const { data: tokenData } = await authClient.token()
      //  console.log(tokenData);

       
       
    };

      const handleGoogleLogin = async() => {
            await authClient.signIn.social({
               provider: "google"
            })
        }
    return(
        
        <div className="max-w-7xl mx-auto  ">
            
<h1 className="font-bold text-2xl flex justify-center items-center">Login</h1>
            
        
            
            <form onSubmit={onSubmit} className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">

                
  

  <label className="font-semibold">Email</label>
  <input type="email" name="email" className="input" placeholder="Email" required/>

  

  <label className="font-semibold">Password</label>
  <input type="password" name="password" className="input" placeholder="Password" required/>

  <button type="submit" className="btn bg-blue-400 text-white mt-4">Login</button>

  
</form>

<div className="flex justify-center items-center text-gray-500">
    OR
</div>
<div>
    <button onClick={handleGoogleLogin} className="btn bg-white text-black mt-4 w-full"><FcGoogle /> Continue with Google</button>
</div>
<div className="flex justify-center items-center">
 <p className="text-gray-500">Don't have an account?<Link href={"/login"}>Register</Link></p>
 </div>
        </div>
        
    )
}
export default loginPage;