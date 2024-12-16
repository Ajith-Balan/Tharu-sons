import React from 'react'
import Layout from "../../components/layout/Layout"
import { useAuth } from '../../context/Auth'
import AdminMenu from '../../components/layout/AdminMenu.jsx'
import useCategory from '../../hooks/useCategory.jsx'
import { Link } from 'react-router-dom'
const AdminDashboard = () => {

    const categories = useCategory();
  
    const [auth] = useAuth()
  return (
  <div>
    <Layout title={'Dashboard -Admin'}>
    <div className="container mx-auto mt-5 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded">
<AdminMenu/>
        </div>
        <div className="bg-gray-200 p-4 rounded">
          <h1>{auth?.user?.name}</h1>       
          <h1>{auth?.user?.email}</h1>       
          <h1>{auth?.user?.phone}</h1>       
          </div>

  <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide space-x-4 p-4">
  {categories.map((category) => (
    <Link
      key={category._id}
      to={`/dashboard/admin/category/${category._id}`}
      className="inline-block text-center transition-transform transform hover:scale-105"
    >
      <div className="flex flex-col items-center">
        <div className=" rounded overflow-hidden border-2 border-gray-300 shadow-md">
        <h4 className="p-2 text-sm text-black text-center leading-tight">
          {category.name}
        </h4>
        </div>
       
      </div>
    </Link>
  ))}
</div>


      </div>
    </div>    </Layout>
  </div>
  )
}

export default AdminDashboard
