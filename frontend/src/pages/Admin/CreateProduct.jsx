import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu'; // Corrected import casing
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
  
    category: '',
  });

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Create product
  const handleCreate = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!product.name || !product.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/create-product`, product);
      if (data?.success) {
        toast.success(data?.message);
      setProduct({
         name: '',
   
    category: '',
      })
      } else {
        toast.error(data?.message || 'Product creation failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while creating the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mx-auto py-6 px-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-6 md:mb-0">
            <AdminMenu />
          </div>
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Create Site place</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <select
                  name="category"
                  value={product.category}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a State</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  placeholder="Product name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
         
     

              

            
              
          

         


           

              <div>
                <button
                  className={`w-full py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition duration-300`}
                  onClick={handleCreate}
                  disabled={loading} // Disable button during loading
                >
                  {loading ? 'Creating...' : 'CREATE SITE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
