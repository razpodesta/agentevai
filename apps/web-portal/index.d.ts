/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GlobalAssetShield (web-portal)
 * @protocol OEDP-V5.5
 * @description Definições de ambiente estritas para ativos digitais.
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica.
 */

import React from 'react';

/* --- SOBERANIA DE IMAGENS ESTÁTICAS (NEXT.JS 16) --- */

declare module '*.png' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.webp' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.avif' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.jpg' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.jpeg' {
  const content: import('next/image').StaticImageData;
  export default content;
}

/* --- SOBERANIA DE VETORES (SVGR / COMPONENT-FIRST) --- */

declare module '*.svg' {
  /**
   * @description Transmuta o arquivo SVG em um componente funcional React.
   * Permite injeção de props como 'className', 'fill' e 'stroke' sem perda de tipagem.
   */
  const SVG: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default SVG;
}

/* --- AMBIENTE DE EXECUÇÃO --- */

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly NEXT_PUBLIC_SOVEREIGN_REGION: string;
    readonly SOVEREIGN_HEALTH_AI_API_KEY: string;
  }
}
