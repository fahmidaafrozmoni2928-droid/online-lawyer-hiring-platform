"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateManageLegalProfilePage() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: session } = await authClient.getSession();

      if (!session?.user?.email) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers/email/${session.user.email}`
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
      photo: form.photo.value,
      bio: form.bio.value,
      specialization: form.specialization.value,
      consultationFee: form.consultationFee.value,
    };

    const { data: session } = await authClient.getSession();

    if (!session?.user?.email) {
      setError("User not found");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers/email/${session.user.email}`,
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
        setMessage("Profile updated successfully!");
        setError("");

        setProfile((prev) => ({
          ...prev,
          ...updatedUser,
        }));
      } else {
        setMessage("");
        setError(data.message || "No changes were made.");
      }
    } catch (error) {
      console.error(error);
      setMessage("");
      setError("Something went wrong. Please try again.");
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

      {message && (
        <div className="alert alert-success mb-4">
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            defaultValue={profile.name}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-medium">Profile Image URL</label>
          <input
            type="text"
            name="photo"
            defaultValue={profile.photo}
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="font-medium">Bio</label>
          <input
            type="text"
            name="bio"
            defaultValue={profile.bio}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-medium">Specialization</label>
          <input
            type="text"
            name="specialization"
            defaultValue={profile.specialization}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="font-medium">Fee</label>
          <input
            type="text"
            name="consultationFee"
            defaultValue={profile.consultationFee}
            className="input input-bordered w-full"
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
