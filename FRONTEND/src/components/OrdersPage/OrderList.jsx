import React from 'react';
import OrderCard from './OrderCard';

const OrderList = ({ orders, generatePDF }) => (
    <div className="space-y-6">
        {orders.map((order) => (
            <OrderCard key={order._id} order={order} generatePDF={generatePDF} />
        ))}
    </div>
);

export default OrderList; 