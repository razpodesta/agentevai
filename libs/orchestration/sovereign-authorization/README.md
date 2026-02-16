# ⚖️ Sovereign Authorization: O Búnquer da Lei
**Protocolo:** OEDP-V7.0 Zenith  
**Role:** LAW_ENFORCEMENT

## 📖 Visão e Propósito
Este é o cérebro legislativo do projeto. Ele isola a lógica de "Direito de Ação". Ele é o único que decide se um rastro de identidade pode executar um comando (ex: `seal_news`, `delete_complaint`).

## 🧬 Lógica e Especialização
- **Mudança de Lógica:** Erradicamos o uso de `if(user.role === 'ADMIN')`. Agora o sistema consulta a `PermissionAduana`.
- **Sanções:** Implementa a lógica de "Silenciamento de Borda". Se o `gamification-engine` reporta Standing negativo, este workspace "tranca" fisicamente as funcionalidades do usuário.

## 🧱 Anatomia de Subpastas
- `/lib/aduana/`: Interceptores de ação (`PermissionAduana.ts`).
- `/lib/matrix/`: Mapa de permissões por Nível de Garantia (IAL).
- `/lib/sanctions/`: Lógica de restrição operativa por comportamento errático.