// src/components/Sidebar.js
import React from 'react';

function Sidebar() {
    return (
        <div className="w-25 h-screen bg-dark text-white p-4">
            <h2 className="h4 font-weight-bold">管理者介面</h2>
            <ul className="list-unstyled mt-4">
                <li className="py-2 hover:bg-gray-700 cursor-pointer">儀表板</li>
                <li className="py-2 hover:bg-gray-700 cursor-pointer">用戶管理</li>
                <li className="py-2 hover:bg-gray-700 cursor-pointer">設置</li>
                {/* ...其他選項... */}
            </ul>
        </div>
    );
}

export default Sidebar;
