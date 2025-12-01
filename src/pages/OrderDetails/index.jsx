import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FiChevronLeft, FiTag, FiMapPin, FiTruck, FiBox, 
  FiDollarSign, FiCreditCard, FiShoppingBag, FiCheck, FiMap, FiX 
} from "react-icons/fi";

import { useOrderDetails } from "../../hooks/useOrderDetails";
import { orderApi } from "../../services/orderApi"; // Usado pontualmente para rota
import { Loading } from "../../components/Loading";
import { formatCurrency, formatDate, formatBirthDate, translateOrderStatus } from "../../utils/format";
import { theme } from "../../styles/theme";

import { PageContainer, PageHeader, PageTitle, BackButton } from "../../styles/commonStyles";
import * as S from "./styles";

export function OrderDetails() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  
  // Toda a lógica movida para o Hook
  const { 
    order, store, loading, processingAction, nextStep, updateStatus, cancelOrder 
  } = useOrderDetails(orderId);
  
  const [qrOpen, setQrOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);

  async function handleGenerateUberRoute() {
    if (!order) return;
    if (order.deliveryInfo.trackingUrl) {
      setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(order.deliveryInfo.trackingUrl)}`);
      setQrOpen(true);
      return;
    }
    try {
      setLoadingRoute(true);
      const mockUrl = `https://m.uber.com/`; 
      await orderApi.saveTrackingUrl(order.deliveryInfo.id, mockUrl);
      
      setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(mockUrl)}`);
      setQrOpen(true);
    } catch (error) {
      toast.error("Erro ao gerar rota.");
    } finally {
      setLoadingRoute(false);
    }
  }

  if (loading || !order) return <Loading />;

  const storeAddress = store?.address 
      ? `${store.address.street || ""}, ${store.address.number || ""} - ${store.address.neighborhood || ""}`
      : "Endereço não disponível";

  return (
    <PageContainer>
        <PageHeader>
          <PageTitle>
            <BackButton onClick={() => navigate("/order")}>
                <FiChevronLeft /> 
            </BackButton>
            <div>
              Detalhes do Pedido
              <div style={{ fontSize: '14px', fontWeight: '400', color: theme.COLORS.GRAY_500, marginTop: '4px' }}>
                  #{orderId.substring(0, 8).toUpperCase()}
              </div>
            </div>
          </PageTitle>
          <S.DateInfo>
            <small>Data do Pedido</small>
            <strong>{formatDate(order.created_at)}</strong>
          </S.DateInfo>
        </PageHeader>
        
        <S.ContentGrid>
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
                              <img src={item.product?.photos?.[0] || "/placeholder.png"} alt={item.product?.title} />
                              <strong>{item.product?.title}</strong>
                            </S.ItemDetails>
                            <div className="qty">{item.quantity}</div>
                            <div className="price">{formatCurrency(item.unit_price)}</div>
                            <div className="total">{formatCurrency(item.unit_price * item.quantity)}</div>
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
                      <small style={{ color: theme.COLORS.GRAY_500, fontSize: '12px', marginBottom: '4px', display:'block' }}>Endereço da Loja (Origem)</small>
                      <div style={{ fontWeight: 600, color: theme.COLORS.GRAY_800 }}>{storeAddress}</div>
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
                      <strong>{translateOrderStatus(order.deliveryInfo.status)}</strong>
                    </div>
                </S.StatusBanner>
            </S.Section>
            
            <S.Section>
                <S.SectionHeader><div><FiCreditCard /> Pagamento</div></S.SectionHeader>
                <S.PaymentBanner type={order.paymentInfo?.status}>
                    <div className="icon"><FiCheck /></div>
                    <div className="content">
                        <strong>{translateOrderStatus(order.paymentInfo?.status)}</strong>
                        <div style={{fontSize:'13px', marginTop:'2px', opacity: 0.8}}>{order.paymentInfo?.displayMethod}</div>
                    </div>
                </S.PaymentBanner>
            </S.Section>

            <S.Section>
                <S.SectionHeader><div><FiDollarSign /> Resumo Financeiro</div></S.SectionHeader>
                <S.Summary>
                    <S.SummaryRow><span>Subtotal</span><strong>{formatCurrency(order.financials.subtotal)}</strong></S.SummaryRow>
                    <S.SummaryRow>
                        <span>Frete</span>
                        <strong>{formatCurrency(order.financials.shipping)}</strong>
                    </S.SummaryRow>
                    <S.TotalRow><span>Total</span><strong>{formatCurrency(order.financials.total)}</strong></S.TotalRow>
                </S.Summary>

                <S.ButtonsRow>
                  {!order.deliveryInfo.isPickup && 
                   ['saiu_para_entrega', 'entregue'].includes(order.deliveryInfo.status) && (
                    <S.RouteButton onClick={handleGenerateUberRoute} disabled={loadingRoute}>
                      <FiMap /> 
                      {loadingRoute ? "Gerando..." : "Ver Rota (QR)"}
                    </S.RouteButton>
                  )}
                  
                  <S.PrimaryButton 
                    disabled={processingAction || nextStep.disabled} 
                    onClick={updateStatus}
                    style={nextStep.color ? { background: nextStep.color, opacity: nextStep.disabled ? 0.6 : 1 } : {}}
                  >
                    {nextStep.icon} {nextStep.label}
                  </S.PrimaryButton>

                  {order.deliveryInfo.status !== 'entregue' && order.deliveryInfo.status !== 'cancelado' && (
                      <S.SecondaryButton disabled={processingAction} onClick={cancelOrder}>
                        <FiX /> Cancelar Pedido
                      </S.SecondaryButton>
                  )}
                </S.ButtonsRow>
            </S.Section>
        </S.ContentGrid>

        {qrOpen && (
          <S.QrModalOverlay onClick={() => setQrOpen(false)}>
            <S.QrModal onClick={e => e.stopPropagation()}>
              <h3>Rota de Entrega</h3>
              <p>Escaneie para abrir a rota.</p>
              {qrSrc && <img src={qrSrc} alt="QR Code" style={{width:'250px', height:'250px'}} />}
              <div style={{marginTop:'20px'}}>
                <S.SecondaryButton style={{padding:'8px 24px', width:'auto', margin:'0 auto', fontSize:'14px'}} onClick={() => setQrOpen(false)}>
                  Fechar
                </S.SecondaryButton>
              </div>
            </S.QrModal>
          </S.QrModalOverlay>
        )}
    </PageContainer>
  );
}