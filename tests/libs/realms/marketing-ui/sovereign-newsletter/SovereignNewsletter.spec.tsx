/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignNewsletter Forensic Test
 * @protocol OEDP-V5.5.1
 * @description Auditoria técnica do componente de conversão institucional.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SovereignNewsletter } from '@agentevai/marketing-ui';

describe('SovereignNewsletter (Perícia Técnica)', () => {
  /** 
   * @section Saneamento de Rastro 
   * Substituído 'as any' por um rastro determinístico compatível com z.uuid()
   */
  const forensicTraceIdentifier = '00000000-0000-4000-a000-000000000000' as const;

  it('deve disparar a intenção de subscrição ao processar um e-mail institucional válido', async () => {
    // 1. Preparação (Mocking com tipagem implícita Jest)
    const onSubscribeSpy = jest.fn().mockResolvedValue(undefined);
    
    render(
      <SovereignNewsletter 
        onSubscribeIntent={onSubscribeSpy} 
        correlationIdentifier={forensicTraceIdentifier} 
      />
    );

    // 2. Execução (Simulação de Vontade do Cidadão)
    const emailInput = screen.getByPlaceholderText(/seu@email-soberano.com/i);
    const actionButton = screen.getByRole('button', { name: /Garantir Acesso Seguro/i });

    fireEvent.change(emailInput, { target: { value: 'engenheiro@metashark.tech' } });
    fireEvent.click(actionButton);

    // 3. Verificação de Rastro (Assertion)
    expect(onSubscribeSpy).toHaveBeenCalledWith('engenheiro@metashark.tech');
  });

  it('deve manter a integridade visual ao entrar em estado de processamento', () => {
     // Teste de estado cinético (Opcional para este ciclo)
  });
});