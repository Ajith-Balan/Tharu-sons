import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import * as XLSX from 'xlsx';

const MccDetails = () => {
    const { id } = useParams();
    const [managers, setManager] = useState({});
    const [livetrain, setLivetrain] = useState([]);
    const [completedGrouped, setCompletedGrouped] = useState({});
    const [auth] = useAuth();
    const [isDownloading, setIsDownloading] = useState(false);

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
            const liveTrains = res.data.filter((train) => train.site === auth.user.type);
            setLivetrain(liveTrains);
        } catch (error) {
            console.error('Error fetching live trains:', error);
        }
    };

    const getcompletedTrain = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/api/v1/mcctrain/get-completedmcctrain`);
            const completedTrains = res.data
                .filter((train) => train.site === auth.user.type)
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

            const grouped = completedTrains.reduce((acc, train) => {
                const date = new Date(train.updatedAt).toLocaleDateString();
                if (!acc[date]) acc[date] = [];
                acc[date].push(train);
                return acc;
            }, {});

            setCompletedGrouped(grouped);
        } catch (error) {
            console.error('Error fetching completed trains:', error);
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

    const downloadExcel = () => {
        setIsDownloading(true); // Disable the button
        try {
            const allTrains = Object.entries(completedGrouped).flatMap(([date, trains]) =>
                trains.map((train) => ({
                    Date: date,
                    TrainNo: train.trainno,
                    Status: train.status,
                    "Updated At": formatDateTime(train.updatedAt),
                }))
            );

            const worksheet = XLSX.utils.json_to_sheet(allTrains);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Completed Trains');

            XLSX.writeFile(workbook, 'Completed_Trains.xlsx');
        } catch (error) {
            console.error('Error downloading Excel file:', error);
        } finally {
            setIsDownloading(false); // Re-enable the button after download
        }
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
                <div className="flex flex-wrap gap-4">
                    {livetrain.length > 0 ? (
                        livetrain.map((train) => (
                            <div
                                key={train._id}
                                className="w-full md:w-1/2 lg:w-1/3 bg-white hover:bg-gray-100 shadow-lg rounded-lg p-4 border-l-4 border-green-500"
                            >
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
                        ))
                    ) : (
                        <p className="text-gray-500 w-full">No live trains available.</p>
                    )}
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Completed Trains</h2>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={downloadExcel}
                        disabled={isDownloading}
                        className={`px-4 py-2 font-semibold rounded-lg shadow ${
                            isDownloading
                                ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        {isDownloading ? 'Downloading...' : 'Download Excel'}
                    </button>
                </div>
                <div className="space-y-8">
                    {Object.keys(completedGrouped).length > 0 ? (
                        Object.entries(completedGrouped).map(([date, trains]) => (
                            <div key={date}>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">{date}</h3>
                                <div className="flex flex-wrap gap-4">
                                    {trains.map((train) => (
                                        <div
                                            key={train._id}
                                            className="flex items-center bg-white hover:bg-gray-100 shadow rounded-lg px-4 py-2 border-l-4 border-blue-500 w-full md:w-auto"
                                        >
                                            <h5 className="font-semibold text-gray-700 mr-4">Train No: {train.trainno}</h5>
                                            <p className="text-gray-500">{formatDateTime(train.updatedAt)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 w-full">No completed trains available.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default MccDetails;
