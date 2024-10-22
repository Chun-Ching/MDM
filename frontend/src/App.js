// src/App.js
import React from 'react';
import TokenFetcher from './TokenFetcher';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

function App() {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <Dashboard />
            </div>
        </div>
    );
}

export default App;
