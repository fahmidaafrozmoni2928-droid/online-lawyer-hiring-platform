'use client'

import { authClient } from "@/lib/auth-client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const lawyerDetailsPage = () => {
  const { id } =  useParams();
  const [lawyer, setLawyer] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
     setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/lawyers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
setLawyer(data);
 setLoading(false);
      })
  }, [id]);


  const handleHireButton = async () => {
  const { data: session } = await authClient.getSession();

  const hiringData = {
    userEmail: session?.user?.email || '',
    userName: session?.user?.name || '',
 lawyerEmail: lawyer.email,
    lawyerId: lawyer._id,
    lawyerName: lawyer.name,
   
    specialization: lawyer.specialization,
    consultationFee: lawyer.consultationFee,

    hiringDate: new Date().toLocaleDateString(),
  };
  console.log(hiringData);

 
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hirings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hiringData),
  });

  const data = await res.json();

  if (data.insertedId) {
    toast.success("Lawyer hired successfully");
  }
};

 const handleCommentForm = async (e) => {
  e.preventDefault();

  const { data: session } = await authClient.getSession();

  const commentData = {
     
    lawyerId: lawyer._id,
    lawyerName: lawyer.name,

    userEmail: session?.user?.email || '',
    userName: session?.user?.name || '',

    comment: e.target.comment.value,

    createdAt: new Date().toLocaleDateString(),
  };

  console.log(commentData);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  const data = await res.json();

  if (data.success) {
    toast.success("Comment added successfully");
    e.target.reset();
  } else {
    alert(data.message);
  }
};

if(!lawyer){
  return <div className="text-center mt-10">Loading lawyer details...</div>
}
  

  return (

     <div className="max-w-7xl mx-auto mt-8">
  {loading ? (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="h-72 bg-gray-200 rounded-xl animate-pulse"
        ></div>
      ))}
    </div>
  ) : lawyer.length === 0 ? (
    <div className="text-center">
      <h2 className="text-2xl font-bold">No lawyer found</h2>
     
    </div>
  ) : (
      <div className="mx-auto mt-10">
    <div className="p-2 rounded-lg shadow-sm bg-base-100">
      <img src={lawyer?.photo} alt={lawyer?.name} className="w-full h-72 object-contain rounded" />
      <h1 className="font-bold text-xl">{lawyer?.name}</h1>
      <p>Specialization:{lawyer?.specialization}</p>
      <p>Bio:{lawyer?.bio}</p>
      <p>Date Joined:{lawyer?.dateJoined}</p>
      <p>Experience:{lawyer?.experience}</p>
      <p>Location:{lawyer?.location}</p>
      <p>Email:{lawyer?.email}</p>
      <p>Phone:{lawyer?.phone}</p>
      <p>Rating:{lawyer?.rating}</p>
      <p>Consultation Fee:{lawyer?.consultationFee}</p>
      <p>Status: {lawyer?.status}</p>
      <button onClick={handleHireButton} className="btn bg-blue-400 text-white mt-4">Hire Now</button>
      <form onSubmit={handleCommentForm} className="mt-8">
  <textarea
    name="comment"
    className="textarea textarea-bordered w-full"
    placeholder="Write your comment..."
    required
  ></textarea>

  <button className="btn btn-primary mt-4">
    Submit Comment
  </button>
</form>
    </div>
    </div>
  )}
</div>




      
    
  );
};

export default lawyerDetailsPage;