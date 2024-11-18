import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBoxOpen } from "react-icons/fa";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const statusHandler = async (event, orderId) =>{
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {orderId, status:event.target.value}, {headers:{token}})

      if(response.data.success){
        await fetchAllOrders()
      }

    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  

  return (
    <div className="p-5">
      <h3 className="text-xl font-bold mb-4">Order Page</h3>
      <div className="grid gap-4">
        {orders.length > 0 ? (
          orders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="border border-gray-300 p-4 rounded-lg flex flex-col lg:flex-row items-start lg:items-center gap-4"
            >
              {/* Box Icon */}
              <div className="flex items-center gap-2">
                <FaBoxOpen size={24} className="text-gray-600" />
              </div>

              {/* Products, Name, Address */}
              <div className="flex-[2]">
                <p className="text-sm">
                  <span className="whitespace-nowrap">Order ID:</span>{" "}
                  <span className="ml-1 inline-block">{order._id}</span>
                </p>
                <p className="text-sm">
                  <strong>Name:</strong> {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-sm">
                  <strong>Address:</strong> {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country}, {order.address.zipCode}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {order.address.phone || "N/A"}
                </p>
                <div className="text-sm mt-2">
                  {order.items.map((item, itemIndex) => (
                    <p key={itemIndex}>
                      {item.name} x {item.quantity}
                    </p>
                  ))}
                </div>
              </div>

              {/* Number of Items, Method, Payment, Date */}
              <div className="flex-1 text-sm">
                <p>
                  <strong>Items:</strong>{" "}
                  {order.items.reduce((total, item) => total + item.quantity, 0)}
                </p>
                <p>
                  <strong>Method:</strong> {order.paymentMethod || "N/A"}
                </p>
                <p>
                  <strong>Payment:</strong> {order.payment ? "Done" : "Pending"}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* Amount */}
              <div className="flex-1 text-sm">
                <p>
                  <strong>Amount:</strong> {currency}
                  {order.amount}
                </p>
              </div>

              {/* Options */}
              <div className="flex-1">
                <label htmlFor={`order-status-${orderIndex}`} className="block font-semibold mb-1">
                  Order Status
                </label>
                <select
                onChange={(event)=>statusHandler(event, order._id)}
                  id={`order-status-${orderIndex}`}
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                  defaultValue="Order"
                  value={order.status}
                >
                  <option value="Order">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
