import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';
import AdminMenu from '../../components/layout/AdminMenu.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true); // Start loading
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/get-product`);
      setProducts(data);
      setLoading(false); // Stop loading
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
      setLoading(false); // Stop loading on error
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4">
          <h1 className="text-center text-2xl font-bold mb-6">All Products List</h1>

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <div className="w-16 h-16 border-t-4 border-l-4 border-red-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products?.map((p) => (
                <div key={p._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Link to={`/dashboard/admin/update-product/${p._id}`}>
                    <div className="w-full h-48">
                      <img
                        src={p.photo}
                        className="w-full h-full object-cover"
                        alt={p.name}
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                      <p className="text-gray-600">{p.description}</p>
                      <h2 className="text-xl font-bold mt-2">
                        ₹{p.price.toLocaleString('en-US')}
                      </h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
