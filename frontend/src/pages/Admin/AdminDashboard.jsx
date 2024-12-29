import React from 'react'
import Layout from "../../components/layout/Layout"
import { useAuth } from '../../context/Auth'
import AdminMenu from '../../components/layout/AdminMenu.jsx'
import useStates from '../../hooks/useStates.jsx'
import { Link } from 'react-router-dom'
const AdminDashboard = () => {

    const states = useStates();
  
    const [auth] = useAuth()
  return (
  <div>
    <Layout title={'Dashboard -Admin'}>

    <div className="container mx-auto mt-7 p-4">
    <AdminMenu/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       


  <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide space-x-4 p-4">
  {states.map((state) => (
    <Link
      key={state._id}
      to={`/dashboard/admin/states/${state._id}`}
      className="inline-block text-center transition-transform transform hover:scale-105"
    >
      <div className="flex flex-col items-center">
        <div className=" rounded overflow-hidden border-2 border-gray-300 shadow-md">
        <h4 className="p-2 text-sm text-black text-center leading-tight">
          {state.name}
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
