import { z } from 'zod';

/** @section Tipagem Nominal */
export const EmailAddressSchema = z.string()
  .email()
  .describe('Endereço de destino validado e higienizado.')
  .brand<'EmailAddress'>();

export type EmailAddress = z.infer<typeof EmailAddressSchema>;

export const EmailDispatcherInputSchema = z.object({
  recipientEmail: EmailAddressSchema,
  subject: z.string().min(5).max(100),
  htmlBody: z.string().min(10).describe('Corpo da mensagem em formato HTML soberano.'),
  correlationIdentifier: z.uuid()
})
.brand<'EmailDispatcherInput'>()
.readonly();

export type IEmailDispatcherInput = z.infer<typeof EmailDispatcherInputSchema>;