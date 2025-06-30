import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { API_ENDPOINTS } from '../config/api';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Fetch all orders (admin)
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_ENDPOINTS.ORDERS.ADMIN_LIST, {
                headers: {
                    Authorization: user?.token ? `Bearer ${user.token}` : '',
                },
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to fetch orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch user's own orders
    const fetchUserOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(API_ENDPOINTS.ORDERS.LIST, {
                headers: {
                    Authorization: user?.token ? `Bearer ${user.token}` : '',
                },
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to fetch user orders');
            const data = await res.json();
            setUserOrders(data);
        } catch (error) {
            setUserOrders([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Update order status
    const updateOrderStatus = async (orderId, status) => {
        try {
            const res = await fetch(API_ENDPOINTS.ORDERS.UPDATE_STATUS(orderId), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: user?.token ? `Bearer ${user.token}` : '',
                },
                credentials: 'include',
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error('Failed to update order');
            const data = await res.json();
            setOrders(prev => prev.map(o => o._id === orderId ? data.order : o));
            return data.order;
        } catch (error) {
            throw error;
        }
    };

    // Delete order
    const deleteOrder = async (orderId) => {
        try {
            const res = await fetch(API_ENDPOINTS.ORDERS.DELETE(orderId), {
                method: 'DELETE',
                headers: {
                    Authorization: user?.token ? `Bearer ${user.token}` : '',
                },
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to delete order');
            setOrders(prev => prev.filter(o => o._id !== orderId));
        } catch (error) {
            throw error;
        }
    };

    const value = {
        orders,
        userOrders,
        loading,
        fetchOrders,
        fetchUserOrders,
        updateOrderStatus,
        deleteOrder,
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext; 