"use client";

import { authClient } from "@/lib/auth-client";
import { isRouteMethod } from "better-auth/react";
import { useEffect, useState } from "react";

export default function HiringHistoryPage() {
  const [hirings, setHirings] = useState([]);
  const [loading, setLoading] = useState(true);

 
   const handleAcceptButton = async (id) => {
 
   const res = await fetch(
      `http://localhost:8000/hirings/accept/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "accepted"
        }),
      }
    );


 

 
};

 const handleRejectButton = async (id) => {
 
   const res = await fetch(
      `http://localhost:8000/hirings/reject/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "rejected"
        }),
      }
    );


 

 
};


  useEffect(() => {
    const loadHiringHistory = async () => {
      const { data: session } = await authClient.getSession();

      if (!session?.user?.email) return;

      console.log(session.user.email);

      const res = await fetch(
        `http://localhost:8000/hirings/lawyer/${session.user.email}`
      );

      const data = await res.json();
console.log(data);
      setHirings(data);
      setLoading(false);
    };

    loadHiringHistory();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Hiring History
      </h2>

      {hirings.length === 0 ? (
        <p className="text-center text-gray-500">
          No hiring history found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                
                <th>Request Date</th>
                 <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {hirings.map((hire, index) => (
                <tr key={hire._id}>
                  <td>{index + 1}</td>
                  <td>{hire.userName}</td>
                  <td>{hire.hiringDate}</td>
                  
<td>
        <button onClick={() => handleAcceptButton(hire._id)}
        
          className="btn btn-success btn-sm"
        >
          Accept
        </button>

        <button  onClick={() => handleRejectButton(hire._id)}
        
          className="btn btn-error btn-sm ml-2"
        >
          Reject
        </button>
      </td>
                   
                    
                  
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}