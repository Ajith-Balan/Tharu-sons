import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MccDetails = () => {
    const { id } = useParams();
    const [managers, setManager] = useState({});
    const [livetrain, setLivetrain] = useState([]);
    const [completed, setCompleted] = useState([]);

    const getManager = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/auth/getmanager/${id}`);
            setManager(res.data.manager);
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


    const getcompletedTrain = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/mcctrain/get-completedmcctrain`);
            setCompleted(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const formatDateTime = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    useEffect(() => {
        if (id) getManager();
    }, [id]);

    useEffect(() => {
        getTrain();
        getcompletedTrain();
    }, []);

    return (
        <Layout>
            <div className="mt-20 px-6 md:px-16 lg:px-32">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">MCC Details</h1>

                <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
                    <h5 className="text-xl font-semibold text-gray-700">Manager:</h5>
                    <p className="text-lg text-gray-600">{managers.name || 'Loading...'}</p>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Trains</h2>

                {livetrain.length > 0 ? (
                    livetrain.map((train) => (
                        <div
                            key={train._id}
                            className="flex justify-between items-center text-lg bg-white hover:bg-gray-100 shadow-lg rounded-lg overflow-hidden p-4 mb-4 border-l-4 border-green-500"
                        >
                            <div className="flex flex-col">
                                <h5 className="font-semibold text-gray-700">Train No: {train.trainno}</h5>
                                <span
                                    className={`mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                                        train.status === 'Processing'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    {train.status}
                                </span>
                                <p className="mt-2 text-gray-500">
                                    Cleaning started on: {formatDateTime(train.createdAt)}
                                </p>
                            </div>

                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No live trains available.</p>
                )}
              <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Trains</h2>
    {completed.length > 0 ? (
        completed.map((c) => (
            <div
                key={c._id}
                className="flex justify-between items-center text-lg bg-white hover:bg-gray-100 shadow-lg rounded-lg overflow-hidden p-4 mb-4 border-l-4 border-blue-500"
            >
                <div className="flex flex-col">
                    <h5 className="font-semibold text-gray-700">Train No: {c.trainno}</h5>
                    <p className="mt-2 text-gray-500">
                        Cleaning completed on: {formatDateTime(c.updatedAt)}
                    </p>
                </div>
            </div>
        ))
    ) : (
        <p className="text-gray-500">No completed trains available.</p>
    )}
</div>

            </div>
        </Layout>
    );
};

export default MccDetails;
