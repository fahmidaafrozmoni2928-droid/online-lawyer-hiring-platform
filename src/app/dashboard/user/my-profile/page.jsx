"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function myProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      
      const { data: session } = await authClient.getSession();

      if (!session?.user?.email) return;

      
      const res = await fetch(
        `http://localhost:8000/user/${session.user.email}`
      );

      const data = await res.json();

      setProfile(data);
    };

    loadProfile();
  }, []);

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6 mt-4">

     
      <h2 className="text-2xl font-bold mt-4">
        {profile.name}
      </h2>

      <p>{profile.email}</p>

      <p>Role: {profile.role}</p>

      <Link
        href="/dashboard/user/update-profile"
        className="btn btn-primary mt-5"
      >
        Update Profile
      </Link>

    </div>
  );
}