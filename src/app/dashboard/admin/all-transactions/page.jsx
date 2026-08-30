"use client";

import { useEffect, useState } from "react";

export default function AllTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-transactions`);
        const data = await res.json();

        setTransactions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-5">All Transactions</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            
            <th>Transaction ID</th>
            <th>User Email</th>
            <th>Lawyer Email</th>
            <th>Fee</th>
        
            <th>Paid Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction._id}>
              
              <td>{transaction.transactionId}</td>
              <td>{transaction.userEmail}</td>
              <td>{transaction.lawyerEmail}</td>
              <td>${transaction.consultationFee}</td>
              
              <td>
                {new Date(transaction.paidAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
