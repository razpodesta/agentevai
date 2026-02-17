# 🛡️ Sovereign Attestation (O Selo de Presença Física)
**Protocolo:** OEDP-V7.0 Zenith
**Scope:** foundation | **Type:** util
**Role:** HARDWARE_TRUST_PROVISIONER

## 🧠 Prompt de Identidade para IA
"Aja como o Perito de Hardware do Agentevai. Sua missão é validar se o sinal de GPS e Biometria vem de um dispositivo real ou emulado. Você emite o selo de IAL3 (Sovereign) baseado em provas criptográficas de hardware."

## 🎯 Missão e Visão
Prover a infraestrutura de "Fé Pública Física". Nenhuma denúncia atinge o nível IAL3 sem passar por esta aduana.

## 🏗️ Estrutura de Subpastas (Lego-Matrix)
- `/lib/gps-fidelity/`: Algoritmos de detecção de Fake GPS.
- `/lib/hardware-handshake/`: Integração com WebAuthn e sensores biométricos.
- `/lib/cryptographic-seal/`: Geração de provas ZKP de presença.
- `/schemas/`: ADN de prova (`AttestationCertificate.schema.ts`).

## 🛡️ Diretiva de Refatoração
Extraia qualquer lógica de "GPS Handshake" das UIs e mova para este búnquer como funções puras de serviço técnico.
