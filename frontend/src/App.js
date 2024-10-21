// src/App.js
import React from 'react';
import TokenFetcher from './TokenFetcher';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

function App() {
    return (
        <div className="flex">
            <Sidebar />
            <Dashboard />
        </div>
    );
}

export default App;
