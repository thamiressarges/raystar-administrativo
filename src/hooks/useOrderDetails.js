import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { orderApi } from '../services/orderApi';
import { getPaymentMethodName } from '../utils/format';
import { ORDER_STATUS } from '../utils/constants';

const formatCEP = (value) => {
    if (!value) return "—";
    const clean = String(value).replace(/\D/g, "");
    if (clean.length === 8) {
        return clean.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return value;
};

export function useOrderDetails(orderId) {
    const [order, setOrder] = useState(null);
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processingAction, setProcessingAction] = useState(false);
    const [nextStep, setNextStep] = useState({ label: "Carregando...", actionType: null, disabled: true });

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const [orderData, storeData] = await Promise.all([
                orderApi.getOrderDetails(orderId),
                orderApi.getStoreConfig()
            ]);

            if (storeData?.address?.cep) {
                try {
                    const cleanCep = storeData.address.cep.replace(/\D/g, '');
                    if (cleanCep.length === 8) {
                        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanCep}`);
                        if (response.ok) {
                            const data = await response.json();
                            storeData.address = {
                                ...storeData.address,
                                street: storeData.address.street || data.street,
                                neighborhood: storeData.address.neighborhood || data.neighborhood,
                                city: storeData.address.city || data.city,
                                state: storeData.address.state || data.state
                            };
                        }
                    }
                } catch (error) {
                    console.error("Erro ao buscar endereço da loja:", error);
                }
            }

            const deliveryData = orderData.delivery || {};
            const clientAddress = orderData.client?.address || {}; 

            const rawClientCep = clientAddress.zip || 
                                 clientAddress.cep || 
                                 clientAddress.CEP || 
                                 clientAddress.postal_code;

            const isPickup = (deliveryData.type || "").toLowerCase().includes(ORDER_STATUS.PICKUP) || 
                             (deliveryData.type || "").toLowerCase().includes("retirada");

            const fullOrder = {
                ...orderData,
                paymentInfo: { 
                    ...orderData.payment, 
                    displayMethod: getPaymentMethodName(orderData.payment) 
                },
                deliveryInfo: {
                    ...deliveryData,
                    isPickup: isPickup,
                    status: orderData.status,
                    
                    street: clientAddress.street || clientAddress.rua || clientAddress.logradouro,
                    number: clientAddress.number || clientAddress.numero,
                    neighborhood: clientAddress.neighborhood || clientAddress.bairro,
                    city: clientAddress.city || clientAddress.cidade,
                    state: clientAddress.state || clientAddress.estado || clientAddress.uf,
                    
                    zip: formatCEP(rawClientCep)
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
            console.error(err);
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

        if ([ORDER_STATUS.DELIVERED, ORDER_STATUS.DELIVERED_PT].includes(status)) {
            setNextStep({ label: "Pedido Finalizado", disabled: true, actionType: 'finished' });
            return;
        }
        if ([ORDER_STATUS.CANCELED, ORDER_STATUS.CANCELED_PT, ORDER_STATUS.RETURNED].includes(status)) {
            setNextStep({ label: "Pedido Cancelado", disabled: true, actionType: 'canceled' });
            return;
        }
        if ([ORDER_STATUS.WAITING_PAYMENT, ORDER_STATUS.WAITING_CONFIRMATION].includes(status)) {
            setNextStep({ label: "Aguardando Pagamento", disabled: true, actionType: 'waiting' });
            return;
        }

        if (isPickup) {
            setNextStep({
                label: "Confirmar Retirada",
                newStatus: ORDER_STATUS.DELIVERED_PT,
                disabled: false,
                actionType: 'confirm_pickup'
            });
            return;
        }

        if ([ORDER_STATUS.PAYMENT_APPROVED, ORDER_STATUS.PREPARING, ORDER_STATUS.CREATED, ORDER_STATUS.PAYMENT_PAID].includes(status)) {
            setNextStep({ 
                label: "Despachar (Saiu para Entrega)", 
                newStatus: ORDER_STATUS.OUT_FOR_DELIVERY, 
                disabled: false, 
                actionType: 'dispatch'
            });
        } else if (status === ORDER_STATUS.OUT_FOR_DELIVERY) {
            setNextStep({ 
                label: "Confirmar Entrega", 
                newStatus: ORDER_STATUS.DELIVERED_PT, 
                disabled: false, 
                actionType: 'confirm_delivery'
            });
        } else {
            setNextStep({ label: "Status Desconhecido", disabled: true, actionType: 'unknown' });
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