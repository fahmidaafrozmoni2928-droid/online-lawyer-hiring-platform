'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const lawyerDetailsPage = () => {
  const { id } =  useParams();
  const [lawyer, setLawyer] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
     setLoading(true);
    fetch(`http://localhost:8000/lawyers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
setLawyer(data);
 setLoading(false);
      })
  }, [id]);

  

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
      <p>Specialization:{lawyer.specialization}</p>
      <p>Bio:{lawyer?.bio}</p>
      <p>Date Joined:{lawyer.dateJoined}</p>
      <p>Experience:{lawyer.experience}</p>
      <p>Location:{lawyer.location}</p>
      <p>Email:{lawyer.email}</p>
      <p>Phone:{lawyer.phone}</p>
      <p>Rating:{lawyer.rating}</p>
      <p>Consultation Fee:{lawyer?.consultationFee}</p>
      <p>Status: {lawyer?.status}</p>
      <p></p>
    </div>
    </div>
  )}
</div>




      
    
  );
};

export default lawyerDetailsPage;