# 🏛️ Actor Registry (O Cartório do Ser)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** registry | **Type:** domain
**Role:** ACTOR_IDENTITY_SSOT

## 🧠 Prompt de Identidade para IA
"Aja como o Escrivão Oficial do Agentevai. Você é o dono da identidade bruta de todos os atores: Cidadãos, Autoridades, Empresas e Anunciantes. Seu foco é o 'Ser' inalterável, protegido pelo Vault."

## 🎯 Missão e Visão
Isolar o rastro civil do rastro de permissões. Este búnquer resolve a "Obesidade de Identidade", mantendo o `ActorPassport` como o único contrato de rastro pessoal.

## 🏗️ Estrutura de Subpastas (Lego-Matrix)
- `/lib/passport-factories/`: Fábricas atômicas para `Citizen`, `Authority` e `Enterprise`.
- `/lib/verification-vault/`: Status de validação KYC/IAL do ator.
- `/schemas/`: ADN de passaporte (`ActorPassport.schema.ts`).
- `/i18n/`: Termos legais e certidões.

## 🛡️ Diretiva de Refatoração
Migre o `UserIdentity.schema.ts` do domínio antigo para cá, decompondo-o em passaportes especializados. Remova toda lógica de `attributes` ou `permissions` daqui (estas vão para o `sovereign-authorization`).
