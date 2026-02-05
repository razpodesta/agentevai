# ADR 0001: Arquitectura Híbrida Clean-Hexagonal-DDD

## Estado
Aceptado

## Contexto
Agentevai requiere escalabilidad para múltiples países (Brasil inicialmente), una sección de comunidad altamente interactiva y un sistema de denuncias basado en geolocalización. El enfoque debe ser modular para permitir la reutilización de "aparatos" (componentes).

## Decisión
Implementaremos un Monorepo Nx siguiendo el patrón **Enterprise-DDD**:
1. **Dominio (Domain):** Lógica de negocio pura, sin dependencias externas.
2. **Infraestructura (Infrastructure):** Adaptadores para Supabase, NestJS, Redis.
3. **Aplicación (Application):** Casos de uso que orquestan el flujo de datos.
4. **Capa de Presentación (Aparatos Atómicos):** Componentes React puros siguiendo Atomic Design.

## Consecuencias
- Curva de aprendizaje inicial mayor.
- Desacoplamiento total: Podemos cambiar el motor de búsqueda o la base de datos sin tocar la lógica de noticias.
- Facilidad para tests unitarios y de integración.

--


