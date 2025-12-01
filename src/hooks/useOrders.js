import { useState, useEffect, useCallback } from 'react';
import { orderApi } from '../services/orderApi';
import { translateOrderStatus } from '../utils/format';

export function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const itemsPerPage = 10; 

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const { data, count } = await orderApi.getOrders(currentPage, itemsPerPage);

            const formattedOrders = data.map(order => ({
                id: order.id, 
                displayId: `PED-${order.id.substring(0, 8).toUpperCase()}`, 
                status: translateOrderStatus(order.status),
                formattedDate: new Date(order.created_at).toLocaleDateString('pt-BR')
            }));

            setOrders(formattedOrders);
            setTotalCount(count);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        loading,
        currentPage,
        setCurrentPage,
        totalPages: Math.ceil(totalCount / itemsPerPage),
        refresh: fetchOrders
    };
}