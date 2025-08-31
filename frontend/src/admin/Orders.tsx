import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  user: string;
  total: number;
  status: string;
}

const API = "http://localhost:5000/api";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get<Order[]>(`${API}/orders`)
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td className="p-2 border">{o.id}</td>
              <td className="p-2 border">{o.user}</td>
              <td className="p-2 border">${o.total}</td>
              <td className="p-2 border">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
