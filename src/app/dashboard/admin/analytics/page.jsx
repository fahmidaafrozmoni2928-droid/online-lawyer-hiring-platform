"use client";

import { useEffect, useState } from "react";

export default function Analytics() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/analytics`)
      .then((res) => res.json())
      .then((data) => setAnalytics(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2>Total Users</h2>
          <p className="text-3xl font-bold">
            {analytics.totalUsers}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2>Total Lawyers</h2>
          <p className="text-3xl font-bold">
            {analytics.totalLawyers}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2>Total Hires</h2>
          <p className="text-3xl font-bold">
            {analytics.totalHires}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2>Total Revenue</h2>
          <p className="text-3xl font-bold">
            ${analytics.totalRevenue}
          </p>
        </div>
      </div>
    </div>
  );
}
