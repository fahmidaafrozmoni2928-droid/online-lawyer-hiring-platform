
 
"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateProfilePage() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: session } = await authClient.getSession();

      if (!session?.user?.email) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${session.user.email}`
      );

      const data = await res.json();
      setProfile(data);
    };

    loadProfile();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const updatedUser = {
    name: form.name.value,
    image: form.image.value,
  };

  const { data: session } = await authClient.getSession();

  if (!session?.user?.email) {
    alert("User not found");
    return;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/${session.user.email}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    }
  );

  const data = await res.json();

  if (res.ok && data.modifiedCount > 0) {
    alert("Profile updated successfully!");

    setProfile((prev) => ({
      ...prev,
      ...updatedUser,
    }));
  } else {
    alert(data.message || "No changes were made.");
  }
};



   

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            defaultValue={profile.name}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-medium">Profile Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={profile.image}
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
}

