// src/TokenFetcher.js
import React, { useState } from 'react';
import axios from 'axios';

const TokenFetcher = () => {
    const [token, setToken] = useState('');
    const [usernames, setUsernames] = useState([]); // 新增狀態來儲存用戶名
    const [deviceStatus, setDeviceStatus] = useState(''); // 新增狀態來儲存設備狀態
    const [deviceDetails, setDeviceDetails] = useState(''); // 新增狀態來儲存設備詳細信息
    const [loading, setLoading] = useState({ usernames: false, deviceStatus: false, deviceDetails: false });
    const [error, setError] = useState('');
    const [latitude, setLatitude] = useState(''); // 新增狀態來儲存經緯度
    const [longitude, setLongitude] = useState(''); // 新增狀態來儲存經緯度

    // Usernames
    const fetchUsernames = async () => {
        setLoading({ ...loading, usernames: true });
        setError('');
        
        try {
            const response = await axios.get('http://localhost:3000/api/devices-usernames');
            setUsernames(response.data); // 假設返回的數據是用戶名的數組
        } catch (err) {
            setError('Failed to fetch usernames: ' + (err.response ? err.response.data.detail : err.message));
        } finally {
            setLoading({ ...loading, usernames: false });
        }
    };

    // 更新 fetchDeviceStatus 函數來獲取經緯度
    const fetchDeviceStatus = async () => {
        setLoading({ ...loading, deviceStatus: true });
        setError('');
        
        const deviceId = 'd00d8e2a990d40049ef841e5cc148c70'; // 替換為您要查詢的裝置 ID

        try {
            const response = await axios.post(`http://localhost:3000/api/devices-location/${deviceId}`);
            setLatitude(response.data.latitude); // 獲取經度
            setLongitude(response.data.longitude); // 獲取緯度
            setDeviceStatus(`Latitude: ${response.data.latitude}, Longitude: ${response.data.longitude}`); // 更新設備狀態
        } catch (err) {
            setError('Failed to fetch device status: ' + (err.response ? err.response.data.detail : err.message));
        } finally {
            setLoading({ ...loading, deviceStatus: false });
        }
    };

    const fetchDeviceDetails = async () => {
        setLoading({ ...loading, deviceDetails: true });
        setError('');
        
        try {
            const response = await axios.get('http://localhost:3000/api/devices-details');
            setDeviceDetails(response.data.details); // 假設返回的數據中有設備詳細信息
        } catch (err) {
            setError('Failed to fetch device details: ' + (err.response ? err.response.data.detail : err.message));
        } finally {
            setLoading({ ...loading, deviceDetails: false });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
            <h1 className="text-3xl font-bold text-center mb-5">ThinkingSoftware</h1>
            <div className="flex flex-col space-y-4 mb-5">
                <button 
                    onClick={fetchUsernames} 
                    disabled={loading.usernames} 
                    className="w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200"
                >
                    {loading.usernames ? 'Loading...' : 'Get Usernames'}
                </button>
                <button 
                    onClick={fetchDeviceStatus} 
                    disabled={loading.deviceStatus} 
                    className="w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 transition duration-200"
                >
                    {loading.deviceStatus ? 'Loading...' : 'Get Device Status'}
                </button>
                <button 
                    onClick={fetchDeviceDetails} 
                    disabled={loading.deviceDetails} 
                    className="w-full bg-purple-500 text-white font-bold py-2 rounded hover:bg-purple-600 transition duration-200"
                >
                    {loading.deviceDetails ? 'Loading...' : 'Get Device Details'}
                </button>
            </div>
            {token && <p className="mt-5 text-center text-blue-600">Token: {token}</p>}
            {error && <p className="mt-5 text-center text-red-600">{error}</p>}
            {usernames.length > 0 && (
                <div className="mt-5">
                    <h2 className="text-2xl font-semibold">Usernames:</h2>
                    <ul className="list-disc list-inside">
                        {usernames.map((username, index) => (
                            <li key={index} className="mt-1">{username}</li>
                        ))}
                    </ul>
                </div>
            )}
            {deviceStatus && (
                <div className="mt-5">
                    <h2 className="text-2xl font-semibold">Device Status:</h2>
                    <p className="mt-1">{deviceStatus}</p>
                </div>
            )}
            {deviceDetails && (
                <div className="mt-5">
                    <h2 className="text-2xl font-semibold">Device Details:</h2>
                    <p className="mt-1">{deviceDetails}</p>
                </div>
            )}
        </div>
    );
};

export default TokenFetcher;
