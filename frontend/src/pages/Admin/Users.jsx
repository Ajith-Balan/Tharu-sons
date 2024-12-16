import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu.jsx'
const Users = () => {
  return (
    <div>
       <Layout title={'All Users '}>
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold">Column 1</h2>
<AdminMenu/>
        </div>
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold">Column 2</h2>
         <h1>all users</h1>       
          </div>
      </div>
    </div>    </Layout>
    </div>
  )
}

export default Users
