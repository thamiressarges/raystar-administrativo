export const ORDER_STATUS = {
  PENDING: 'pending',
  CREATED: 'pedido_criado',
  WAITING_CONFIRMATION: 'aguardando_confirmacao',
  WAITING_PAYMENT: 'aguardando_pagamento',
  PAID: 'paid',
  PAYMENT_APPROVED: 'pagamento_confirmado',
  PAYMENT_PAID: 'pago',
  PROCESSING: 'processing',
  PREPARING: 'preparando_pedido',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'saiu_para_entrega',
  DELIVERED: 'delivered',
  DELIVERED_PT: 'entregue',
  PICKUP: 'pickup',
  READY_FOR_PICKUP: 'pronto_para_retirada',
  CANCELED: 'canceled',
  CANCELED_PT: 'cancelado',
  RETURNED: 'devolvido'
};

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  CLIENT: 'client'
};

export const STORAGE_BUCKETS = {
  PRODUCTS: 'product-images'
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'cartao_credito',
  PIX: 'pix',
  BOLETO: 'boleto'
};