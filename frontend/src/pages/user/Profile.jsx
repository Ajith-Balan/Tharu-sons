import React, { useState } from 'react';
import UserMenu from '../../components/layout/UserMenu';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: auth?.user?.name || '',
    email: auth?.user?.email || '',
    phone: auth?.user?.phone || '',
    password: '',
    address: auth?.user?.address || '',
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    // Add validation logic if needed
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.put(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/profile`, formData);
      if (res?.data?.error) {
        toast.error(res?.data?.error);
      } else {
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: res?.data?.updatedUser,
        }));
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Your Profile'}>
      <UserMenu />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 rounded">
            <div className="flex justify-center items-center">
              <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                      placeholder="Generate a new password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Address Field */}
                  <div>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-200"
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
