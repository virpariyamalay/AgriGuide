import React from 'react';

const AdminHeader = ({ onLogout }) => (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sticky top-0 z-10 bg-white/80 backdrop-blur-md py-3 rounded-b-xl shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <button
            onClick={onLogout}
            className="mt-3 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
            Logout
        </button>
    </div>
);

export default AdminHeader; 