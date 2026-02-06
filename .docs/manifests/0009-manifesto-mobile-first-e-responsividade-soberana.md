Manifesto 0009: Design Mobile-First e Engenharia Responsiva
Autor: Raz Podestá - MetaShark Tech
Projeto: Agentevai
Status: Vital / Em vigor
1. A Filosofia: Mobile-First, Content-Always
No Brasil, o acesso à informação é majoritariamente via dispositivos móveis. Portanto, o Agentevai não é "adaptado" para celular; ele é nascido no celular e expandido para o desktop.
1.1. Hierarquia de Desenvolvimento
Mobile (320px - 480px): Foco em legibilidade e performance de rede (3G/4G).
Tablet (481px - 1024px): Reorganização em colunas (Grids).
Desktop (1025px+): Expansão de metadados e enriquecimento visual (Layout de Jornal).
2. Padrões de Layout e Visualização (Tailwind)
Utilizaremos o sistema de Utility-First do Tailwind CSS com a lógica de prefixos positivos (o estado padrão é sempre mobile).
2.1. Touch-First Design
Áreas de Toque: Todo "Lego" interativo (botões, links, ícones) deve ter uma área mínima de clique de 44x44px para evitar erros de navegação.
Gestos Nativos: Implementação de swipe para galerias de fotos e fechamento de modais, simulando a experiência de um aplicativo nativo.
2.2. Fluid Typography (O Poder do clamp)
Não usaremos tamanhos fixos. A tipografia deve "respirar" de acordo com a largura da tela.
Fórmula: font-size: clamp(min, preferred, max);
Aplicação: Um título H1 pode variar de 2rem no celular a 4rem no desktop sem breakpoints bruscos.
3. Estratégia de "Aparatos" Lego Responsivos
Cada Lego deve ser autônomo em sua responsividade (Container Queries).
Princípio: O componente não deve saber o tamanho da tela, mas sim o tamanho do "container" onde ele foi inserido.
Vantagem: Um card de notícia pode se comportar como uma lista (mobile) quando está na sidebar ou como um banner (hero) quando está no centro da página.
4. Performance e Imagens Adaptativas
Performance é um pilar da responsividade. Uma página lenta é uma página "quebrada" no mobile.
Next.js Image Optimization: Uso obrigatório do componente next/image com a propriedade sizes.
Lógica de Carregamento:
Mobile: Imagens WebP comprimidas, carregamento priorizado apenas para o fold.
Desktop: Versões em alta resolução (Retina ready).
Zero Layout Shift (CLS): Reservar o espaço dos skeletons e imagens antes do carregamento para evitar saltos de conteúdo.
5. Navegação Soberana Multi-plataforma
5.1. O "Thumb Zone"
Os elementos mais importantes (Denunciar, Buscar, Home) devem estar ao alcance do polegar no mobile (Navigation Bar inferior ou FAB - Floating Action Button).
5.2. Adaptive Headers
Mobile: Header minimalista com Logotipo centralizado e Menu Hambúrguer à esquerda.
Desktop: Header completo com navegação horizontal, seletor de idiomas e busca expandida.
6. Exemplo Prático de Implementação (Lego Responsivo)
// libs/foundation/design-system/src/lib/news-card/NewsCard.tsx
code
Tsx
/**
 * Raz Podestá - MetaShark Tech
 * Aparato: NewsCard (Responsividade Síncrona)
 */

import React from 'react';
import Image from 'next/image';

export const NewsCard: React.FC<NewsCardProperties> = ({ title, excerpt, imageUrl }) => {
  return (
    <article className="flex flex-col gap-4 p-4 border-b md:flex-row md:items-center lg:p-6 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900">
      {/* Imagem com Proporção Adaptativa */}
      <div className="relative aspect-video w-full md:w-48 lg:w-64 flex-shrink-0">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill 
          className="object-cover rounded-sm"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 200px, 300px"
        />
      </div>

      {/* Conteúdo com Tipografia Fluida */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-serif font-bold leading-tight text-brand-sovereign dark:text-white">
          {title}
        </h2>
        <p className="hidden md:block text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {excerpt}
        </p>
      </div>
    </article>
  );
};

---

