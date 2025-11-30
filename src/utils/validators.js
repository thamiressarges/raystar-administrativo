export const validateVariationForm = ({ tamanho, cor, estoque, preco }) => {
  if (!tamanho || !tamanho.trim()) {
    return { isValid: false, error: "O campo 'Tamanho' é obrigatório." };
  }

  if (!cor || !cor.trim()) {
    return { isValid: false, error: "O campo 'Cor' é obrigatório." };
  }

  // Validação de Estoque
  const estoqueNumber = Number(estoque);
  if (!estoque || isNaN(estoqueNumber) || estoqueNumber <= 0) {
    return { isValid: false, error: "O 'Estoque' deve ser um número maior que zero." };
  }

  // Validação de Preço
  const precoNumber = Number(preco); 
  if (!preco || isNaN(precoNumber) || precoNumber <= 0) {
    return { isValid: false, error: "O 'Preço' deve ser um valor válido maior que zero." };
  }

  return { isValid: true, error: null };
};