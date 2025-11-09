import './styles'
import {
    Container,
    Content,
    PageTitle,
    TitleInfo,
    DeleteButton,
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
    SummaryTotal
} from './styles';

import { Header } from '../../components/Header';
import { Brand } from '../../components/Brand';
import { Menu } from '../../components/Menu';
import {
    FiBox, FiUser, FiShoppingCart, FiMapPin, FiTruck, FiClock,
    FiCheckCircle, FiCreditCard, FiTrash2
} from 'react-icons/fi';

import { useMenu } from '../../contexts/MenuContext';

export function OrderDetails() {
    const { isMenuOpen } = useMenu();

    return (
        <Container $isopen={isMenuOpen}>
            <Brand />
            <Header />
            <Menu />

            <Content>
                {/* TÍTULO DA PÁGINA E BOTÃO DE DELETAR */}
                <PageTitle>
                    <TitleInfo>
                        <FiBox size={32} />
                        <div>
                            <h2>Detalhes do Pedido</h2>
                            <span>#001234</span>
                        </div>
                    </TitleInfo>

                    <DeleteButton type="button">
                        <FiTrash2 size={16} />
                    </DeleteButton>
                </PageTitle>

                {/* DADOS DO CLIENTE */}
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

                {/* ITENS DO PEDIDO */}
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
                                <td>
                                    <ProductInfo>
                                        <img src="https://placehold.co/64x64/eee/ccc?text=Blusa" alt="Produto" />
                                        <span>Camiseta polo</span>
                                    </ProductInfo>
                                </td>
                                <td>
                                    <QuantityContainer>1</QuantityContainer>
                                </td>
                                <td>
                                    <span>R$ 34.90</span>
                                </td>
                                <td>
                                    <strong>R$ 34.90</strong>
                                </td>
                            </ProductRow>
                            <ProductRow>
                                <td>
                                    <ProductInfo>
                                        <img src="https://placehold.co/64x64/eee/ccc?text=Moletom" alt="Produto" />
                                        <span>Moletom</span>
                                    </ProductInfo>
                                </td>
                                <td>
                                    <QuantityContainer>2</QuantityContainer>
                                </td>
                                <td>
                                    <span>R$ 49.90</span>
                                </td>
                                <td>
                                    <strong>R$ 99.80</strong>
                                </td>
                            </ProductRow>
                            <ProductRow>
                                <td>
                                    <ProductInfo>
                                        <img src="https://placehold.co/64x64/eee/ccc?text=Saia" alt="Produto" />
                                        <span>Saia</span>
                                    </ProductInfo>
                                </td>
                                <td>
                                    <QuantityContainer>1</QuantityContainer>
                                </td>
                                <td>
                                    <span>R$ 59.90</span>
                                </td>
                                <td>
                                    <strong>R$ 59.90</strong>
                                </td>
                            </ProductRow>
                        </tbody>
                    </ProductTable>
                </Card>

                {/* DADOS DE ENTREGA */}
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
                        <InfoItem $fullWidth>
                            <InfoLabel>Código de Rastreamento</InfoLabel>
                            <InfoValue style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FiTruck size={16} />
                                BR123456789SP
                            </InfoValue>
                        </InfoItem>
                    </InfoGrid>
                </Card>

                {/* STATUS DA ENTREGA */}
                <Card>
                    <CardTitle>
                        <FiTruck size={20} />
                        <h3>Status da Entrega</h3>
                    </CardTitle>
                    <Status $status="warning">
                        <FiClock size={16} />
                        Em Andamento
                    </Status>
                </Card>

                {/* STATUS DO PAGAMENTO */}
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

                {/* RESUMO DO PEDIDO */}
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

            </Content>
        </Container>
    );
}