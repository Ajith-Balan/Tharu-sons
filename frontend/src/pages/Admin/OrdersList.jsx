


import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import AdminMenu from '../../components/layout/AdminMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // Filter status state

  const getOrders = async () => {
    try {
      if (auth?.user?._id) {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/getorders`);
        setOrders(res.data.orders);

        const details = {};
        res.data.orders.forEach(order => {
          details[order._id] = {
            quantity: order.quantity,
            productName: order.productName,
            productphoto: order.productphoto,
            totalPrice: order.totalPrice,
            payment: order.payment,
            status: order.status,
            ss: order.photo, // Payment screenshot URL
            name: order.userName,
            userPhone: order.userPhone,
            userPhone2: order.user2Phone,
            userAddress: order.userAddress,
          };
        });
        setOrderDetails(details);
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      getOrders();
    }
  }, [auth?.user]);

  const handleRetry = () => {
    setError(null);
    getOrders();
  };

  const handleOrderChange = (orderId, field, value) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [orderId]: {
        ...prevDetails[orderId],
        [field]: value,
      },
    }));
  };

  const updateOrder = async (orderId) => {
    try {
      const updatedOrderDetails = orderDetails[orderId];
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/updateorder/${orderId}`, updatedOrderDetails);
      toast.success(res.data.message || 'Order updated successfully!');
      getOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update the order. Please try again.');
    }
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  // Filter orders based on the selected status
  const filteredOrders = filterStatus === 'All' ? orders : orders.filter(order => order.status === filterStatus);

  const statusOrder = ['pending', 'Shipped', 'Delivered', 'Cancelled'];
  const statusHighlightColors = {
    Shipped: 'bg-blue-300 text-black',
    Delivered: 'bg-green-300 text-black',
    Pending: 'bg-yellow-300 text-black',
    Cancelled: 'bg-red-300 text-black',
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <Layout title={"Your Orders"}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <AdminMenu />

      <div className="container mx-auto p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row">
         

          <div className="w-full lg:w-3/4 p-5 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">All Orders</h1>

            <div className="mb-4 w-full flex justify-center gap-1">
              {['All', 'pending', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2 py-2 text-sm w-full rounded-md font-semibold ${
                    filterStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {status}
                     </button>
              ))}
            </div>

            {error && (
              <div className="text-red-500 mb-4">
                {error} <button onClick={handleRetry} className="text-blue-500 underline">Retry</button>
              </div>
            )}

            {filteredOrders.length === 0 ? (
              <div className="text-center text-gray-500">No orders found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr>
                    <th className="border px-2 py-2"> </th>

                      <th className="border px-2 py-2">Product</th>
                      <th className="border px-2 py-2">Quantity</th>
                      <th className="border px-2 py-2">Amount</th>
                      <th className="border px-2 py-2">User Details</th>
                      <th className="border px-2 py-2">Payment</th>
                      <th className="border px-2 py-2">Status</th>
                      <th className="border px-2 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order,index) => (
                      <tr key={order._id}>
                         <td className="border px-2 py-2 text-center">
                        {index + 1}
                        </td>
                      <td className="border px-2 py-2">
                          <div className="font-semibold">{orderDetails[order._id]?.productName || order.productName}</div>
                          <img
                            src={orderDetails[order._id]?.productphoto || order.productphoto}
                            alt={order.productName}
                            className="w-16 h-16 object-cover rounded-md shadow-sm mt-2"
                          />
                        </td>
                        <td className="border px-2 py-2 text-center">
                          <input
                          readOnly
                            type="number"
                            value={orderDetails[order._id]?.quantity || order.quantity}
                            onChange={(e) => handleOrderChange(order._id, 'quantity', e.target.value)}
                            className="border rounded-md p-1 w-12 text-center focus:outline-none focus:ring focus:ring-blue-400"
                          />
                        </td>
                        <td className="border px-2 py-2 text-center">
                       
                          ₹{orderDetails[order._id]?.totalPrice || order.totalPrice}
                        </td>
                        <td className="border px-2 py-2 text-sm">
                        <div className="border px-2 py-2 text-sm">
  <p><span className="font-semibold"> </span> {orderDetails[order._id]?.name || order.userName}</p>
  <p><span className="font-semibold">  </span> {orderDetails[order._id]?.userPhone || order.userPhone}</p>
  <p><span className="font-semibold">  </span> {orderDetails[order._id]?.userPhone2 || order.user2Phone}</p>
  <p><span className="font-semibold"> </span> {orderDetails[order._id]?.userAddress || order.userAddress}</p>
</div>


                        </td>
                        <td className="border px-2 py-2 text-center">
                          <select
                            value={orderDetails[order._id]?.payment || order.payment}
                            onChange={(e) => handleOrderChange(order._id, 'payment', e.target.value)}
                            className="border rounded-md p-1 focus:outline-none focus:ring focus:ring-blue-400"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Failed">Failed</option>
                          </select>

                          {/* Payment screenshot */}
                          {orderDetails[order._id]?.ss && (
                            <img
                              src={orderDetails[order._id]?.ss}
                              alt="Payment Screenshot"
                              className="w-16 h-16 object-cover rounded-md shadow-sm mt-2 cursor-pointer"
                              onClick={() => openModal(orderDetails[order._id]?.ss)}
                            />
                          )}
                        </td>
                        <td className="border px-2 py-2 text-center">
                          <span className={`p-1 rounded-md ${statusHighlightColors[orderDetails[order._id]?.status || order.status] || ''}`}>
                            {orderDetails[order._id]?.status || order.status}
                          </span>
                          <select
                            value={orderDetails[order._id]?.status || order.status}
                            onChange={(e) => handleOrderChange(order._id, 'status', e.target.value)}
                            className="border rounded-md p-1 mt-1 focus:outline-none focus:ring focus:ring-blue-400"
                          >
                            {statusOrder.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border px-2 py-2 text-center">
                          <button
                            onClick={() => updateOrder(order._id)}
                            className="bg-blue-500 text-white rounded-md py-1 px-2 hover:bg-blue-600 transition duration-200"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for full-screen payment screenshot */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Payment Screenshot"
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <img src={modalImage} alt="Full-screen Payment Screenshot" className="max-w-full max-h-full" />
        <button onClick={closeModal} className="absolute top-5 right-5 text-white text-xl">X</button>
      </Modal>
    </Layout>
  );
};

export default OrdersList;
