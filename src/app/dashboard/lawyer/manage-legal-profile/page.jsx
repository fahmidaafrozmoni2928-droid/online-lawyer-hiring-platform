"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function manageLegalProfilePage() {
   const [profile, setProfile] = useState(null);
  
    useEffect(() => {
      const loadProfile = async () => {
        
        const { data: session } = await authClient.getSession();
  
        if (!session?.user?.email) return;
  
        
        const res = await fetch(
          `http://localhost:8000/lawyers/email/${session.user.email}`
        );
  
        const data = await res.json();
  
        setProfile(data);
      };
  
      loadProfile();
    }, []);
  

 

 

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6 mt-4">

     
     

      <Link
        href="/dashboard/lawyer/update-manage-legal-profile"
        className="btn btn-primary mt-5"
      >
        Update Profile
      </Link>

    </div>
  );
}