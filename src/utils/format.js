import { ORDER_STATUS, USER_ROLES } from './constants';

export const formatCurrency = (value) => {
  const number = Number(value) || 0;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatNumber = (value) => {
  return Number(value).toLocaleString("pt-BR");
};

export const formatDate = (dateString) => {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
  } catch {
    return dateString;
  }
};

export const formatBirthDate = (dateString) => {
  if (!dateString) return "—";
  if (typeof dateString === 'string' && dateString.includes('-')) {
      const [year, month, day] = dateString.split('-');
      return `${day.substring(0, 2)}/${month}/${year}`;
  }
  return new Date(dateString).toLocaleDateString("pt-BR");
};

export const formatPhone = (phone) => {
  if (!phone) return "—";
  const clean = String(phone).replace(/\D/g, "");
  
  if (clean.length === 11) {
    return clean.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (clean.length === 10) {
    return clean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return phone;
};

export const formatCPF = (cpf) => {
    if (!cpf) return "—";
    const clean = String(cpf).replace(/\D/g, "");
    if (clean.length !== 11) return cpf;
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const getInitials = (name) => {
    if (!name) return "?";
    const names = (name || "").split(' ');
    const first = names[0] ? names[0][0] : '';
    const last = names.length > 1 ? names[names.length - 1][0] : '';
    return `${first}${last}`.toUpperCase();
};

export const translateOrderStatus = (status) => {
    if (!status) return "Pendente";
    
    const map = {
        [ORDER_STATUS.PENDING]: 'Pendente',
        [ORDER_STATUS.CREATED]: "Pedido Criado",
        [ORDER_STATUS.WAITING_CONFIRMATION]: "Aguardando Confirmação",
        [ORDER_STATUS.WAITING_PAYMENT]: "Aguardando Pagamento",
        [ORDER_STATUS.PAID]: 'Pago',
        [ORDER_STATUS.PAYMENT_APPROVED]: "Pagamento Aprovado",
        [ORDER_STATUS.PAYMENT_PAID]: "Pago",
        [ORDER_STATUS.PROCESSING]: 'Em processamento',
        [ORDER_STATUS.PREPARING]: "Preparando",
        [ORDER_STATUS.SHIPPED]: 'Enviado',
        [ORDER_STATUS.OUT_FOR_DELIVERY]: "Saiu para Entrega",
        [ORDER_STATUS.DELIVERED]: 'Entregue',
        [ORDER_STATUS.DELIVERED_PT]: "Entregue",
        [ORDER_STATUS.PICKUP]: "Pronto para Retirada",
        [ORDER_STATUS.CANCELED]: 'Cancelado',
        [ORDER_STATUS.CANCELED_PT]: "Cancelado",
        [ORDER_STATUS.RETURNED]: "Devolvido"
    };
    
    return map[status.toLowerCase()] || status;
};

export const getPaymentMethodName = (paymentObj) => {
    if (!paymentObj) return "Não informado";
    const form = paymentObj.form || paymentObj; 
    
    const raw = String(form).toLowerCase().trim();
    if (raw.includes('cartao') || raw.includes('credit')) return "Cartão de Crédito";
    if (raw.includes('pix')) return "PIX";
    if (raw.includes('boleto')) return "Boleto Bancário";
    
    return "Outro";
};

export const getRoleName = (permissions) => {
    if (!permissions) return "Usuário";
    if (permissions.includes(USER_ROLES.SUPER_ADMIN)) return 'Admin Principal';
    if (permissions.includes(USER_ROLES.ADMIN)) return 'Administrador';
    return 'Usuário';
};