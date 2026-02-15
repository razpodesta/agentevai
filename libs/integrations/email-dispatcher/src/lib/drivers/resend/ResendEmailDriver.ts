/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResendEmailDriver
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Secure Communication
 * @description Driver físico para a API do Resend com selagem de PII.
 */

import { Resend } from 'resend';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { IEmailDispatcherInput } from '../../schemas/EmailDispatcher.schema.js';

export class ResendEmailDriver {
  private static readonly apparatusName = 'ResendEmailDriver';

  public static async executeDespatch(
    data: IEmailDispatcherInput
  ): Promise<{ messageIdentifier: string }> {
    const startTimestamp = performance.now();
    const apiKey = process.env['SOVEREIGN_RESEND_KEY'];

    if (!apiKey) throw new Error('MISSING_RESEND_INFRASTRUCTURE_KEY');

    try {
      const resend = new Resend(apiKey);

      const response = await resend.emails.send({
        from: 'Agentevai <soberania@agentevai.com.br>',
        to: data.recipientEmail as unknown as string,
        subject: data.subject,
        html: data.htmlBody,
      });

      if (response.error) throw response.error;

      const executionLatency = parseFloat((performance.now() - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'EMAIL_DESPATCH_SUCCESS',
        message: `Mensagem enviada com sucesso para rastro anonimizado.`,
        correlationIdentifier: data.correlationIdentifier,
        latencyInMilliseconds: executionLatency,
        metadata: { messageIdentifier: response.data?.id }
      });

      return { messageIdentifier: response.data?.id || 'ORPHAN_ID' };

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INT-4001'),
        apparatus: this.apparatusName,
        location: 'libs/integrations/email-dispatcher/.../ResendEmailDriver.ts',
        correlationIdentifier: data.correlationIdentifier,
        severity: 'HIGH'
      });
    }
  }
}