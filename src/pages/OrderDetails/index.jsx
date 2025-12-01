import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FiChevronLeft, FiTag, FiMapPin, FiTruck, FiBox, 
  FiDollarSign, FiCreditCard, FiShoppingBag, FiCheck, FiX, FiMap, FiClock, FiAlertCircle
} from "react-icons/fi";
import { orderApi } from "../../services/orderApi";
import { Loading } from "../../components/Loading";
import { Brand } from "../../components/Brand";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { useMenu } from "../../contexts/MenuContext";
import * as S from "./styles";

// --- FORMATAÇÕES ---
const formatPrice = (v) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString("pt-BR") : "—";
const formatBirthDate = (dateString) => {
  if (!dateString) return "—";
  if (dateString.includes('-')) {
      const [year, month, day] = dateString.split('-');
      return `${day.substring(0, 2)}/${month}/${year}`;
  }
  return new Date(dateString).toLocaleDateString("pt-BR");
};

const translateStatus = (status) => {
  if (!status) return "Aguardando Pagamento";
  const map = {
    pedido_criado: "Pedido Criado",
    aguardando_confirmacao: "Aguardando Confirmação",
    aguardando_pagamento: "Aguardando Pagamento",
    pagamento_confirmado: "Pagamento Aprovado",
    pago: "Pago",
    preparando_pedido: "Preparando",
    saiu_para_entrega: "Saiu para Entrega",
    entregue: "Entregue",
    cancelado: "Cancelado",
    devolvido: "Devolvido",
    pickup: "Pronto para Retirada"
  };
  return map[status.toLowerCase()] || status;
};

const getPaymentMethodName = (paymentObj) => {
  if (!paymentObj) return "Não informado";
  if (paymentObj.form) {
    const raw = String(paymentObj.form).toLowerCase().trim();
    if (raw.includes('cartao') || raw.includes('credit')) return "Cartão de Crédito";
    if (raw.includes('pix')) return "PIX";
    if (raw.includes('boleto')) return "Boleto Bancário";
  }
  return "Não informado";
};

