import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate(); // For navigation

  // Fetch the product whenever the `id` changes
  useEffect(() => {
    getProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
  }, [id]); // Re-run when `id` changes

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/product/getone-product/${id}`
      );
      setProduct(res.data);
      setSelectedImage(res.data.photo); // Set default image
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Fetch related products by category
  useEffect(() => {
    if (product.category) {
      getProductByCategory();
    }
  }, [product.category]);

  const getProductByCategory = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/api/v1/product/product-category/${product.category}`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const images = [
    product.photo,
    product.photo2,
    product.photo3,
    product.photo4,
    product.photo5,
  ].filter(Boolean); // Filter out any undefined or null values

  return (
    <Layout>
      <div className="container mx-auto p-4 mt-5 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Image Section */}
        <div className="w-full  max-w-xl mx-auto">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[600px] rounded-lg object-cover"
          />
          {/* Thumbnails */}
          <div className="flex mt-4 gap-2 overflow-x-auto">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`h-20 w-20 object-cover cursor-pointer rounded-lg ${
                  img === selectedImage ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => handleThumbnailClick(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-4">
          <hr className="border-gray-300" />
          <h6 className="text-lg md:text-2xl font-semibold">{product.name}</h6>
          <p className="text-sm md:text-base">{product.size}</p>
          <p className="text-gray-700 text-sm md:text-base">{product.description}</p>
          <div className="flex gap-2 mt-2 items-center">
            <h3 className="text-red-500 line-through text-sm md:text-lg">
              ₹{product.MRP}
            </h3>
            <h2 className="text-xl text-green-600 font-bold">
              ₹{product.price}
            </h2>
          </div>
          {product.MRP > product.price && (
            <div className="text-md text-green-500 font-semibold">
              {Math.round(((product.MRP - product.price) / product.MRP) * 100)}% off
            </div>
          )}

          {/* Add to Cart and Buy Now Buttons */}
          <div className="w-full flex fixed bottom-0 left-0 right-0 shadow-lg bg-white">
            <button
              className="bg-gray-700 text-white w-1/2 py-3 hover:bg-gray-600 transition"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem('cart', JSON.stringify([...cart, product]));
                toast.success('Item added to cart');
              }}
            >
              Add to Cart
            </button>
            <Link
              className="bg-blue-500 text-center text-white w-1/2 py-3 hover:bg-blue-400 transition"
              to={`/dashboard/user/payment/${product._id}`}
            >
              Buy Now
            </Link>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-lg font-semibold mb-4">Related Products</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div
                  onClick={() => navigate(`/product/${p._id}`)} // Navigate to the related product
                  className="cursor-pointer"
                >
                  <div className="w-full h-60 lg:h-80">
                    <img
                      src={p.photo}
                      className="w-full h-full object-cover"
                      alt={p.name}
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                    <div className="flex items-center justify-between mt-2">
                      <h2 className="text-xl text-green-600 font-bold">
                        ₹{p.price.toLocaleString('en-US')}
                      </h2>
                      <h3 className="text-red-500 line-through">₹{p.MRP}</h3>
                    </div>
                    {p.MRP > p.price && (
                      <div className="text-sm text-green-500 font-semibold mt-1">
                        {Math.round(((p.MRP - p.price) / p.MRP) * 100)}% off
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
