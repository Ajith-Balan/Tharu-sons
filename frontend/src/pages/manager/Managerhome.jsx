import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/Auth'
const Managerhome = () => {
  // const [manager, setManager] = useState({});
  const [auth] = useAuth({});
  return (
    <Layout>

    <div className='mt-10'>
        
      <h1>manager home</h1>
     manager: {auth.user.name}
    </div>
    </Layout>


  )
}

export default Managerhome
