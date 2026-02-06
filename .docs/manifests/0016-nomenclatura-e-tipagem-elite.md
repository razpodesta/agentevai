// .docs/manifests/0016-nomenclatura-e-tipagem-elite.md
I. Convenção de Identificadores
Componentes/Aparatos: PascalCase (ex: SovereignHeader).
Arquivos de Lógica/Funções: PascalCase (Seguindo o Manifesto 0015 de funções atômicas).
Variáveis e Propriedades: camelCase (ex: isLocationActive).
Pastas e Workspaces: kebab-case (ex: ui-kit-atoms).
Interfaces de Propriedades: ApparatusNameProperties (ex: SovereignHeaderProperties).
Esquemas Zod: ApparatusNameSchema.
II. Regras de Ouro de Tipagem
Zero Any: O uso de any desativa a inteligência de autocura. Use unknown + Zod safe parsing.
Zero Abreviaturas: identifier (Sim), id (Não, exceto em UUIDs técnicos). request (Sim), req (Não).
Readonly por Padrão: Todas as interfaces de dados devem ser readonly para evitar efeitos colaterais.