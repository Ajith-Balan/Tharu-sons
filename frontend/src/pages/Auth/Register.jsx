import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/register`, formData);
      if (res.status === 201) {
        toast.success('Registered successfully');
        setTimeout(() => {
            navigate('/login');
          }, 1000);
      }else if(res.status === 200){
        toast.error('Already Register please login');

      }
       else {
        toast.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div>
      <Layout title={'Register E-commerce app'}>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-8">Register</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Optional Address Field */}
              <div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full address (Optional)"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
              </button>
              <div>
                <p>Already a user? <Link className="text-blue-600 underline" to={'/login'}>sign in</Link></p>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Register;
