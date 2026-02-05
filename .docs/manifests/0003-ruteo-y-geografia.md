# ADR 0003: Estructura de Rutas y Multi-tenancy

## Jerarquía de URLs
El sistema debe soportar una navegación granular para Brasil y otros países:
`/[countryCode]/[stateCode]/[citySlug]/[category]/[contentSlug]`

### Ejemplos:
- `/br/sp/sao-paulo/noticias/inundacion-centro`
- `/br/rj/paraty/denuncias/seguridad-publica`

## Internacionalización Granular
1. **Schemas JSON:** Ubicados en `libs/shared/internationalization/locales/[countryCode]/[apparatusName].json`.
2. **Diccionarios Dinámicos:** Un script transformará estos JSONs en tipos TypeScript para evitar errores en tiempo de compilación.
3. **Detección de IP:** El sistema detectará la IP para sugerir el estado/país, pero el usuario podrá forzar el cambio globalmente.

---


