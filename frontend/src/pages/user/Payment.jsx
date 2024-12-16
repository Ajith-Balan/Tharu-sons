import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth';
import qr from '../../../src/assets/paymentqr.jpeg';

const Payment = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const { id } = useParams();
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [phase, setPhase] = useState(1); // Control for phase transitions

  const [state, setState] = useState({
    productName: '',
    productPrice: '',
    productphoto: '',
    productDescription: '',
    quantity: 1,
    totalPrice: 0,
    userName: auth?.user?.name || '',
    userid: auth?.user?._id || '',
    userPhone: auth?.user?.phone || '',
    user2Phone: '',
    userAddress: auth?.user?.address || '',
    size: '',
    loading: true,
  });

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (state.productPrice && state.quantity) {
      setState(prevState => ({
        ...prevState,
        totalPrice: prevState.productPrice * prevState.quantity,
      }));
    }
  }, [state.productPrice, state.quantity]);

  const getProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/getone-product/${id}`);
      const product = res.data;

      setSizes(product.size ? product.size.split('/') : []);
      setState(prevState => ({
        ...prevState,
        productName: product.name,
        productphoto: product.photo,
        productDescription: product.description,
        productPrice: product.price,
        size: product.size || '',
        loading: false,
        totalPrice: product.price * prevState.quantity,
      }));
    } catch (error) {
      console.error(error);
      setState(prevState => ({ ...prevState, loading: false }));
      toast.error('Failed to load product details');
    }
  };

  const handleQuantityChange = (operation) => {
    setState(prevState => {
      const newQuantity = operation === 'increase'
        ? prevState.quantity + 1
        : Math.max(prevState.quantity - 1, 1);
      return {
        ...prevState,
        quantity: newQuantity,
        totalPrice: prevState.productPrice * newQuantity,
      };
    });
  };

  const handleScreenshotChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error('File size exceeds 2MB limit');
      return;
    }
    setPhoto(await convertToBase64(file));
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/orders`, { state, photo });
      if (res.data.success) {
        toast.success('Order confirmed!');
        setTimeout(() => navigate(`/dashboard/user/orders/${auth.user._id}`), 1000);
      } else {
        toast.error(res.data.message || 'Failed to confirm order');
      }
    } catch (error) {
      console.error('Order confirmation failed:', error);
      toast.error('Failed to confirm order');
    } finally {
      setLoading(false);
    }
  };

  const TotalPriceHeader = () => (
    <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold">Total Amount:</h2>
      <p className="text-xl font-semibold">₹{state.totalPrice}</p>
    </div>
  );

  const renderPhaseOne = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Product Details</h2>
      <img src={state.productphoto} alt={state.productName} className="mb-4" />
      <p>{state.productDescription}</p>

      <label className="block mt-4">Select Size</label>
      <select
        className="w-full border px-3 py-2 rounded mt-2"
        value={state.size}
        onChange={e => setState({ ...state, size: e.target.value })}
      >
        <option value="">Select a size</option>
        {sizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>

      <div className="mt-4">
        <button className='px-3 py-2 bg-gray-300 text-gray-700 rounded-r focus:outline-none' onClick={() => handleQuantityChange('decrease')}>-</button>
        <span className="w-16 text-center px-3 py-2 border-t border-b shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">{state.quantity}</span>
        <button className='px-3 py-2 bg-gray-300 text-gray-700 rounded-r focus:outline-none' onClick={() => handleQuantityChange('increase')}>+</button>
      </div>

      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={() => setPhase(2)}>
        Next: Enter Address
      </button>
    </div>
  );

  const renderPhaseTwo = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
      <input
        type="text"
        placeholder="Enter your full Address"
        className="w-full border px-3 py-2 rounded mb-4"
        value={state.userAddress}
        onChange={e => setState({ ...state, userAddress: e.target.value })}
      />
      <input
        type="number"
        placeholder="Alternative Phone(optional)"
        className="w-full border px-3 py-2 rounded mb-4"
        value={state.user2Phone}
        onChange={e => setState({ ...state, user2Phone: e.target.value })}
      />
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setPhase(3)}>
        Next: Payment
      </button>
    </div>
  );

  const renderPhaseThree = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment</h2>
      <div className="mb-2">
      <div className="mb-2">
        <img 
          src={qr} // Replace with the actual path to your QR code image
          alt="Payment QR Code"
          className="w-32 h-32"
        />
      </div>
      <div className="mb-2">
        <p className="font-medium">Name : <span className="font-light">CJ ATTIRE</span></p>
      </div>
      <div className="mb-2">
        <p className="font-medium">Bank  :<span className="font-light">Union Bank of India</span></p>
      </div>
      <div className="mb-2">
        <p className="font-medium">Account Number: <span className="font-light">339502120000315</span></p>
      </div>
      
      <div className="mb-2">
        <p className="font-medium">IFSC Code: <span className="font-light">UBINO533955</span></p>
      </div>
      
      <div>
        <p className="text-sm text-gray-500">Scan the QR code or use the account details above for payment.</p>
      </div>
            </div>
      {photo && <img src={photo} alt="Payment Screenshot" className="w-1/4 mt-4 mb-2 rounded" />}
      {/* Payment Details */}
      <div className="w-full mb-4">
  <label htmlFor="file-upload" className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg">
    <input id="file-upload" type="file" onChange={handleScreenshotChange} className="hidden" />
    <span className="text-gray-500 font-semibold flex items-center space-x-2">
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 9m0 0l9-9m-9 9V3"></path>
      </svg>
      <span>Upload Payment Screenshot</span>
    </span>
  </label>
</div>
      <button
        onClick={handleConfirm}
        disabled={loading}
        className={`w-full px-4 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-red-500 text-white'}`}
      >
        {loading ? 'Confirming...' : 'Confirm Order'}
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <TotalPriceHeader />
        {phase === 1 && renderPhaseOne()}
        {phase === 2 && renderPhaseTwo()}
        {phase === 3 && renderPhaseThree()}
      </div>
    </Layout>
  );
};

export default Payment;
