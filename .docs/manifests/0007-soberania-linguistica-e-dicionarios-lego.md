📜 Manifesto de Soberania Linguística e Dicionários Lego
1. O Princípio da Fragmentação Soberana
Cada aparato (Lego) é dono de sua própria semântica. A internacionalização não é um "anexo" global, mas uma propriedade intrínseca do componente. Para garantir a máxima granularidade e evitar conflitos em ambientes de larga escala, cada idioma possui seu próprio arquivo de definição dentro do diretório do aparato.
2. Anatomia de Arquivos do Aparato (Padrão Elite)
A estrutura de pastas de um aparato deve seguir rigorosamente esta hierarquia, garantindo que o Internationalization-Compiler localize as peças para a montagem do dicionário.
Rota Geográfica do Aparato:
libs/{domain}/{library-type}-{name}/src/lib/{apparatus-name}/
Arquivos Obrigatórios:
{ApparatusName}.tsx: Lógica e estrutura do componente.
{ApparatusName}.pt.schema.json: Fragmento exclusivo para Português (Brasil).
{ApparatusName}.es.schema.json: Fragmento exclusivo para Espanhol (Espanha/Latam).
{ApparatusName}.en.schema.json: Fragmento exclusivo para Inglês (Global).
index.ts: O barril de exportação.
3. Padrão de Conteúdo dos Schemas (O Contrato Lego)
Os arquivos .schema.json devem conter apenas as chaves necessárias para o aparato, utilizando nomes de chaves sem abreviações.
Exemplo de Contrato (MainHeader.pt.schema.json):
code
JSON
{
  "MainHeader": {
    "navigationNewsLabel": "Notícias",
    "navigationCommunityLabel": "Comunidade",
    "searchPlaceholder": "Buscar denúncias públicas..."
  }
}
4. O Processo de Compilação e Destino (Output Strategy)
O Internationalization-Compiler atua como uma esteira de montagem industrial. Ele varre o monorepo e consolida os fragmentos em Diretórios Soberanos de Saída na aplicação de fachada.
Rota de Destino (Consolidação Final):
apps/web-portal/public/locales/{language-code}/dictionary.json
Vantagem: O navegador carrega apenas o dictionary.json do idioma ativo, reduzindo o Payload inicial em 66%.
Isolamento: Erros em um schema de Espanhol não afetam a disponibilidade do dicionário de Português.
5. Convenções de Nomenclatura e Tipagem
Cero Abreviações: Internationalization (Sim), i18n (Não). LanguageSelection (Sim), langSel (Não).
Consumo: O aparato consome as chaves através de um hook de tradução que aponta para o seu próprio namespace (MainHeader.navigationNewsLabel).

---

