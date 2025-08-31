import { useEffect, useState } from "react";
import axios from "axios";
import Preloader from "../components/Preloader";

const API = "http://localhost:5000/api";

interface Product { id: number; }
interface Blog { id: number; }
interface Order { id: number; }

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, blogs: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const prod = await axios.get<Product[]>(`${API}/products`);
        const blog = await axios.get<Blog[]>(`${API}/blogs`);
        const orders = await axios.get<Order[]>(`${API}/orders`).catch(() => ({ data: [] }));

        setStats({
          products: prod.data.length,
          blogs: blog.data.length,
          orders: orders.data.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Preloader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-4xl font-bold">{stats.products}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-500">Blogs</h2>
          <p className="text-4xl font-bold">{stats.blogs}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-4xl font-bold">{stats.orders}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
