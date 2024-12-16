import React from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/Auth'
import { useNavigate, Link } from 'react-router-dom'

const CartPage = () => {
  const [auth] = useAuth()
  const [cart, setCart] = useCart()
  const navigate = useNavigate()

  const totalPrice = () => {
    try {
      let total = cart.reduce((acc, item) => acc + item.price, 0);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      // Filter the cart and remove the item with the specific ID
      const myCart = cart.filter(item => {
        console.log(`Checking item with ID: ${item._id}`);  // Debugging line
        return item._id !== pid;  // Only return items that don't match the ID to be removed
      });
      setCart(myCart); // Update state with the new cart
      localStorage.setItem("cart", JSON.stringify(myCart)); // Persist the updated cart in local storage
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="p-6 mt-5 pt-8">
        <h1 className="text-2xl font-bold mb-4">{`Hello, ${auth?.token && auth?.user?.name}`}</h1>
        <h4 className="text-lg mb-4">
          {cart.length > 0
            ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart. ${auth?.token ? '' : 'Please login to checkout.'}`
            : 'Your cart is empty'}
        </h4>
      </div>

      <div className="w-full md:w-7/12 mx-auto">
        {cart.map((p) => (
          <div className="flex flex-row p-4 mb-4 bg-white rounded-lg shadow-lg border border-gray-200" key={p._id}>
            <div className="w-4/12">
            <Link to={`/product/${p._id}`}>

              <img
                src={p.photo}
                alt={p.name}
                className="w-full h-32 object-cover rounded-lg"
              />
                          </Link>

            </div>
            <div className="w-8/12 pl-4">
              <p className="text-lg font-semibold">{p.name}</p>
              <p className="text-sm text-gray-600">{p.description.substring(0, 30)}</p>
              <p className="text-lg font-medium">Price: ₹{p.price}</p>
              <Link to={`/dashboard/user/payment/${p._id}`} className="text-blue-600 hover:underline">
                Buy Now
              </Link>
            </div>
            <div className="ml-auto flex items-center">
              <button
                className="btn btn-danger bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => removeCartItem(p._id)} // Make sure the correct ID is passed here
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <h2 className="text-xl font-bold mb-4">Total: {totalPrice()}</h2>

        {auth?.user?.address ? (
          <div className="mb-3">
            <h4 className="font-medium">Current Address</h4>
            <h5>{auth.user.address}</h5>
            <button
              className="btn btn-outline-warning mt-2 border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-white"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Update Address
            </button>
          </div>
        ) : (
          <div className="mb-3">
            {auth.token ? (
              <button
                className="btn btn-outline-warning border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-white"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            ) : (
              <button
                className="btn btn-outline-warning border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-white"
                onClick={() => navigate("/login", { state: "/cart" })}
              >
                Please Login to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default CartPage
