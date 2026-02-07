/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GlobalAssetShield (admin-cms)
 * @protocol OEDP-V5.5
 * @description Definições de ambiente estritas para o cockpit de moderação.
 */

import React from 'react';

/* --- SOBERANIA DE ATIVOS --- */

declare module '*.svg' {
  const SVG: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default SVG;
}

declare module '*.png' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.webp' {
  const content: import('next/image').StaticImageData;
  export default content;
}

/* --- EXTENSÕES DE AUDITORIA --- */

declare module '*.json' {
  const value: Readonly<Record<string, unknown>>;
  export default value;
}
