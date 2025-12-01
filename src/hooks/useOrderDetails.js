import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { orderApi } from '../services/orderApi';
import { getPaymentMethodName } from '../utils/format';
import { theme } from '../styles/theme';
import { FiClock, FiCheck, FiX, FiTruck, FiAlertCircle } from "react-icons/fi";

export function useOrderDetails(orderId) {
    const [order, setOrder] = useState(null);
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processingAction, setProcessingAction] = useState(false);
    const [nextStep, setNextStep] = useState({ label: "Carregando...", disabled: true });

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const [orderData, storeData] = await Promise.all([
                orderApi.getOrderDetails(orderId),
                orderApi.getStoreConfig()
            ]);

            const deliveryData = orderData.delivery || {};
            const fullOrder = {
                ...orderData,
                paymentInfo: { 
                    ...orderData.payment, 
                    displayMethod: getPaymentMethodName(orderData.payment) 
                },
                deliveryInfo: {
                    ...deliveryData,
                    isPickup: (deliveryData.type || "").toLowerCase().includes("pickup") || (deliveryData.type || "").toLowerCase().includes("retirada"),
                    status: orderData.status 
                },
                financials: {
                    subtotal: (orderData.items || []).reduce((acc, curr) => acc + (Number(curr.unit_price) * Number(curr.quantity)), 0),
                    shipping: Number(deliveryData.cost || 0),
                    total: Number(orderData.payment?.value || 0)
                }
            };

            setOrder(fullOrder);
            setStore(storeData);
            calculateNextStep(fullOrder);

        } catch (err) {
            toast.error("Erro ao carregar pedido.");
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        if (orderId) loadData();
    }, [orderId, loadData]);

    const calculateNextStep = (currentOrder) => {
        const status = currentOrder.deliveryInfo.status;
        const isPickup = currentOrder.deliveryInfo.isPickup;

        if (['entregue'].includes(status)) {
            setNextStep({ label: "Pedido Finalizado", disabled: true, icon: <FiCheck />, color: theme.COLORS.SUCCESS });
            return;
        }
        if (['cancelado', 'devolvido'].includes(status)) {
            setNextStep({ label: "Pedido Cancelado", disabled: true, icon: <FiX />, color: theme.COLORS.DANGER });
            return;
        }
        if (['aguardando_pagamento', 'aguardando_confirmacao'].includes(status)) {
            setNextStep({ label: "Aguardando Pagamento", disabled: true, icon: <FiClock />, color: theme.COLORS.WARNING });
            return;
        }

        if (isPickup) {
            setNextStep({
                label: "Confirmar Retirada",
                newStatus: "entregue",
                disabled: false,
                icon: <FiCheck />,
                color: theme.COLORS.SUCCESS
            });
            return;
        }

        if (['pagamento_confirmado', 'preparando_pedido', 'pedido_criado', 'pago'].includes(status)) {
            setNextStep({ label: "Despachar (Saiu para Entrega)", newStatus: "saiu_para_entrega", disabled: false, icon: <FiTruck />, color: theme.COLORS.BLUE_700 });
        } else if (status === 'saiu_para_entrega') {
            setNextStep({ label: "Confirmar Entrega", newStatus: "entregue", disabled: false, icon: <FiCheck />, color: theme.COLORS.SUCCESS });
        } else {
            setNextStep({ label: "Status Desconhecido", disabled: true, icon: <FiAlertCircle />, color: theme.COLORS.GRAY_400 });
        }
    };

    const updateStatus = async () => {
        if (!nextStep.newStatus) return;
        try {
            setProcessingAction(true);
            await orderApi.updateDeliveryStatus(order.deliveryInfo.id, order.id, nextStep.newStatus);
            toast.success("Status atualizado!");
            loadData(); 
        } catch (err) {
            toast.error("Erro ao atualizar status.");
        } finally {
            setProcessingAction(false);
        }
    };

    const cancelOrder = async () => {
        try {
            setProcessingAction(true);
            await orderApi.cancelOrder(order.id, order.deliveryInfo.id);
            toast.success("Pedido cancelado.");
            loadData();
        } catch (err) {
            toast.error("Erro ao cancelar.");
        } finally {
            setProcessingAction(false);
        }
    };

    return {
        order,
        store,
        loading,
        processingAction,
        nextStep,
        updateStatus,
        cancelOrder,
        refresh: loadData
    };
}