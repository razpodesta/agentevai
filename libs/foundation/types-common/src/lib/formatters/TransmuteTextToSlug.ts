/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteTextToSlug
 * @version 1.0.0
 * @protocol OEDP-V5.5 - High Performance String Processing
 * @description Transmuta strings complejos (con acentos y caracteres especiales)
 * en slugs amigables para ruteamiento geográfico y SEO.
 */

/**
 * @name TransmuteTextToSlug
 * @function
 * @description Algoritmo atómico de normalización y sanitización.
 *
 * @param {string} text - El texto bruto (Ej: "São Paulo").
 * @returns {string} El slug purificado (Ej: "sao-paulo").
 */
export const TransmuteTextToSlug = (text: string): string => {
  if (!text) return '';

  return text
    .normalize('NFD') // Descompone caracteres acentuados (Ej: "ã" -> "a" + "~")
    .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (acentos)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '-') // Sustituye caracteres no alfanuméricos por guiones
    .replace(/-+/g, '-') // Elimina guiones duplicados
    .replace(/^-|-$/g, ''); // Elimina guiones al inicio o al final
};
