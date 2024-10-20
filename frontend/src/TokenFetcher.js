// src/TokenFetcher.js
import React, { useState } from 'react';
import axios from 'axios';

const TokenFetcher = () => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchToken = async () => {
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:3000/get-token');
            setToken(response.data.access_token); // 假設返回的數據中有access_token
        } catch (err) {
            setError('Failed to fetch token: ' + (err.response ? err.response.data.detail : err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Token Fetcher</h1>
            <button onClick={fetchToken} disabled={loading}>
                {loading ? 'Loading...' : 'Get Token'}
            </button>
            {token && <p>Token: {token}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default TokenFetcher;