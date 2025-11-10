import { useState } from "react";
import {
  Container,
  Content,
  PageTitle,
  TitleInfo,
  OrderDate,
  Card,
  CardTitle,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  ProductTable,
  ProductRow,
  ProductInfo,
  QuantityContainer,
  Status,
  Summary,
  SummaryRow,
  SummaryTotal,
  ActionContainer,
  SuccessButton,
  DangerButton,
  PrimaryButton,
  SecondaryButton,
  StaticStatusButton,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ActionButton, 
  UberButton, 
  HelperText,
  QrContainer,
  QrImage,
  QrActions
} from "./styles";

import { Header } from "../../components/Header";
import { Brand } from "../../components/Brand";
import { Menu } from "../../components/Menu";
import {
  FiBox,
  FiUser,
  FiShoppingCart,
  FiMapPin,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiCreditCard,
  FiX, 
  FiCheck,
  FiXCircle,
  FiGrid
} from "react-icons/fi";

import { useMenu } from "../../contexts/MenuContext";

export function OrderDetails() {
  const { isMenuOpen } = useMenu();

  const [orderStatus, setOrderStatus] = useState("pendente"); 
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [deepLink, setDeepLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pickLat = -3.1388123;
  const pickLng = -60.0244228;
  const dropLat = -3.0213741;
  const dropLng = -59.9669974;

  function buildUberDeepLink() {
    const base = "uber://?action=setPickup";
    const params = [
      `pickup[latitude]=${pickLat}`,
      `pickup[longitude]=${pickLng}`,
      `dropoff[latitude]=${dropLat}`,
      `dropoff[longitude]=${dropLng}`,
      `pickup[nickname]=Origem%2069005-050`,
      `dropoff[nickname]=Destino%2069097-186`
    ];
    return `${base}&${params.join("&")}`;
  }

  function buildUberAndroidIntent(deep) {
    const withoutScheme = deep.replace(/^uber:\/\//, "");
    return `intent://${withoutScheme}#Intent;scheme=uber;package=com.ubercab;end`;
  }

  // ================== MUDANÇA AQUI ==================
  function handleConfirmarPedido() {
    // 1. Monta o link
    const deep = buildUberDeepLink();
    setDeepLink(deep);

    // 2. Gera a URL do QR Code
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=340x340&data=${encodeURIComponent(
      deep
    )}`;
    setQrCodeUrl(qr);

    // 3. Muda o status da página
    setOrderStatus("confirmado");

    // 4. ABRE O MODAL IMEDIATAMENTE (NOVO)
    setIsModalOpen(true); 
  }
  // ================== FIM DA MUDANÇA ==================


  // Esta função agora pode ou não ser usada, mas vamos mantê-la
  // caso você queira um botão "Ver QR de novo"
  function handleAbrirQrModal() {
    setIsModalOpen(true);
  }

  function handleSairParaEntrega() {
    setOrderStatus("em_entrega");
    // Opcional: fechar o modal se ele estiver aberto
    setIsModalOpen(false);
  }

  function handleConfirmarEntrega() {
    setOrderStatus("entregue");
  }

  function handleCancelarPedido() {
    alert("Pedido Cancelado!");
    setOrderStatus("pendente");
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Link copiado!");
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      alert("Link copiado!");
    }
  }

  function downloadQr() {
    const a = document.createElement("a");
    a.href = qrCodeUrl;
    a.download = "qr-uber.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const androidIntent = deepLink ? buildUberAndroidIntent(deepLink) : "";

  return (
    <Container $isopen={isMenuOpen}>
      <Brand />
      <Header />
      <Menu />

      <Content>
        {/* TÍTULO */}
        <PageTitle>
          <TitleInfo>
            <FiBox size={32} />
            <div>
              <h2>Detalhes do Pedido</h2>
              <span>#001234</span>
            </div>
          </TitleInfo>
          <OrderDate>
            <InfoLabel>Data do Pedido</InfoLabel>
            <InfoValue>20/01/2024</InfoValue>
          </OrderDate>
        </PageTitle>

        {/* CLIENTE */}
        <Card>
          <CardTitle>
            <FiUser size={20} />
            <h3>Dados do Cliente</h3>
          </CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Nome Completo</InfoLabel>
              <InfoValue>Maria Silva Santos</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>CPF</InfoLabel>
              <InfoValue>123.456.789-00</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Telefone</InfoLabel>
              <InfoValue>(11) 98765-4321</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Data de Nascimento</InfoLabel>
              <InfoValue>15/03/1990</InfoValue>
            </InfoItem>
          </InfoGrid>
        </Card>

        {/* ITENS */}
        <Card>
          <CardTitle>
            <FiShoppingCart size={20} />
            <h3>Itens do Pedido</h3>
          </CardTitle>
          <ProductTable>
            <thead>
              <tr>
                <th className="product-col">Produto</th>
                <th className="qty-col">Qtd</th>
                <th className="price-col">Preço Unit.</th>
                <th className="total-col">Total</th>
              </tr>
            </thead>
            <tbody>
              <ProductRow>
                <td className="product-col">
                  <ProductInfo>
                    <img
                      src="https://placehold.co/64x64"
                      alt="Produto"
                    />
                    <span>Camiseta polo</span>
                  </ProductInfo>
                </td>
                <td className="qty-col">
                  <QuantityContainer>1</QuantityContainer>
                </td>
                <td className="price-col">
                  R$ 34.90
                </td>
                <td className="total-col">
                  <strong>R$ 34.90</strong>
                </td>
              </ProductRow>
              <ProductRow>
                <td className="product-col">
                  <ProductInfo>
                    <img
                      src="https://placehold.co/64x64"
                      alt="Produto"
                    />
                    <span>Moletom</span>
                  </ProductInfo>
                </td>
                <td className="qty-col">
                  <QuantityContainer>2</QuantityContainer>
                </td>
                <td className="price-col">
                  R$ 49.90
                </td>
                <td className="total-col">
                  <strong>R$ 99.80</strong>
                </td>
              </ProductRow>
            </tbody>
          </ProductTable>
        </Card>

        {/* ENTREGA */}
        <Card>
          <CardTitle>
            <FiMapPin size={20} />
            <h3>Dados de Entrega</h3>
          </CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>CEP</InfoLabel>
              <InfoValue>01310-100</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Endereço</InfoLabel>
              <InfoValue>Av. Djalma Batista</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Cidade</InfoLabel>
              <InfoValue>Manaus</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Estado</InfoLabel>
              <InfoValue>AM</InfoValue>
            </InfoItem>
          </InfoGrid>
        </Card>
        
        {/* CARD DE STATUS DA ENTREGA */}
        <Card>
          <CardTitle>
            <FiTruck size={20} />
            <h3>Status da Entrega</h3>
          </CardTitle>
          
          {orderStatus === "pendente" && (
            <Status $status="warning">
              <FiClock size={16} />
              Aguardando Confirmação
            </Status>
          )}
          {orderStatus === "confirmado" && (
            <Status $status="info">
              <FiCheckCircle size={16} />
              Pedido Confirmado
            </Status>
          )}
          {orderStatus === "em_entrega" && (
            <Status $status="info">
              <FiTruck size={16} />
              Saiu para Entrega
            </Status>
          )}
          {orderStatus === "entregue" && (
            <Status $status="success">
              <FiCheck size={16} />
              Entregue
            </Status>
          )}
        </Card>

        {/* CARD DE STATUS DO PAGAMENTO (Estático) */}
        <Card>
          <CardTitle>
            <FiCreditCard size={20} />
            <h3>Status do Pagamento</h3>
          </CardTitle>
          <Status $status="success">
            <FiCheckCircle size={16} />
            Pago
          </Status>
        </Card>

        {/* CARD DE RESUMO DO PEDIDO (Estático) */}
        <Card>
          <CardTitle>
            <h3>Resumo do Pedido</h3>
          </CardTitle>
          <Summary>
            <SummaryRow>
              <span>Subtotal</span>
              <span>R$ 4999.60</span>
            </SummaryRow>
            <SummaryRow>
              <span>Taxa de Entrega</span>
              <span>R$ 29.90</span>
            </SummaryRow>
            <SummaryTotal>
              <span>Total</span>
              <span>R$ 5029.50</span>
            </SummaryTotal>
          </Summary>
        </Card>

        {/* CARD DE AÇÕES DO PEDIDO */}
        <Card>
          <CardTitle>
            <h3>Ações do Pedido</h3>
          </CardTitle>

          {/* ESTADO 1: PENDENTE */}
          {orderStatus === "pendente" && (
            <ActionContainer>
              <SuccessButton onClick={handleConfirmarPedido}>
                <FiCheck />
                Confirmar Pedido
              </SuccessButton>
              <DangerButton onClick={handleCancelarPedido}>
                <FiXCircle />
                Cancelar Pedido
              </DangerButton>
            </ActionContainer>
          )}

          {/* ESTADO 2: CONFIRMADO */}
          {/* O botão "Ver QR Code" ainda existe, caso o admin feche o modal e queira abrir de novo */}
          {orderStatus === "confirmado" && (
            <ActionContainer>
              <PrimaryButton onClick={handleSairParaEntrega}>
                <FiTruck />
                Marcar como Saiu para Entrega
              </PrimaryButton>
              <SecondaryButton onClick={handleAbrirQrModal}>
                <FiGrid />
                Ver QR Code da Rota
              </SecondaryButton>
              <DangerButton onClick={handleCancelarPedido}>
                <FiXCircle />
                Cancelar Pedido
              </DangerButton>
            </ActionContainer>
          )}

          {/* ESTADO 3: EM ENTREGA */}
          {orderStatus === "em_entrega" && (
            <ActionContainer>
              <SuccessButton onClick={handleConfirmarEntrega}>
                <FiCheckCircle />
                Confirmar Entrega
              </SuccessButton>
              <DangerButton onClick={handleCancelarPedido}>
                <FiXCircle />
                Cancelar Pedido
              </DangerButton>
            </ActionContainer>
          )}

          {/* ESTADO 4: ENTREGUE */}
          {orderStatus === "entregue" && (
            <StaticStatusButton>
              <FiCheck />
              Pedido Entregue
            </StaticStatusButton>
          )}
        </Card>
      </Content>

      {/* MODAL DO QR CODE (Renderizado fora do fluxo) */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={() => setIsModalOpen(false)}>
              <FiX />
            </ModalCloseButton>
            
            <HelperText style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
              QR Code - Rota de Entrega
            </HelperText>
            
            <HelperText style={{ textAlign: 'center', margin: '8px 0 24px', lineHeight: '1.5' }}>
              Escaneie o QR Code com seu celular para abrir a rota no Google Maps.
              <br/>
              Use para chamar Uber Flash, 99 Entrega ou outro serviço de logística.
            </HelperText>

            <QrContainer>
              {qrCodeUrl ? (
                <QrImage src={qrCodeUrl} alt="QR Code Uber" />
              ) : (
                <p>Gerando QR Code...</p>
              )}

              <QrActions>
                {deepLink && (
                  <>
                    <ActionButton type="button" onClick={() => copyToClipboard(deepLink)}>
                      Copiar link do app
                    </ActionButton>
                    <ActionButton type="button" onClick={downloadQr}>
                      Baixar QR
                    </ActionButton>
                  </>
                )}
                {androidIntent && (
                  <UberButton href={androidIntent} target="_blank" rel="noopener noreferrer">
                    Tentar via Intent (Android)
                  </UberButton>
                )}
              </QrActions>
            </QrContainer>
            
            <PrimaryButton onClick={() => setIsModalOpen(false)} style={{ width: '100%', marginTop: '24px' }}>
              Fechar
            </PrimaryButton>

          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}