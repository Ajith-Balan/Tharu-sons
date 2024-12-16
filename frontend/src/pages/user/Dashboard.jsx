import React from 'react'
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/Auth';

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={'Dashboard -User'}>
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded">
<UserMenu/>
        </div>
        <div className="bg-gray-200 p-4 rounded">
                <h1>{auth?.user?.name}</h1>
                <h1>{auth?.user?.phone}</h1>

                <h1>{auth?.user?.email}</h1>
                <h1>{auth?.user?.address}</h1>

          </div>
      </div>
    </div>    </Layout>
  )
}

export default Dashboard