export function OrderDetails() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const { isMenuOpen } = useMenu();
  
  const [order, setOrder] = useState(null);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storeDisplayAddress, setStoreDisplayAddress] = useState("Carregando endereço da loja...");
  
  // Estados do Modal de Rota
  const [qrOpen, setQrOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  
  const [processingAction, setProcessingAction] = useState(false);

  // --- LÓGICA DE ESTADOS DO BOTÃO ---
  const [nextStep, setNextStep] = useState({ 
    label: "Carregando...", 
    disabled: true, 
    icon: <FiClock />, 
    color: "#9ca3af" 
  }); 

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const [orderData, storeData] = await Promise.all([
            orderApi.getOrderDetails(orderId),
            orderApi.getStoreConfig()
        ]);
        
        const deliveryData = orderData.delivery || {};
        
        // Normalização do Objeto Order
        const fullOrder = {
          ...orderData,
          client: orderData.client || {},
          paymentInfo: { 
            ...orderData.payment, 
            displayMethod: getPaymentMethodName(orderData.payment) 
          },
          deliveryInfo: {
            ...deliveryData,
            id: deliveryData.id,
            isPickup: (deliveryData.type || "").toLowerCase().includes("pickup") || (deliveryData.type || "").toLowerCase().includes("retirada"),
            cost: Number(deliveryData.cost || 0),
            trackingUrl: deliveryData.tracking_url || null, 
            zip: orderData.client?.address?.zip || "",
            street: orderData.client?.address?.street || "",
            number: orderData.client?.address?.number || "",
            neighborhood: orderData.client?.address?.neighborhood || "",
            city: orderData.client?.address?.city || "",
            state: orderData.client?.address?.state || "",
            status: orderData.status 
          },
          items: (orderData.items || []).map(item => ({
             ...item,
             name: item.product?.title || "Produto",
             image: item.product?.photos?.[0] || "/images/default-image.jpg",
             unit_price: Number(item.unit_price),
             total: Number(item.unit_price) * Number(item.quantity)
          })),
          financials: {
            subtotal: (orderData.items || []).reduce((acc, curr) => acc + (curr.unit_price * curr.quantity), 0),
            shipping: Number(deliveryData.cost || 0),
            total: Number(orderData.payment?.value || 0)
          }
        };

        if (mounted) {
            setOrder(fullOrder);
            updateNextStep(fullOrder);
        }
        
        // Configuração de endereço da loja
        if (storeData) {
            if (mounted) setStore(storeData);
            const addr = storeData.address || {};
            const cep = (addr.zip || addr.cep || "").replace(/\D/g, "");
            
            if (addr.street || addr.rua) {
                const n = addr.number || addr.numero || "S/N";
                if (mounted) setStoreDisplayAddress(`${addr.street || addr.rua}, ${n} - ${addr.neighborhood || addr.bairro}, ${addr.city || addr.cidade}`);
            } else if (cep.length === 8) {
                try {
                    const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
                    if (res.ok) {
                        const d = await res.json();
                        if (mounted) setStoreDisplayAddress(`${d.street}, ${addr.number || "S/N"} - ${d.neighborhood}, ${d.city} - ${d.state}`);
                    }
                } catch (e) { console.error(e); }
            }
        }

      } catch (err) {
        console.error(err);
        toast.error("Erro ao carregar dados.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => (mounted = false);
  }, [orderId]);

  // --- CALCULA QUAL A PRÓXIMA AÇÃO ---
  const updateNextStep = (currentOrder) => {
    const status = currentOrder.deliveryInfo.status;
    const isPickup = currentOrder.deliveryInfo.isPickup;

    // 1. ESTADOS FINAIS
    if (['entregue'].includes(status)) {
        setNextStep({
            label: "Pedido Finalizado",
            disabled: true,
            icon: <FiCheck />,
            color: "#10b981" 
        });
        return;
    }

    if (['cancelado', 'devolvido'].includes(status)) {
        setNextStep({
            label: "Pedido Cancelado",
            disabled: true,
            icon: <FiX />,
            color: "#ef4444" 
        });
        return;
    }

    if (['aguardando_pagamento', 'aguardando_confirmacao'].includes(status)) {
        setNextStep({
            label: "Aguardando Pagamento",
            disabled: true, 
            icon: <FiClock />,
            color: "#f59e0b" 
        });
        return;
    }

    // 2. FLUXO DE RETIRADA
    if (isPickup) {
        setNextStep({
            label: "Confirmar Retirada",
            newStatus: "entregue",
            disabled: false,
            icon: <FiCheck />,
            color: "#10b981"
        });
        return;
    }

    // 3. FLUXO DE ENTREGA (DELIVERY)
    if (['pagamento_confirmado', 'preparando_pedido', 'pedido_criado', 'pago'].includes(status)) {
        setNextStep({
            label: "Despachar (Saiu para Entrega)",
            newStatus: "saiu_para_entrega",
            disabled: false,
            icon: <FiTruck />,
            color: "#2563eb"
        });
    } 
    else if (status === 'saiu_para_entrega') {
        setNextStep({
            label: "Confirmar Entrega ao Cliente",
            newStatus: "entregue",
            disabled: false,
            icon: <FiCheck />,
            color: "#10b981" 
        });
    } 
    else {
        setNextStep({
            label: "Status Desconhecido",
            disabled: true,
            icon: <FiAlertCircle />,
            color: "#9ca3af"
        });
    }
  };

  // --- AÇÕES ---
  async function handleUpdateStatus() {
    if (!order || !nextStep || nextStep.disabled) return;
    
    try {
      setProcessingAction(true);
      
      await orderApi.updateDeliveryStatus(order.deliveryInfo.id, order.id, nextStep.newStatus);
      
      toast.success(`Status atualizado para: ${translateStatus(nextStep.newStatus)}`);
      
      const updatedOrder = {
          ...order,
          deliveryInfo: { ...order.deliveryInfo, status: nextStep.newStatus }
      };
      setOrder(updatedOrder);
      updateNextStep(updatedOrder); 

    } catch (err) { 
        console.error(err);
        toast.error("Erro ao atualizar status."); 
    } finally { 
        setProcessingAction(false); 
    }
  }

  async function handleCancelOrder() {
    if (!confirm("Tem certeza que deseja cancelar este pedido?")) return;
    try {
      setProcessingAction(true);
      await orderApi.cancelOrder(orderId, order.deliveryInfo.id);
      toast.success("Pedido cancelado.");
      
      const updatedOrder = {
          ...order,
          deliveryInfo: { ...order.deliveryInfo, status: 'cancelado' }
      };
      setOrder(updatedOrder);
      updateNextStep(updatedOrder);
    } catch { toast.error("Erro ao cancelar."); }
    finally { setProcessingAction(false); }
  }

  async function handleGenerateUberRoute() {
    if (!order) return;
    if (order.deliveryInfo.trackingUrl) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(order.deliveryInfo.trackingUrl)}`;
      setQrSrc(qrUrl);
      setQrOpen(true);
      return;
    }
    if (!store || !store.address) return toast.error("Endereço da loja inválido.");
    const clientCep = order.deliveryInfo.zip?.replace(/\D/g, "");
    const storeCep = (store.address.zip || store.address.cep || "").replace(/\D/g, "");

    if (!clientCep || !storeCep) return toast.warn("CEPs inválidos.");

    try {
      setLoadingRoute(true);
      // Simulação
      const mockUrl = `https://m.uber.com/`; 
      await orderApi.saveTrackingUrl(order.deliveryInfo.id, mockUrl);
      
      setOrder(prev => ({
          ...prev,
          deliveryInfo: { ...prev.deliveryInfo, trackingUrl: mockUrl }
      }));
      setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(mockUrl)}`);
      setQrOpen(true);

    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar rota.");
    } finally {
      setLoadingRoute(false);
    }
  }

  if (loading || !order) return <S.Container $isopen={isMenuOpen}><Loading /></S.Container>;

  return (
    <S.Container $isopen={isMenuOpen}>
      <Brand /><Header /><Menu />
      <S.PageWrapper>
        
        <S.HeaderBar>
          <S.Title onClick={() => navigate("/order")} style={{ cursor: "pointer" }}>
            <FiChevronLeft /> 
            <div>
              Detalhes do Pedido
              <div style={{ fontSize: '14px', fontWeight: '400', color: '#6b7280', marginTop: '4px' }}>#{orderId.substring(0, 8).toUpperCase()}</div>
            </div>
          </S.Title>
          <S.DateInfo>
            <small>Data do Pedido</small>
            <strong>{formatDate(order.created_at)}</strong>
          </S.DateInfo>
        </S.HeaderBar>
        
        <S.ContentGrid>
            {/* ... SEÇÕES DE CLIENTE, ITENS E ENTREGA MANTIDAS IGUAIS ... */}
            <S.Section>
                <S.SectionHeader><div><FiTag /> Dados do Cliente</div></S.SectionHeader>
                <S.ClientGrid>
                    <div><small>Nome</small><div className="clientValue">{order.client?.name}</div></div>
                    <div><small>CPF</small><div className="clientValue">{order.client?.cpf || "—"}</div></div>
                    <div><small>Telefone</small><div className="clientValue">{order.client?.phone || "—"}</div></div>
                    <div><small>Nascimento</small><div className="clientValue">{formatBirthDate(order.client?.birth_date)}</div></div>
                </S.ClientGrid>
            </S.Section>

            <S.Section>
                <S.SectionHeader><div><FiBox /> Itens do Pedido</div></S.SectionHeader>
                <S.ItemsList>
                    <div className="itemsHead">
                      <span>Produto</span>
                      <span style={{textAlign: 'center'}}>Qtd</span>
                      <span style={{textAlign: 'right'}}>Preço</span>
                      <span style={{textAlign: 'right'}}>Total</span>
                    </div>
                    {order.items.map(item => (
                        <S.ItemRow key={item.id}>
                            <S.ItemDetails>
                              <img src={item.image} alt={item.name} />
                              <strong>{item.name}</strong>
                            </S.ItemDetails>
                            <div className="qty">{item.quantity}</div>
                            <div className="price">{formatPrice(item.unit_price)}</div>
                            <div className="total">{formatPrice(item.total)}</div>
                        </S.ItemRow>
                    ))}
                </S.ItemsList>
            </S.Section>

            <S.Section>
                <S.SectionHeader>
                    {order.deliveryInfo.isPickup ? <div><FiShoppingBag /> Retirada</div> : <div><FiMapPin /> Dados de Entrega</div>}
                </S.SectionHeader>
                
                {order.deliveryInfo.isPickup ? (
                    <S.PickupCard>
                        <div className="icon"><FiShoppingBag /></div>
                        <div className="info">
                            <strong>RETIRADA NA LOJA</strong>
                            <p>O cliente optou por retirar o produto na loja.</p>
                        </div>
                    </S.PickupCard>
                ) : (
                  <>
                    <S.DeliveryGrid>
                      <div><small>CEP</small><div className="delValue">{order.deliveryInfo.zip}</div></div>
                      <div><small>Endereço</small><div className="delValue">{order.deliveryInfo.street}, {order.deliveryInfo.number} - {order.deliveryInfo.neighborhood}</div></div>
                      <div><small>Cidade</small><div className="delValue">{order.deliveryInfo.city}</div></div>
                      <div><small>Estado</small><div className="delValue">{order.deliveryInfo.state}</div></div>
                    </S.DeliveryGrid>
                    <S.Divider />
                    <div>
                      <small style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px', display:'block' }}>Endereço da Loja (Origem)</small>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>{storeDisplayAddress}</div>
                    </div>
                  </>
                )}
            </S.Section>

            <S.Section>
                <S.SectionHeader><div><FiTruck /> Status Atual</div></S.SectionHeader>
                <S.StatusBanner type={order.deliveryInfo.status}>
                    <div className="icon">
                        {order.deliveryInfo.status === 'entregue' ? <FiCheck /> : <FiTruck />}
                    </div>
                    <div className="content">
                      <strong>{translateStatus(order.deliveryInfo.status)}</strong>
                    </div>
                </S.StatusBanner>
            </S.Section>
            
            <S.Section>
                <S.SectionHeader><div><FiCreditCard /> Pagamento</div></S.SectionHeader>
                <S.PaymentBanner type={order.paymentInfo?.status}>
                    <div className="icon"><FiCheck /></div>
                    <div className="content">
                        <strong>{translateStatus(order.paymentInfo?.status)}</strong>
                        <div style={{fontSize:'13px', marginTop:'2px', opacity: 0.8}}>{order.paymentInfo?.displayMethod}</div>
                    </div>
                </S.PaymentBanner>
            </S.Section>

            {/* RESUMO E BOTÕES DE AÇÃO */}
            <S.Section>
                <S.SectionHeader><div><FiDollarSign /> Resumo Financeiro</div></S.SectionHeader>
                <S.Summary>
                    <S.SummaryRow><span>Subtotal</span><strong>{formatPrice(order.financials.subtotal)}</strong></S.SummaryRow>
                    <S.SummaryRow>
                        <span>Frete ({order.deliveryInfo.isPickup ? 'Retirada' : 'Entrega'})</span>
                        <strong>{formatPrice(order.financials.shipping)}</strong>
                    </S.SummaryRow>
                    <S.TotalRow><span>Total</span><strong>{formatPrice(order.financials.total)}</strong></S.TotalRow>
                </S.Summary>

                <S.ButtonsRow>
                  {/* Botão de Rota: SÓ APARECE se NÃO for retirada, E se o status for 'saiu_para_entrega' ou 'entregue' */}
                  {!order.deliveryInfo.isPickup && 
                   ['saiu_para_entrega', 'entregue'].includes(order.deliveryInfo.status) && (
                    <S.RouteButton onClick={handleGenerateUberRoute} disabled={loadingRoute}>
                      <FiMap /> 
                      {loadingRoute ? "Gerando..." : (order.deliveryInfo.trackingUrl ? "Ver Rota (QR)" : "Gerar Rota Uber")}
                    </S.RouteButton>
                  )}
                  
                  {/* Botão Principal - Controlado pelo DISABLED */}
                  <S.PrimaryButton 
                    disabled={processingAction || nextStep.disabled} 
                    onClick={handleUpdateStatus}
                    style={nextStep.color ? { background: nextStep.color, opacity: nextStep.disabled ? 0.6 : 1 } : {}}
                  >
                    {nextStep.icon} {nextStep.label}
                  </S.PrimaryButton>

                  {/* Botão Cancelar */}
                  {order.deliveryInfo.status !== 'entregue' && order.deliveryInfo.status !== 'cancelado' && (
                      <S.SecondaryButton disabled={processingAction} onClick={handleCancelOrder}>
                        <FiX /> Cancelar Pedido
                      </S.SecondaryButton>
                  )}
                </S.ButtonsRow>
            </S.Section>

        </S.ContentGrid>

        {qrOpen && (
          <S.QrModalOverlay onClick={() => setQrOpen(false)}>
            <S.QrModal onClick={e => e.stopPropagation()}>
              <h3>Rota de Entrega (Uber)</h3>
              <p>Escaneie para abrir a rota no app do Uber.</p>
              {qrSrc && <img src={qrSrc} alt="QR Code Uber" style={{width:'250px', height:'250px'}} />}
              <div style={{marginTop:'20px'}}>
                <S.SecondaryButton style={{padding:'8px 24px', width:'auto', margin:'0 auto', fontSize:'14px'}} onClick={() => setQrOpen(false)}>
                  Fechar
                </S.SecondaryButton>
              </div>
            </S.QrModal>
          </S.QrModalOverlay>
        )}
      </S.PageWrapper>
    </S.Container>
  );
}

export default OrderDetails;