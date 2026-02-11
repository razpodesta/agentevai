/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SectionGeometryMatrix
 * @protocol OEDP-V6.0
 * @description Repositório imutável de resoluções geométricas para layouts editoriais.
 */

/** 
 * @section Registro de Malhas
 * CURA TS7053: Mapeamento indexável via chaves literais para compatibilidade nominal.
 */
export const SECTION_GEOMETRY_MATRIX: Readonly<Record<string, string>> = Object.freeze({
  NATIONAL_ZENITH: "grid-cols-1",
  REGIONAL_PULSE: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  INVESTIGATIVE_VAULT: "grid-cols-1 lg:grid-cols-12 gap-12",
  COMMUNITY_THREAD: "flex flex-col gap-6"
});