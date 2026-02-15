/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus FinancialContractsSchema
 * @version 6.6.0
 * @protocol OEDP-V6.5 - Monetary Integrity SSOT
 */

import { z } from 'zod';

/* --- 🛡️ DIMENSÕES NOMINAIS (BRANDED TYPES) --- */

export const TransactionIdentifierSchema = z.string()
  .min(10)
  .describe('Identificador universal inalterável da transação financeira.')
  .brand<'TransactionIdentifier'>();

export type TransactionIdentifier = z.infer<typeof TransactionIdentifierSchema>;

export const PixPayloadSchema = z.string()
  .min(50)
  .regex(/^000201/)
  .describe('Carga EMV QRCps validada para o rastro Pix.')
  .brand<'PixPayload'>();

export type PixPayload = z.infer<typeof PixPayloadSchema>;

/* --- 📥 ADUANAS DE ENTRADA (INPUTS) --- */

export const PaymentIntentInputSchema = z.object({
  citizenIdentifier: z.uuid()
    .describe('ID Zenith do cidadão pagador.'),
    
  amountInCents: z.number()
    .int()
    .positive()
    .describe('Valor da transação em centavos para evitar radiação de ponto flutuante.'),
    
  currency: z.enum(['BRL', 'USD']).default('BRL'),
  
  paymentMethod: z.enum(['PIX', 'CREDIT_CARD', 'BOLETO']),
  
  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
}).readonly();

export type IPaymentIntentInput = z.infer<typeof PaymentIntentInputSchema>;

/* --- 🏛️ CONTRATO DE VEREDITO (OUTPUT) --- */

export const PaymentVerdictSchema = z.object({
  transactionIdentifier: TransactionIdentifierSchema,
  status: z.enum(['PENDING', 'CONFIRMED', 'REFUNDED', 'FAILED']),
  copyAndPastePayload: PixPayloadSchema.optional(),
  processedBy: z.enum(['SOVEREIGN_PIX', 'ASAAS_GATEWAY']),
  correlationIdentifier: z.uuid()
}).readonly();

export type IPaymentVerdict = z.infer<typeof PaymentVerdictSchema>;