Manifesto 0008: Branding, Tipografia e Semântica de Denúncias
Autor: Raz Podestá - MetaShark Tech
Status: Vital / Em vigor
Escopo: libs/foundation/design-tokens & apps/web-portal
1. Tipografia Soberana (Google Fonts)
Utilizaremos o pacote @next/font para garantir performance de elite e zero CLS (Cumulative Layout Shift). A escolha tipográfica reflete a fusão entre a autoridade do jornalismo clássico e a agilidade da tecnologia.
1.1. Escala Tipográfica
Títulos (Display/Headlines): Lora (Serif). Transmite peso, tradição e veracidade.
Corpo de Texto (Body): Inter (Sans-Serif). Focada em legibilidade extrema e conforto visual em longas leituras.
Metadados e Fontes: JetBrains Mono (Monospace). Usada para registros técnicos, timestamps e citações de fontes.
Nível	Tamanho (px)	Line-Height	Uso Sugerido
H1	48px	1.1	Título de Notícia Principal
H2	36px	1.2	Títulos de Seções / Denúncias em destaque
H3	24px	1.3	Subtítulos de reportagem
H4	20px	1.4	Títulos de Cards de Comunidade
P (Body)	18px	1.6	Texto de leitura (Padrão Elite)
Small	14px	1.5	Citação de fontes e legendas de fotos
2. Paleta de Cores e Semântica Dia/Noite
A paleta foi desenhada para reduzir o cansaço visual e destacar os elementos de interação.
2.1. Núcleo Institucional
Soberania (Primary): Light: #00274D | Dark: #00E5FF (Ciano de IA).
Superfície (Background): Light: #F9FAFB | Dark: #020617 (Deep Ink).
2.2. Semáforo de Denúncias (Semantic Compliance)
O sistema de cores das denúncias segue a convenção internacional de segurança e status, adaptada para acessibilidade visual (alto contraste).
Status	Cor HEX	Significado	Comportamento IA
🔴 Crítica	#DC2626	Perigo imediato, corrupção ativa, risco à vida.	Prioridade máxima no feed e notificação push.
🟡 Em Análise	#F59E0B	Denúncia em fase de coleta de apoio ou verificação.	Aguardando validação de IA e comunidade.
🟢 Resolvida	#16A34A	Problema solucionado ou autoridade respondeu.	Arquivada em "Casos de Sucesso".
🔵 Informativa	#2563EB	Sugestão de melhoria ou aviso comunitário.	Baixo peso de urgência.
3. Diagramação e Layout Jornalístico
O layout segue uma grade de 8px (Soft Grid) com foco em espaço negativo para evitar a sobrecarga de informações.
3.1. Estrutura de Reportagem
Lead (Cabeçalho): Título H1 + Data + Autor + Tag de Localização (Estado/Cidade).
Corpo Dinâmico: Uso de drop-cap na primeira letra para estética de jornal.
Links Contextuais: Palavras-chave dentro do texto devem ser sublinhadas em Action Cyan (#00E5FF) e apontar para notícias relacionadas via roteamento dinâmico.
Citação de Fontes: Localizada ao final do artigo, em tipografia Small e JetBrains Mono, com recuo à esquerda e cor suavizada.
---
- Logo Font (Canva/Google): Playfair Display Bold
- Logo Primary Hex: #001529 (Sovereign Navy Blue)
- Logo Scale Ratio: 4:1 (Horizontal Wordmark)

---

1. Refinamento no Canva (O Visual de Elite)
Para que a frase "Florianópolis em ação" tenha o impacto correto sob o logo principal:
Tipografia: Use Lora ou Playfair Display em Itálico.
Estilo: "A GENTE VAI" (Maiúsculo, Negrito, Sério) contrastando com "Florianópolis em ação" (Tamanho menor, elegante, em movimento).
Cor: Use o nosso Action Cyan (#00E5FF) para a palavra "ação" ou para toda a frase secundária. Isso cria um ponto de luz que guia o olhar do usuário.
Diagramação: Alinhe à direita abaixo do "VAI" (como você fez na imagem) ou centralizado logo abaixo, com um leve espaçamento entre letras (tracking).
⚛️ 2. O Aparato Lego: SovereignHeaderBranding
Vamos criar o "Lego" que gerencia essa marca. Ele será inteligente: se não detectar a cidade, ele mostra um padrão (ex: "Brasil em ação"), mas quando detecta, ele personaliza.
// libs/foundation/design-system/src/lib/sovereign-header-branding/SovereignHeaderBranding.tsx
code
Tsx
/**
 * Raz Podestá - MetaShark Tech
 * Aparato: SovereignHeaderBranding
 * Localización: Florianópolis em ação (Exemplo dinâmico)
 */

import React from 'react';
import { motion } from 'framer-motion';

interface SovereignHeaderBrandingProperties {
  cityName: string; // Ex: "Florianópolis"
  countryCode: 'br' | 'es' | 'us';
}

export const SovereignHeaderBranding: React.FC<SovereignHeaderBrandingProperties> = ({
  cityName,
  countryCode
}) => {
  return (
    <div className="flex flex-col items-start lg:items-center">
      {/* Logo Principal (Sólido, Estático) */}
      <h1 className="text-3xl md:text-4xl font-serif font-black tracking-tighter text-white">
        A GENTE VAI
      </h1>

      {/* Subtítulo Dinâmico (Empático, Animado) */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2"
      >
        <span className="h-[1px] w-4 bg-brand-action hidden md:block" />
        <p className="font-serif italic text-sm md:text-base text-brand-action font-medium">
          {cityName} em ação
        </p>
      </motion.div>
    </div>
  );
};
🌍 3. O Schema de Internacionalização Geográfica
Para que o script de i18n saiba como traduzir "em ação" para outros países (Multi-tenancy):
// libs/foundation/design-system/src/lib/sovereign-header-branding/SovereignHeaderBranding.pt.schema.json
code
JSON
{
  "SovereignHeaderBranding": {
    "actionSuffix": "em ação"
  }
}
// libs/foundation/design-system/src/lib/sovereign-header-branding/SovereignHeaderBranding.es.schema.json
code
JSON
{
  "SovereignHeaderBranding": {
    "actionSuffix": "en acción"
  }
}
🧬 4. Visão 360: A Conexão com a IA
O nosso AI-Oracle-Core (Ponto 12) usará os dados de geolocalização do Sovereign Logger para decidir qual cidade exibir. Se o usuário estiver em movimento (ex: viajando de Florianópolis para Curitiba), o portal se "auto-regenera" visualmente para Curitiba, criando uma sensação de onipresença e cuidado.

---

