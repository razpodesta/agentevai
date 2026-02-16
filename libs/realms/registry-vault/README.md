# 🏛️ Registry Vault: O Cartório de Identidade e Preferências
**Protocolo:** OEDP-V7.0 Zenith  
**Responsável:** Raz Podestá (MetaShark Tech)  
**Role:** DATA_SSOT (Single Source of Truth)

## 📖 Visão e Propósito
O `registry-vault` é o búnquer de persistência bruta do ecossistema. Ele transmuta a identidade civil em rastro digital protegido. Sua criação resolve a **Obesidade de Identidade**: separamos "Quem é o Ator" (Dados) de "O que o Ator pode fazer" (Autorização).

## 🧬 Lógica e Especialização
Diferente do antigo `identity-domain`, este workspace não possui lógica de permissões. Ele é um **Repositório de Fatos**.
- **Mudança de Lógica:** As preferências de UI (Obsidiana/Milk) e avatares saem da App e morrem aqui, permitindo que o cidadão mantenha sua "fase lumínica" em qualquer rastro do enxame.

## 🧱 Anatomia de Subpastas
- `/lib/actors/`: Sub-búnqueres para `citizen`, `authority`, `enterprise` e `advertiser`.
- `/lib/biometrics/`: Rastro de validação IAL3 (hashes faciais/documentais).
- `/lib/preferences/`: Configurações de interface e ruteamento preferido.
- `/lib/schemas/`: ADN nominal (`ActorPassport.schema.ts`).

## 🛡️ SOLID & DRY
- **SRP:** Responsabilidade única de armazenar e validar dados brutos.
- **Decoupled:** Não conhece o motor de gamificação nem o sistema de autorização.