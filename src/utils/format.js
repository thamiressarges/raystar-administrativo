// --- FORMATAÇÃO DE VALORES ---

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

// --- FORMATAÇÃO DE DATAS ---

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
  // Trata casos onde a data vem como YYYY-MM-DD string simples (comum em inputs de data)
  if (typeof dateString === 'string' && dateString.includes('-')) {
      const [year, month, day] = dateString.split('-');
      return `${day.substring(0, 2)}/${month}/${year}`;
  }
  return new Date(dateString).toLocaleDateString("pt-BR");
};

// --- FORMATAÇÃO DE TEXTO E DADOS ---

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

// --- TRADUTORES DE STATUS (PARA PEDIDOS E PAGAMENTOS) ---

export const translateOrderStatus = (status) => {
    if (!status) return "Pendente";
    
    const map = {
        // Status do Pedido/Pagamento
        'pending': 'Pendente',
        'pedido_criado': "Pedido Criado",
        'aguardando_confirmacao': "Aguardando Confirmação",
        'aguardando_pagamento': "Aguardando Pagamento",
        'paid': 'Pago',
        'pagamento_confirmado': "Pagamento Aprovado",
        'pago': "Pago",
        
        // Status de Entrega/Logística
        'processing': 'Em processamento',
        'preparando_pedido': "Preparando",
        'shipped': 'Enviado',
        'saiu_para_entrega': "Saiu para Entrega",
        'delivered': 'Entregue',
        'entregue': "Entregue",
        'pickup': "Pronto para Retirada",
        
        // Cancelamentos
        'canceled': 'Cancelado',
        'cancelado': "Cancelado",
        'devolvido': "Devolvido"
    };
    
    return map[status.toLowerCase()] || status;
};

export const getPaymentMethodName = (paymentObj) => {
    if (!paymentObj) return "Não informado";
    
    // Tenta pegar do objeto ou usa a string direta se vier assim
    const form = paymentObj.form || paymentObj; 
    
    const raw = String(form).toLowerCase().trim();
    if (raw.includes('cartao') || raw.includes('credit')) return "Cartão de Crédito";
    if (raw.includes('pix')) return "PIX";
    if (raw.includes('boleto')) return "Boleto Bancário";
    
    return "Outro";
};

export const getRoleName = (permissions) => {
    if (!permissions) return "Usuário";
    if (permissions.includes('super_admin')) return 'Admin Principal';
    if (permissions.includes('admin')) return 'Administrador';
    return 'Usuário';
};