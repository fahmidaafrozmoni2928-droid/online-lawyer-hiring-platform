"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function HiringHistoryPage() {
  const [hirings, setHirings] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

const handlePayButton = async (hire) => {

  console.log("Hire Object:",hire);
  console.log("Fee",hire.consultationFee);
   const { data: session } = await authClient.getSession();
  const res = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hiringId: hire._id,
      lawyerId: hire.lawyerId,
      lawyerName: hire.lawyerName,
      consultationFee: hire.consultationFee,
      userEmail: session?.user?.email,
    }),
  });

  const data = await res.json();

  console.log(data);

  if (data.url) {
    window.location.href = data.url;
  }
};
  useEffect(() => {
    const loadHiringHistory = async () => {
      const { data: session } = await authClient.getSession();

      if (!session?.user?.email) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/hirings/user/${session.user.email}`
      );

      const data = await res.json();

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
                <th>Lawyer Name</th>
                <th>Specialization</th>
                <th>Fee</th>
                <th>Hiring Date</th>
                <th>Status</th>
                <th>Pay</th>
              </tr>
            </thead>

            <tbody>
              {hirings.map((hire, index) => (
                <tr key={hire._id}>
                  <td>{index + 1}</td>
                  <td>{hire.lawyerName}</td>
                  <td>{hire.specialization}</td>
                  <td>${hire.consultationFee}</td>
                  <td>{hire.hiringDate}</td>
                  <td>
                    <span
                      className={`badge ${
                        hire.status === "accepted"
                          ? "badge-success" 
                          : hire.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {hire.status}
                    </span>
                  </td>

                  <td>
  {hire.status === "accepted" ? (
    <button  onClick={() => handlePayButton(hire)}
      className="btn btn-primary "
      disabled={hire.paymentStatus === "Paid"}
    >
      {hire.paymentStatus === "Paid" ? "Paid" : "Pay"}
    </button>
  ) : (
    "-"
  )}
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