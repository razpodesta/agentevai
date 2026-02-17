MANIFESTO 0029: PROTOCOLO DE DESACOPLAMENTO ATÔMICO ZENITH
Status: MANDATÓRIO
Doutrina: Molecular Decentralization (SRP God Tier)
Anatomia da Célula de Lógica: Todo aparato, ao ser transmutado ou criado, deve obrigatoriamente residir em seu próprio subdiretório com a seguinte estrutura física:
[ApparatusName].ts(x) ➔ O corpo lógico (Responsabilidade Única).
schemas/[ApparatusName].schema.ts ➔ O ADN (Zod V4 Branded).
i18n/[pt-BR|es-ES|en-US].json ➔ A alma (Trindade Linguística).
Soberania de Exportação: Subdiretórios não possuem index.ts. O único ponto de exportação é o index.ts na raiz da biblioteca (libs/[layer]/[workspace]/src/index.ts), que deve mapear explicitamente os membros selados.
Higiene Inter-Workspace: Ao extrair lógica de um Realm para um Workspace de Orquestração (ex: de Identity para Registry Vault), o aparato original deve ser purificado para tornar-se um consumidor passivo, eliminando a radiação de regras de negócio internas.
Zero Regressão: Nenhuma refatoração será executada sem a análise prévia do código fonte atual e de seus consumidores no grafo de dependências do Nx.

LA IA CADA VEZ QUE DETECTE QUE UN APARATO NO CUMPLE CON ESTA DIRECTIVA OFRECERA NIVELAR EL APARATO CREANDO EL SUDDIRECTORIO Y CONTENIDO, EL INDEX ES GENERAL PARA TODO EL WORKSPACE YE STA EN LA BASE DEL WORKSPACE. DEBE EXISTIR CORRELACION DE COMBRE ENTRE EL APARATO SU SCHMEMA Y SUS JSONS SIEMPRE. LA IA OFRECERA COMANDO MD PARA MOFIFICAR LOS NOMBRES Y CUIDARA DE LAS IMPORTACIONES Y APARATOS QUE LOS CONSUMEN. SIEMPRE PEDIRA EL CODIGO ANTES DE REFACTORIAR CUALQUIER APARATO Y AL ENTREGAS SERAN GRANULARES, UNO A UNO POR APARATO O POR WORKSPACE SIEMRPRE ORTIMIZANDO PROACTIVAMENTE PREVIA OBLIGFACION OBLIGATORIA E IMPLEMENTANDO MEJORAS QUE DETECTE EN ESA REFACTORIZACION, VISION HIPER HOLISTICA, SIN REGRESIONES, DE ELITE. APARATOS SIEMPRE COMPLETOS LISTOS PARA COPIAR YU PEGAR EN PRODUCCION.

### III. SOBERANIA LINGUÍSTICA GRANULAR (O PADRÃO BUNKER)
Para garantir a isolação total de rastro e evitar colisões em builds massivos, a estrutura de internacionalização deve seguir a anidação profunda obrigatória:

Estrutura Física:
[ApparatusName]/
├── i18n/
│   ├── pt-BR/
│   │   └── [ApparatusName].pt-BR.json
│   ├── es-ES/
│   │   └── [ApparatusName].es-ES.json
│   └── en-US/
│       └── [ApparatusName].en-US.json

Justificativa de Elite:
1. Escalabilidade: Permite que o compilador ignore diretórios inteiros de idiomas não solicitados no rastro de build.
2. Organização: Facilita a manutenção por tradutores nativos sem tocar na lógica do aparato.
3. SSOT: O arquivo JSON porta o nome do aparato, reforçando o vínculo de propriedade.

---


