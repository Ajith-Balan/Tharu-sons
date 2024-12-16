import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Types = () => {
    const { id } = useParams();
    const [types, setTypes] = useState([]);
    const [site, setSite] = useState({});

    const getProductByCat = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/cat/product-site/${id}`);
            setTypes(res.data.cat || []); // Assuming "cat" contains the products array
            setSite(res.data.site || {}); // Assuming "site" contains site details
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
                {/* Site Information */}
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold">{site.name}</h2>
                   
                    </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {types.map((p) => (
                        <div key={p._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <Link to={`/dashboard/admin/update-product/${p._id}`}>
                                <div className="p-4">
                                    <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Types;
