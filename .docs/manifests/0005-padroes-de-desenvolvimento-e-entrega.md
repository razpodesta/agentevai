📜 Manifesto de Convenções de Programação e Entrega de Aparatos
1. Arquitetura de Workspaces e Fronteiras (Nx)
Utilizaremos um sistema de Tags e Restrições de Módulo rigoroso para evitar o "acoplamento espaguete".
type:ui: Aparatos atômicos (sem lógica de negócio).
type:feature: Componentes inteligentes que orquestram aparatos de UI.
type:data-access: Lógica de fetching, serviços e persistência.
type:util: Helpers e scripts (ex: compilador de dicionários).
type:domain: Regras de negócio puras e tipos globais.
Regra de Ouro: Uma biblioteca type:ui nunca pode importar de uma type:feature.
2. Anatomia de um "Aparato" (Componente Atômico)
Cada aparato é uma unidade autossuficiente e deve conter:
Código Fonte (.tsx): Lógica de apresentação pura.
Estilização (.styles.ts ou Tailwind): Responsividade e variantes (Light/Dark).
Esquema de Tradução (.schema.json): Fragmento granular de dicionário para o idioma.
Barril (index.ts): Exportação limpa do aparato.
Exemplo de Estrutura de Diretório Relativa:
libs/shared/ui-kit-atoms/src/lib/public-action-button/
PublicActionButton.tsx
PublicActionButton.schema.json
index.ts
3. Padrões de Codificação (Clean Code & SOLID)
Erradicação de Abreviações: Nomes de variáveis e funções devem ser autodescritivos.
❌ auth, btn, userMsg.
✅ authentication, button, userMessageContent.
Zero any Policy: Uso estrito de TypeScript. Qualquer uso de any resultará em erro de linting.
Single Responsibility (SOLID): Se um componente faz mais de uma coisa, ele deve ser refatorado em dois.
DRY (Don't Repeat Yourself): Lógicas repetidas devem ser extraídas para a libs/shared/util-*.
4. Sistema de Internacionalização Granular (Apparatus-I18n)
Cada aparato nasce internacionalizado.
O arquivo [ApparatusName].schema.json conterá as chaves de tradução apenas para aquele componente.
O i18n-Compiler Script irá varrer o monorepo, coletar esses fragmentos e montar o dicionário final por país/estado.
5. Qualidade e Testes (Mirrored Testing)
Eslint: Uso exclusivo do eslint.config.js (Flat Config).
Jest/Vitest: As baterias de testes não ficarão junto ao código fonte. Elas serão localizadas em uma pasta raiz tests/ que espelha a estrutura do projeto.
Ex: apps/web/src/app/page.tsx -> tests/apps/web/src/app/page.test.tsx.
6. Padrão de Comentários e Documentação
Todo arquivo deve começar com a rota relativa comentada e usar TSDoc com metadata de autor "Raz Podestá - MetaShark Tech"para descrever propriedades, logica, estructura e comportamentos.
