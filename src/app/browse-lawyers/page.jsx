'use client'
import Card from "@/components/Card";
import Link from "next/link";
import { useEffect, useState } from "react";

const browseLawyersPge = () => {
  const [lawyers, setLawyers] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(true);
   useEffect(() => {
     setLoading(true);
    fetch(`http://localhost:8000/lawyers?search=${search}`)
      .then((res) => res.json())
      .then((data) => setLawyers(data));
       setLoading(false);
  }, [search]);


   useEffect(() => {
     setLoading(true);
    fetch(`http://localhost:8000/lawyers?specialization=${specialization}`)
      .then((res) => res.json())
      .then((data) => setLawyers(data));
       setLoading(false);
  }, [specialization]);
  

 

  return (
    <div>
        <div className="mt-5">
        <h1 className="font-bold text-2xl text-center">All Lawyers</h1>
        </div>
        <div className="flex justify-center items-center gap-8">
             <div>
                  <form className="flex">
              <input
                type="text"
                placeholder="Search lawyers..."
                value={search}
                 onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none"
              />
             
            </form>

     </div>
     <div>

            <select className="border rounded-lg"  value={specialization}
                 onChange={(e) => setSpecialization(e.target.value)}>
                <option value="">All</option>
                <option value="Criminal Law">Criminal</option>
                <option value="Family Law">Family</option>
                <option value="Corporate Law">Corporate</option>
            </select>
            </div>

        </div>

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
  ) : lawyers.length === 0 ? (
    <div className="text-center">
      <h2 className="text-2xl font-bold">No lawyer found</h2>
     
    </div>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {lawyers.map((lawyer) => (
        <Link
          href={`/browse-lawyers/${lawyer._id}`}
          key={lawyer._id}
        >
          <Card lawyer={lawyer} />
        </Link>
      ))}
    </div>
  )}
</div>

  
    </div>
    
  );
};
export default browseLawyersPge;