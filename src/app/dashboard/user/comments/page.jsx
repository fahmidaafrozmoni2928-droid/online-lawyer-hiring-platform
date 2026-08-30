"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);


 
 const handleDeleteButton = async (id) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this comment?"
  );

  if (!confirmDelete) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();

  if (data.deletedCount > 0) {
    alert("Comment deleted");

    const remaining = comments.filter(
      (comment) => comment._id !== id
    );

    setComments(remaining);
  }
};

const handleEditButton = async (comment) => {
  const updatedComment = prompt(
    "Update your comment",
    comment.comment
  );

  if (!updatedComment) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${comment._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: updatedComment,
      }),
    }
  );

  const data = await res.json();

  if (data.modifiedCount > 0) {
    alert("Comment updated");

    const updated = comments.map((item) =>
      item._id === comment._id
        ? { ...item, comment: updatedComment }
        : item
    );

    setComments(updated);
  }
};


  useEffect(() => {
    const loadComments = async () => {
      const { data: session } = await authClient.getSession();

      if (!session?.user?.email) ;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${session.user.email}`
      );

      const data = await res.json();

      setComments(data);
      setLoading(false);
      return
    };

    loadComments();
  }, []);


  
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-5">
        My Comments
      </h2>

      {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Lawyer</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.lawyerName}</td>
                <td>{item.comment}</td>
                <td>{item.createdAt}</td>

                <td>
                  <button onClick={() => handleEditButton(item)} className="btn btn-sm btn-info mr-2">
                    Edit
                  </button>

                  <button onClick={() => handleDeleteButton(item._id)}  className="btn btn-sm btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}