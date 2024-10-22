// src/components/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [usernames, setUsernames] = useState([]);
    const [deviceStatus, setDeviceStatus] = useState('');
    const [deviceDetails, setDeviceDetails] = useState('');
    const [loading, setLoading] = useState({ usernames: false, deviceStatus: false, deviceDetails: false });
    const [error, setError] = useState('');

    // 獲取用戶名
    const fetchUsernames = async () => {
        setLoading({ ...loading, usernames: true });
        setError('');
        
        try {
            const response = await axios.get('http://localhost:3000/api/devices-usernames');
            setUsernames(response.data);
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
        
        const deviceId = 'd00d8e2a990d40049ef841e5cc148c70';

        try {
            const response = await axios.post(`http://localhost:3000/api/devices-location/${deviceId}`);
            setDeviceStatus(`Latitude: ${response.data.latitude}, Longitude: ${response.data.longitude}`);
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
            setDeviceDetails(response.data.details);
        } catch (err) {
            setError('Failed to fetch device details: ' + (err.response ? err.response.data.detail : err.message));
        } finally {
            setLoading({ ...loading, deviceDetails: false });
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="h2">歡迎來到管理者儀表板</h1>
            <div className="d-flex flex-column align-items-center">
                <h1 className="h3 mb-4">MDM 管理控制台</h1>
                <div className="d-flex flex-column w-100 max-w-md">
                    <button 
                        onClick={fetchUsernames} 
                        className={`btn btn-primary mb-2 ${loading.usernames ? 'disabled' : ''}`}
                        disabled={loading.usernames}
                    >
                        {loading.usernames ? '加載中...' : '使用者名稱'}
                    </button>
                    <button 
                        onClick={fetchDeviceStatus} 
                        className={`btn btn-warning mb-2 ${loading.deviceStatus ? 'disabled' : ''}`}
                        disabled={loading.deviceStatus}
                    >
                        {loading.deviceStatus ? '加載中...' : '獲取設備位置'}
                    </button>
                    <button 
                        onClick={fetchDeviceDetails} 
                        className={`btn btn-info mb-2 ${loading.deviceDetails ? 'disabled' : ''}`}
                        disabled={loading.deviceDetails}
                    >
                        {loading.deviceDetails ? '加載中...' : '獲取設備詳細訊息'}
                    </button>
                </div>

                {error && <p className="text-danger">{error}</p>}
                {usernames.length > 0 && (
                    <div className="mt-3">
                        <h2 className="h5">使用者列表</h2>
                        <ul className="list-group">
                            {usernames.map((username, index) => (
                                <li key={index} className="list-group-item">{username}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {deviceStatus && (
                    <div className="mt-3">
                        <h2 className="h5">設備位置</h2>
                        <p>{deviceStatus}</p>
                    </div>
                )}
                {deviceDetails && (
                    <div className="mt-3">
                        <h2 className="h5">設備詳細訊息</h2>
                        <p>{deviceDetails}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
