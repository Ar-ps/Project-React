import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: number;
  title: string;
  createdAt: string;
}

const API = "http://localhost:5000/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get<Blog[]>(`${API}/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(b => (
            <tr key={b.id}>
              <td className="p-2 border">{b.id}</td>
              <td className="p-2 border">{b.title}</td>
              <td className="p-2 border">{new Date(b.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border">
                <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Blogs;
