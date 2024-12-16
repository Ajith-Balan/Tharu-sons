import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateType = () => {
  const [categories, setCategories] = useState([]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    site: '',
    category: '',
  });
  const [names, setNames] = useState(['']); // Array of names, initially one empty input

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong in getting categories');
    }
  };

  // Fetch sites for the selected category
  const getSitesByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/product/product-category/${product.category}`
      );
      if (data?.success) {
        setSites(data?.products);
      } else {
        toast.error('Failed to fetch sites');
        setSites([]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong in getting sites');
      setSites([]);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (product.category) {
      getSitesByCategory();
    } else {
      setSites([]);
    }
  }, [product.category]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle name input changes
  const handleNameChange = (index, value) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  // Add new name input
  const addNameField = () => {
    setNames([...names, '']);
  };

  // Add site for all names
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!product.category || !product.site) {
      toast.error('Please select a category and a site');
      return;
    }

    setLoading(true);

    for (const name of names) {
      if (!name.trim()) continue; // Skip empty names
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/cat/create-cat`, {
          name,
          category: product.category,
          site: product.site,
        });
        if (data?.success) {
          toast.success(`Product "${name}" added successfully!`);
        } else {
          toast.error(data?.message || `Failed to add "${name}"`);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || `Something went wrong while adding "${name}"`);
      }
    }

    setLoading(false);
    setNames(['']); // Reset name fields after submission
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="container mx-auto py-6 px-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-6 md:mb-0">
            <AdminMenu />
          </div>
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Create Type</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <select
                  name="category"
                  value={product.category}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a Category
                  </option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Site</label>
                <select
                  name="site"
                  value={product.site}
                  className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none ${
                    product.category
                      ? 'focus:ring-2 focus:ring-blue-500'
                      : 'bg-gray-100 cursor-not-allowed'
                  }`}
                  onChange={handleChange}
                  disabled={!product.category}
                >
                  <option value="" disabled>
                    {product.category ? 'Select a Site' : 'Select a Category first'}
                  </option>
                  {sites.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                {names.map((name, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder="Enter Category name"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {index === names.length - 1 && (
                      <button
                        type="button"
                        onClick={addNameField}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <button
                  className={`w-full py-2 text-white rounded-lg ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-500'
                  }`}
                  onClick={handleAddProduct}
                  disabled={loading || !product.category || !product.site || names.every((name) => !name.trim())}
                >
                  {loading ? 'Adding...' : 'ADD SITE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateType;
