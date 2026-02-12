 ARQUITETURA ATÔMICA UNITÁRIA (ZENITH EDITION)
Status: SUPREMO / MANDATÓRIO
Protocolo: OEDP-V6.5 - Self-Contained Sovereignty
I. A ANATOMIA DO APARATO
Todo "Lego" (Frontend ou Backend) deve residir em uma pasta própria com a seguinte hierarquia obrigatória:
A Lógica (Nome.tsx / Nome.ts): Execução pura do componente ou serviço.
O ADN (Nome.schema.ts): Validação Zod V4 com Branded Types e descrições para IA.
A Trindade Linguística:
Nome.pt-BR.json: Alma em Português.
Nome.es-ES.json: Alma em Espanhol.
Nome.en-US.json: Alma em Inglês.
A Porta (index.ts): Barrel export para manter a limpeza das importações.
II. REGRAS DE OURO DE ENGENHARIA
Zero Any Policy: Proibido o uso de any. Use unknown com schema.parse().
Higiene Lexical: Proibido abreviações. O código deve ser uma narrativa técnica militar.
Injeção de Telemetria: Todo aparato deve invocar o SovereignLogger no seu ciclo de vida.
Resiliência Forense: Uso obrigatório de SovereignError para capturar falhas estruturais.
