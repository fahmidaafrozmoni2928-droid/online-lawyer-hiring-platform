"use client";

import { useEffect, useState } from "react";


export default function AdminUsersTable() {
  const [users, setUsers] = useState([]);

  const handleRoleChange = async (id, role) => {
    const res = await fetch(`http://localhost:8000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({role}),
    });
    const data = await res.json();

    if(data.modifiedCount > 0) {
      setUsers((prev) => prev.map((user) => user._id === id ? {...user, role} : user

      )

      );
    }
  };

   const handleDeleteButton = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this data?"
    );
  
    if (!confirmDelete) return;
  
    const res = await fetch(
      `http://localhost:8000/users/${id}`,
      {
        method: "DELETE",
      }
    );
  
    const data = await res.json();
  
    if (data.deletedCount > 0) {
      alert("Data deleted");
  
      const remaining = users.filter(
        (users) => users._id !== id
      );
  
      setUsers(remaining);
    }
  };

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, []);

  return (
    <div className="overflow-x-auto bg-base-100 rounded-xl shadow-md">
      <table className="table">
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-5">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-secondary"
                        : user.role === "organizer"
                        ? "badge-primary"
                        : "badge-success"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                 <select onChange={(e) => handleRoleChange(user._id, e.target.value)} defaultValue={user.role}>
                  <option value="user">User</option>
                  <option value="lawyer">Lawyer</option>
                  <option value="admin">Admin</option>
                 </select>
                </td>

                <td onClick={() => handleDeleteButton(user._id)} >Delete</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
