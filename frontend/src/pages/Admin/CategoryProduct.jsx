import React, { useState, useEffect } from 'react';
import Layout from "../../components/layout/Layout"
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});

    const getProductByCat = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/product/product-category/${id}`);
            setProducts(res.data.products);
            setCategory(res.data.category);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (id) getProductByCat();
    }, [id]);

    return (
        <Layout>
            
           <div className="container mx-auto px-4 mt-5 py-8">
    <h1 className="text-3xl font-bold mb-8 text-center">{category.name}</h1>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((p) => (
              <div key={p._id} className="text-center">
                <Link to={`/types/${p._id}`}>
                
                  <div className="">
  <h5 className="text-lg bg-white text-center shadow-lg rounded-lg overflow-hidden py-2 font-semibold mb-1">{p.name}</h5>

  
</div>
</Link>


<Link className='bg-green-500 px-10  text-center rounded py-1 text-white ' to={`/dashboard/admin/update-product/${p._id}`}>
Edit

                </Link>
              </div>

              
              
            ))}
          </div>
</div>

        </Layout>
    );
};

export default CategoryProduct;
