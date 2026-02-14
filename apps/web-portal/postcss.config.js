/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PostCSSConfigZenith
 * @version 6.5.0
 * @protocol OEDP-V6.5
 * @description Configuração de motor CSS para Tailwind v4.
 * CURADO: Migração para o plugin CSS-first e erradicação de referências v3.
 */

module.exports = {
  plugins: {
    // Na v4, o plugin extrai a configuração diretamente do seu global.css
    '@tailwindcss/postcss': {},
    // Essencial para suporte a navegadores antigos em conformidade com o Manifesto 0009
    'autoprefixer': {},
  },
};
