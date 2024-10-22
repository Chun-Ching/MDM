// src/TokenFetcher.js
import React, { useState } from 'react';
import axios from 'axios';

const TokenFetcher = () => {
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
        <div className="d-flex h-100">
            {/* 側邊導航欄 */}
            <nav className="bg-light p-3" style={{ width: '25%' }}>
                <h2 className="h5">導航</h2>
                <ul className="list-unstyled">
                    <li className="mb-2">
                        <button 
                            onClick={fetchUsernames} 
                            className="btn btn-primary w-100"
                        >
                            用戶管理
                        </button>
                    </li>
                    <li className="mb-2">
                        <button 
                            onClick={fetchDeviceStatus} 
                            className="btn btn-warning w-100"
                        >
                            設備狀態
                        </button>
                    </li>
                    <li className="mb-2">
                        <button 
                            onClick={fetchDeviceDetails} 
                            className="btn btn-info w-100"
                        >
                            設備詳細信息
                        </button>
                    </li>
                </ul>
            </nav>

            {/* 主要內容區域 */}
            <div className="p-4" style={{ width: '75%' }}>
                <h1 className="h3 mb-4">MDM 管理控制台</h1>
                <div className="d-flex flex-column">
                    <button 
                        onClick={fetchUsernames} 
                        className="btn btn-primary mb-2"
                    >
                        獲取用戶名
                    </button>
                    <button 
                        onClick={fetchDeviceStatus} 
                        className="btn btn-warning mb-2"
                    >
                        獲取設備狀態
                    </button>
                    <button 
                        onClick={fetchDeviceDetails} 
                        className="btn btn-info mb-2"
                    >
                        獲取設備詳細信息
                    </button>
                </div>

                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );
};

export default TokenFetcher;
