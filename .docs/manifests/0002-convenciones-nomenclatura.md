# ADR 0002: Estándares de Código y Nomenclatura

## Regla de Oro: "Zero Abbreviations"
Queda estrictamente prohibido el uso de abreviaciones. El código debe leerse como prosa.
- ❌ `usr`, `auth`, `intl`, `msg`, `btn`.
- ✅ `user`, `authentication`, `internationalization`, `message`, `button`.

## Nomenclatura de Archivos y Variables
1. **Componentes (Aparatos):** `PascalCase` (Ej: `PublicComplaintCard.tsx`).
2. **Archivos de Lógica/Funciones:** `camelCase` (Ej: `calculateUserReputation.ts`).
3. **Carpetas/Directorios:** `kebab-case` (Ej: `libs/shared/user-interface`).
4. **Constantes:** `UPPER_SNAKE_CASE` (Ej: `MAXIMUM_RETRY_ATTEMPTS`).
5. **Interfaces/Types:** `PascalCase` con nombres descriptivos (Ej: `UserAuthenticationResponse`).

## Estructura de "Aparatos" (Componentes Atómicos)
Cada aparato debe tener su propio "barril" (`index.ts`) para exportación limpia:
`ui-button/`
  ├── `Button.tsx`
  ├── `Button.styles.ts` (Tailwind logic)
  ├── `Button.spec.ts` (Tests)
  └── `index.ts`

  ---

  