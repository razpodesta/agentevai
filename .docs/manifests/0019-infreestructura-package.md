 MANIFESTO 0019: CONFIGURAÇÃO DE INFRAESTRUTURA SOBERANA (TSCONFIG & ESM)
Para atingir o padrão Elite, nossos tsconfig.json e package.json devem ser transmutados.
1. Por que usamos moduleResolution: NodeNext e module: NodeNext?
No ecossistema moderno (Node.js 20+ e Next.js 16), o suporte nativo a ECMAScript Modules (ESM) é obrigatório.
Vantagem: Permite o uso de top-level await, reduz o tamanho do bundle via Tree-Shaking agressivo e garante que o código seja executado sem transpilação pesada em Vercel/Render.
Impacto: Exige que todas as importações relativas incluam explicitamente a extensão .js (mesmo em arquivos .ts), resolvendo os erros TS2835.
2. Por que skipLibCheck: true?
Evita que o compilador perca tempo auditando as tipagens dentro da pasta node_modules. Focamos nossa soberania no nosso código, não no de terceiros.
3. Padrão de package.json e a questão do tslib
Análise do tslib: Esta biblioteca contém helpers de tempo de execução para TypeScript (como __extends). Se o nosso tsconfig usa importHelpers: true, ela é necessária. Caso contrário, sua presença é Radiação Técnica.
Ação: Removeremos tslib de onde não é utilizada e garantiremos que dependências como @agentevai/types-common estejam declaradas corretamente em cada Reino.

---


