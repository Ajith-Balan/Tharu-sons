import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/Auth';
import axios from 'axios';
const Dashboard = () => {

  const [auth] = useAuth()
  const [worktype, setWorktype] = useState({});
  const [livetrain, setLivetrain] = useState([]);

  const getWorktype = async () => {
      try {
          const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/types/getone-worktype/${auth?.user?.type}`);
          setWorktype(res.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };


  const getTrain = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/mcctrain/get-livemcctrain`);
        setLivetrain(res.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



  useEffect(() => {
      if (auth?.user?.type) getWorktype();
  }, [auth?.user?.type]);

  useEffect(() => {
    getTrain();
}, []);


  return (
    <Layout title={'Dashboard -User'}>
    <div className="container mt-10 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded">
<UserMenu/>
        </div>
        <div className="bg-gray-200 p-4 rounded">
          <h1>{worktype.name}</h1>
                <h1>{auth?.user?.name}</h1>
                <h1>{auth?.user?.phone}</h1>

                <h1>{auth?.user?.email}</h1>
                <h1>{auth?.user?.address}</h1>
                <h1>{auth?.user?.type}</h1>

          </div>


            {livetrain?.map((p) => (
                        <div key={p._id} className="text-center">
                          
                            <div className="flex justify-between items-center text-lg bg-white hover:bg-gray-100  shadow-lg rounded-lg overflow-hidden p-2 font-semibold mb-1">
                              
            <h5 >{p.trainno}</h5>
            <h6>{p.status}</h6>
          
       
          </div>
          
          
          
                        </div>
          
                        
                        
                      ))}
      </div>
    </div>    </Layout>
  )
}

export default Dashboard
