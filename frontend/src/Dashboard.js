// src/components/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [usernames, setUsernames] = useState([]); // 儲存用戶名
    const [deviceStatus, setDeviceStatus] = useState(''); // 儲存設備狀態
    const [deviceDetails, setDeviceDetails] = useState(''); // 儲存設備詳細信息
    const [loading, setLoading] = useState({ usernames: false, deviceStatus: false, deviceDetails: false });
    const [error, setError] = useState('');

    // 獲取用戶名
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

    // 獲取設備狀態
    const fetchDeviceStatus = async () => {
        setLoading({ ...loading, deviceStatus: true });
        setError('');
        
        const deviceId = 'd00d8e2a990d40049ef841e5cc148c70'; // 替換為您要查詢的裝置 ID

        try {
            const response = await axios.post(`http://localhost:3000/api/devices-location/${deviceId}`);
            setDeviceStatus(`Latitude: ${response.data.latitude}, Longitude: ${response.data.longitude}`); // 更新設備狀態
        } catch (err) {
            setError('Failed to fetch device status: ' + (err.response ? err.response.data.detail : err.message));
        } finally {
            setLoading({ ...loading, deviceStatus: false });
        }
    };

    // 獲取設備詳細信息
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
        <div className="flex-1 p-6 bg-gray-100">
            <h1 className="text-2xl font-semibold">歡迎來到管理者儀表板</h1>
            <div className="flex flex-col items-center h-screen">
                <h1 className="text-3xl font-bold text-center mb-5">MDM 管理控制台</h1>
                <div className="flex flex-col space-y-4 w-full max-w-md">
                    <button 
                        onClick={fetchUsernames} 
                        className={`bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200 w-full ${loading.usernames ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading.usernames}
                    >
                        {loading.usernames ? '加載中...' : '使用者名稱'}
                    </button>
                    <button 
                        onClick={fetchDeviceStatus} 
                        className={`bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 transition duration-200 w-full ${loading.deviceStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading.deviceStatus}
                    >
                        {loading.deviceStatus ? '加載中...' : '獲取設備位置'}
                    </button>
                    <button 
                        onClick={fetchDeviceDetails} 
                        className={`bg-purple-500 text-white font-bold py-2 rounded hover:bg-purple-600 transition duration-200 w-full ${loading.deviceDetails ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading.deviceDetails}
                    >
                        {loading.deviceDetails ? '加載中...' : '獲取設備詳細訊息'}
                    </button>
                </div>

                {error && <p className="mt-5 text-center text-red-600">{error}</p>}
                {usernames.length > 0 && (
                    <div className="mt-5">
                        <h2 className="text-xl font-semibold">使用者列表</h2>
                        <ul>
                            {usernames.map((username, index) => (
                                <li key={index} className="py-1">{username}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {deviceStatus && (
                    <div className="mt-5">
                        <h2 className="text-xl font-semibold">設備位置</h2>
                        <p>{deviceStatus}</p>
                    </div>
                )}
                {deviceDetails && (
                    <div className="mt-5">
                        <h2 className="text-xl font-semibold">設備詳細訊息</h2>
                        <p>{deviceDetails}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
