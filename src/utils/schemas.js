import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  is_active: z.boolean().default(true),
});

export const variationSchema = z.object({
  tamanho: z.string().min(1, "Tamanho é obrigatório"),
  cor: z.string().min(1, "Cor é obrigatória"),
  quantity: z.coerce.number().min(0, "Estoque deve ser positivo"),
  price: z.coerce.number().min(0.01, "Preço deve ser maior que zero"),
});

export const productSchema = z.object({
  name: z.string().min(3, "Nome do produto é obrigatório"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  price: z.coerce.number().min(0.01, "Preço base inválido"),
  isAvailable: z.boolean().default(true),
  
  hasVariations: z.boolean().default(false),
  
  simpleStock: z.coerce.number().optional(),

  variations: z.array(variationSchema).optional(),
}).refine((data) => {
  if (data.hasVariations) {
    return data.variations && data.variations.length > 0;
  }
  return data.simpleStock !== undefined && data.simpleStock >= 0;
}, {
  message: "Adicione variações ou defina o estoque simples",
  path: ["simpleStock"], 
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirme sua senha"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Digite sua senha"),
});

export const signUpSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const storeSettingsSchema = z.object({
  name: z.string().min(3, "Nome da loja é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cnpj: z.string().min(14, "CNPJ inválido").optional().or(z.literal('')),
  
  address: z.object({
    cep: z.string().min(8, "CEP inválido"),
    numero: z.string().min(1, "Número obrigatório"),
    complemento: z.string().optional(),
    bairro: z.string().min(1, "Bairro obrigatório"),
    cidade: z.string().min(1, "Cidade obrigatória"),
  }),
  social_media: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
  }),
  phones: z.array(z.string().min(1, "Telefone inválido")).optional(),
});