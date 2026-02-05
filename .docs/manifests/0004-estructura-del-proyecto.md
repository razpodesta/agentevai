📂 ESTRUCTURA GENERAL DEL PROYECTO (NX WORKSPACE)
1. Capa de Gobernanza y Fundamentos (Foundation)
1.1. Workspace Configuration: Definición de nx.json, reglas de linting estricto (no-abbreviations), y políticas de dependencias entre librerías (Project Constraints).
1.2. Theming Engine (Tailwind+): Configuración de tokens de diseño para modo Día/Noche, escalas tipográficas y paleta de colores corporativa.
1.3. Internationalization (i18n) Core:
Desarrollo del i18n-Compiler Script: Transformador de fragmentos JSON atómicos a diccionarios TypeScript constantes.
Middleware de detección de Geografía/Idioma basado en IP y URL.
1.4. Type System & Shared Interfaces: Contratos globales para modelos de datos (Noticia, Usuario, Denuncia, Comentario).

2. Sistema de Diseño de "Aparatos Atómicos" (Atomic UI/UX)
2.1. Atoms (Nivel 1): Componentes puros de responsabilidad única (Buttons, Inputs, Badges, Typography, Lucide-Icons, Flag-Icons).
2.2. Molecules (Nivel 2): Combinación de átomos (Search-Bar, Language-Switcher, User-Avatar-Group, Share-Action-Group).
2.3. Organisms: La Capa de Headers Granulares:
Global-Navigation-Header: Navegación principal nacional.
Regional-State-Header: Header dinámico con contexto de Estado (e.g., São Paulo, Bahia).
Community-Activity-Header: Enfoque en métricas sociales y hilos.
Safe-Complaint-Header: Header con modo "Denuncia Protegida" y tracking de IP visible.
2.4. Templates (Nivel 3): Layouts de rejilla periodística (Headline-Grid, Sidebar-Standard, Infinite-Feed-Layout).

3. Infraestructura y Backend (NestJS Hexagonal)
3.1. Domain Layer: Lógica pura de denuncias y noticias sin dependencias de frameworks.
3.2. Application Layer: Casos de uso (Publicar denuncia, Responder hilo, Seguir estado).
3.3. Infrastructure Layer (Adapters):
Supabase-Adapter: Persistencia de datos y Auth.
Redis-Adapter: Caché de diccionarios i18n y ranking de noticias.
Meilisearch-Adapter: Motor de búsqueda ultra-rápido granular.
3.4. Identity & Access Management (IAM): Integración OAuth con Facebook, Apple y Microsoft.

4. Capa de Datos y Estado (TanStack & Sockets)
4.1. Server-State Management: Configuración de TanStack Query para fetching, caching y optimización de mutaciones.
4.2. Real-Time Engine: Implementación de WebSockets para notificaciones de denuncias y actualizaciones de hilos en vivo.
4.3. Persistence Strategy: Sincronización de preferencias de usuario y país entre LocalStorage y Base de Datos.

5. Módulo de Inteligencia Artificial (AI Integration)
5.1. AI-Moderation-Pipeline: Filtro automático de lenguaje de odio y spam en comentarios.
5.2. AI-News-Optimizer: Generación de resúmenes automáticos (summaries) y etiquetas SEO basadas en el contenido.
5.3. Sentiment-Analysis-Service: Análisis de la percepción pública en las secciones de comentarios.

6. Módulo de Denuncia Pública y Geopolítica
6.1. Geo-Mapping Engine: Integración de mapas para visualización de focos de denuncias por ciudad.
6.2. User-IP-Security-Logger: Registro seguro y encriptado de metadatos de usuario (IP, User-Agent) exclusivo para usuarios logueados.
6.3. Evidence-Handling-System: Gestión de carga de archivos multimedia pesados (fotos/videos de denuncias) con CDN.

7. Monetización y SEO Estratégico
7.1. Dynamic-Ads-Injection: Sistema de inserción de publicidad granular basada en el estado/ciudad del usuario.
7.2. Premium-Subscription-Model: Lógica para acceso a reportes detallados de denuncias y navegación sin anuncios.
7.3. SEO-Metadata-Factory: Generación dinámica de OpenGraph y JSON-LD por cada noticia y estado.

📂 8. MÓDULO DE APOYO POPULAR Y REGISTRO INMUTABLE (BLOCKCHAIN-VERIFIED)
Este módulo se encarga de la creación, firma y auditoría de peticiones ciudadanas dirigidas a autoridades públicas, asegurando que cada firma sea única, rastreable e imposible de borrar o alterar.
8.1. Gestión de Documentos de Apoyo Popular (Popular Support Workspace)
8.1.1. Dynamic Letter Factory: Sistema de creación de cartas dirigidas a autoridades con placeholders variables (Nombre de autoridad, Cargo, Institución, Pliego de peticiones).
8.1.2. Authority Directory: Base de datos granular por estado/ciudad de funcionarios públicos y sus canales oficiales de recepción.
8.1.3. Support Metrics Engine: Contador en tiempo real de adhesiones con visualización de metas (e.g., "Faltan 500 firmas para enviar al Prefecto").
8.2. Sistema de Firma Electrónica Multifactor (Multi-Provider Signature)
8.2.1. OAuth Signature Validation: Vinculación de la firma al ID único de proveedor (Google, Microsoft, iTunes) para garantizar la identidad digital.
8.2.2. WhatsApp Signature Bridge: Validación de firma vía OTP (One-Time Password) o mensaje verificado a través de la API oficial de WhatsApp Business, capturando el número telefónico como metadato de validación.
8.2.3. Audit Trail Logger: Registro granular de:
Timestamp exacto (ISO 8601).
Hash de la IP (anonimizado para LGPD pero rastreable judicialmente).
Geolocalización declarada vs. detectada.
8.3. Infraestructura de Registro Inmutable (The Blockchain Ledger)
8.3.1. Cryptographic Hashing Strategy: Creación de un hash SHA-256 único por cada firma que combine el user_id + letter_id + timestamp.
8.3.2. Public Ledger Architecture:
Nivel 1 (On-chain): Registro del Merkle Root de las firmas en una red de bajo costo (Polygon o Starknet) para garantizar inmutabilidad pública.
Nivel 2 (Off-chain): Almacenamiento de las pruebas de firma en una base de datos PostgreSQL protegida con Row Level Security (RLS).
8.3.3. Transparency Explorer: Interfaz pública donde cualquier ciudadano puede verificar la autenticidad de su firma ingresando un código único, consultando el bloque de la blockchain sin necesidad de conocimientos técnicos.
8.4. Verificación y Entrega a Autoridades
8.4.1. Automated Certification PDF: Generador de certificados legales que resumen el apoyo popular, listando los hashes de las firmas y los métodos de validación utilizados.
8.4.2. Delivery Tracking: Registro de envío de la carta a la autoridad (vía email oficial o API) y seguimiento del estado de respuesta ("Recibido", "En Revisión", "Respondido").

📂 9. MÓDULO DE REACCIÓN SOCIAL Y SENTIMIENTO (INTERACTION ENGINE)
Este módulo gestiona la interacción trinitaria (Like, Dislike, Support) para noticias, comentarios y denuncias, proporcionando métricas de relevancia y validación ciudadana.
9.1. El Aparato de Reacción Trinitaria (Atomic Reaction Component)
9.1.1. Me Gusta (Positive Sentiment): Expresa afinidad con el contenido o la noticia.
9.1.2. Me Disgusta (Negative Sentiment): Expresa desacuerdo o rechazo. Útil para identificar noticias controversiales o conductas inapropiadas en la comunidad.
9.1.3. Apoio (Social Endorsement): La reacción de mayor peso. Representa respaldo ciudadano. En el caso de denuncias, el "Apoio" incrementa la visibilidad y prioridad del reporte en el dashboard de las autoridades.
9.2. Lógica de Negocio y Validación (Domain Rules)
9.2.1. Unique Interaction Policy: Un usuario solo puede tener una reacción activa por contenido (e.g., si apoya, se elimina el "me gusta" o "me disgusta").
9.2.2. Reputation Impact Engine:
Los "Apoyos" recibidos aumentan la reputación del denunciante.
Los "Disgustos" masivos activan una alerta para revisión por IA (moderación proactiva).
9.2.3. Anti-Manipulation Guard: Sistema de rate limiting por IP y cuenta para evitar ataques de bots en votaciones de denuncias críticas.
9.3. Implementación Técnica y Optimización (Performance & UX)
9.3.1. Optimistic UI Updates: Uso de TanStack Query para reflejar el cambio en la interfaz de forma instantánea antes de que la base de datos confirme la operación.
9.3.2. Real-Time Synchronization: Uso de Supabase Realtime (PostgreSQL Broadcast) para que el contador de apoyos se actualice en vivo para todos los usuarios que están viendo la misma noticia.
9.3.3. Reaction Metadata: Registro granular del timestamp, ubicación geográfica (estado/ciudad) y tipo de dispositivo desde donde se emitió la reacción.
9.4. Estética y Accesibilidad (Theming & UI)
9.4.1. Stateful Micro-animations: Animaciones sutiles (Framer Motion) al activar el botón de "Apoio" para dar una sensación de peso y acción significativa.
9.4.2. Day/Night Visual Feedback:
Modo Día: Colores sólidos (Azul para apoyo, Gris para neutralidad).
Modo Noche: Colores neón/glow (Cian para apoyo, Ámbar para advertencia).
9.4.3. Internationalization of Labels: Diccionarios específicos para cada país/idioma (e.g., "Apoiar" en BR, "Support" en US, "Apoyar" en ES).

📂 10. WORKSPACE DE VIRALIZACIÓN Y DIFUSIÓN OMNICANAL (VIRAL-ENGINE)
Este módulo automatiza la transformación de una noticia o denuncia en múltiples formatos (texto, imagen, video) y facilita su distribución masiva con fricción mínima.
10.1. Gestión de Metadatos Dinámicos (SEO & Social Graph)
10.1.1. Dynamic Open Graph Factory: Generación programática de etiquetas og:image, og:title y og:description adaptadas al contexto granular (País/Estado/Ciudad).
10.1.2. JSON-LD Schema Generator: Implementación de esquemas de datos estructurados para Google News y ricas previsualizaciones en redes sociales.
10.1.3. Smart URL Shortener & Tracker: Sistema interno para generar URLs cortas con parámetros de seguimiento (UTM) automáticos para medir qué plataforma genera más tráfico por cada denuncia.
10.2. Generación Automatizada de Activos Multimedia (Social Media Assets)
10.2.1. Dynamic Image Generation (OG-Edge): Generación en tiempo real (vía Vercel Edge Functions) de imágenes para compartir que incluyen:
Titular de la noticia.
Categoría (e.g., "Denuncia Pública").
Localización (e.g., "São Paulo, SP").
Marca de agua de Agentevai.
10.2.2. Video-Snippet Creator: Lógica para preparar clips de video cortos o miniaturas animadas compatibles con TikTok, Instagram Reels y YouTube Shorts.
10.2.3. Social-Text-Composer (AI Powered): Uso de IA para redactar automáticamente el "copy" o pie de foto ideal para cada red social (e.g., un tono profesional para X.com, un tono más visual y directo para WhatsApp).
10.3. Adaptadores de Compartición por Plataforma (Platform Adapters)
10.3.1. Web Share API Integration: Uso de la API nativa de dispositivos móviles para abrir el menú de compartir del sistema operativo con un solo toque.
10.3.2. Direct Messenger Bridges:
WhatsApp/Telegram: Formateo de mensajes con negritas, emojis y link de previsualización rica.
Email: Generación de plantillas HTML responsivas con el resumen de la noticia.
10.3.3. Deep Linking & App Intent: Configuración de enlaces que abren directamente la aplicación de Facebook, Threads o Instagram en el flujo de "Nueva Publicación" o "Stories".
10.4. Estrategia de Viralización por Formato
10.4.1. Story-Ready Layouts: Función para descargar o compartir una imagen vertical (9:16) optimizada para Instagram Stories con un código QR o link de "Apoyo".
10.4.2. Thread-Composer for X/Threads: Capacidad de fragmentar una noticia larga en una propuesta de "hilo" para redes sociales de texto.
10.4.3. Video-Overlay Engine: Preparación de capas (overlays) con datos de la denuncia para ser superpuestos en videos subidos por los usuarios a TikTok.

📂 11. WORKSPACE DE BUSCA GEOPOLÍTICA E DESCOBERTA (SEARCH-ENGINE-CORE)
Este módulo implementa uma busca "impecável e rápida", garantindo latência sub-milissegundo e relevância contextual para milhões de registros de notícias, denúncias e cartas de apoio popular.
11.1. Infraestrutura do Motor de Busca (Search Infrastructure)
11.1.1. Meilisearch Integration: Implementação do motor de busca open-source otimizado para busca textual instantânea (Search-as-you-type).
11.1.2. Multi-Index Architecture: Criação de índices separados e otimizados para:
news-index: Notícias e artigos de blog.
complaints-index: Denúncias públicas (priorizando status e gravidade).
popular-support-index: Cartas abertas e petições ativas.
geography-index: Estados, cidades e bairros para navegação rápida.
11.1.3. Synonyms & Typo Tolerance: Configuração de dicionários de sinônimos regionais brasileiros e tolerância a erros gramaticais para garantir que o usuário sempre encontre o que procura.
11.2. Filtros Granulares e Contexto Geográfico (Multidimensional Filtering)
11.2.1. Hierarchical Faceting: Sistema de filtros dinâmicos que se adaptam ao contexto:
Se o usuário busca por "Educação", os filtros mostram "[Nacional]", "[Estado: SP]", "[Cidade: Campinas]".
11.2.2. Geo-Ranking Strategy: Algoritmo de relevância que prioriza resultados baseados na localização detectada do usuário (IP/Geolocalização), mostrando primeiro o que acontece "perto de você".
11.2.3. Temporal Relevance: Priorização de notícias de última hora e denúncias urgentes em detrimento de conteúdos arquivados.
11.3. Busca Semântica Assistida por IA (AI Semantic Search)
11.3.1. Natural Language Processing (NLP): Capacidade de processar frases complexas (e.g., "Quais as denúncias de asfalto em Belo Horizonte nos últimos 3 meses?").
11.3.2. Vector Embeddings Integration: Uso de embeddings para encontrar conteúdos relacionados não por palavras-chave, mas por significado (e.g., buscar "buraco na rua" e encontrar resultados sobre "infraestrutura urbana").
11.3.3. Search Suggestion AI: Sugestões inteligentes baseadas em tendências de busca (Trending Topics) de cada estado específico.
11.4. Interface de Busca Atômica (Search UI Apparatus)
11.4.1. Global Command Palette: Interface estilo "Spotlight" (Cmd+K) para navegação rápida por todo o portal sem sair da página atual.
11.4.2. Instant Preview Cards: "Aparatos" de visualização rápida dentro do dropdown de busca, permitindo ler o resumo da notícia ou ver o status da denúncia sem clicar no link final.
11.4.3. Highlight Engine: Marcação visual precisa dos termos buscados dentro dos fragmentos de texto exibidos nos resultados.
11.5. Analytics e Insights de Busca (Search Business Intelligence)
11.5.1. Zero-Results Monitoring: Rastreamento de buscas sem resultados para identificar "buracos informativos" e pautar a criação de novas notícias ou investigações.
11.5.2. Heatmap of Interests: Mapa de calor das buscas mais realizadas por região, servindo como termômetro da insatisfação popular por estado.

 12. WORKSPACE DE INTELIGÊNCIA SEMÂNTICA E CONSOLIDAÇÃO (AI-ORACLE-CORE)
Este módulo é o responsável por processar, classificar, agrupar e validar cada interação, garantindo que o portal seja visto como uma fonte de dados de alta confiança por cidadãos, imprensa e autoridades.
12.1. Depuração e Refino de Consultas (Query Purification Engine)
12.1.1. Natural Language Sanitization: A IA atua na "limpeza" do relato do usuário. Transforma descrições emocionais ou confusas em fatos estruturados, mantendo a essência do depoimento original mas extraindo variáveis técnicas (e.g., converter "o asfalto aqui tá uma porcaria" em problema_infraestrutura: pavimento_degradado).
12.1.2. Intent Extraction: Identificação precisa do objetivo do usuário: é uma denúncia, um elogio, uma sugestão ou um pedido de informação?
12.1.3. Entity Recognition (NER): Extração automática de nomes de autoridades, instituições, logradouros e datas mencionados, vinculando-os ao banco de dados oficial do portal.
12.2. Classificação Hiper-Granular (Geographic & Contextual Labeling)
12.2.1. Automated Geo-Tagging: Validação da localização mencionada no texto comparada à geolocalização do dispositivo e IP, classificando a denúncia com precisão de bairro, cidade e estado.
12.2.2. Dynamic Taxonomy Classification: Enquadramento da denúncia em categorias padronizadas (e.g., Saúde > Saneamento > Vazamento de Esgoto), permitindo a geração de estatísticas comparativas entre diferentes regiões.
12.2.3. Authority Mapping: A IA identifica automaticamente qual secretaria, órgão ou autoridade é responsável por aquele tema específico em determinada localidade, direcionando a "pressão pública" de forma assertiva.
12.3. Agrupamento Inteligente e Desduplicação (Smart Clustering)
12.3.1. Similarity Clustering: O recurso mais potente para o crescimento: a IA identifica se 50 denúncias diferentes tratam do mesmo problema (e.g., a mesma ponte interditada). Em vez de 50 posts isolados, o sistema cria um "Evento de Mobilização Único".
12.3.2. Social Pressure Consolidation: Ao agrupar denúncias, o sistema soma todos os "Apoios" e "Assinaturas" em um único indicador de impacto, tornando a causa impossível de ser ignorada pelas autoridades.
12.3.3. Duplicate Suppression: Evita a fragmentação da atenção da comunidade, sugerindo ao usuário que ele "apoie uma causa já existente" em vez de criar uma duplicada.
12.4. Garantia de Credibilidade e Fact-Checking (Trust & Authority)
12.4.1. Evidence Validation (Vision AI): Análise automática de fotos e vídeos enviados. A IA verifica se a imagem é recente, se corresponde à localização geográfica declarada (metadados e análise visual) e se há sinais de manipulação digital (Deepfakes/Edições).
12.4.2. Credibility Scoring: Atribui uma "Nota de Confiança" à denúncia baseada no histórico do usuário (logado via Facebook/Apple/MS), na qualidade das provas e na validação cruzada com outros relatos na mesma área.
12.4.3. Anti-Fake News Shield: Monitoramento de padrões de postagem que indiquem ataques coordenados ou campanhas de desinformação, protegendo a integridade do portal.
12.5. Insights Estratégicos e Relatórios de Impacto (Executive Intelligence)
12.5.1. Automated Executive Summaries: A IA gera resumos técnicos para a imprensa e autoridades, utilizando linguagem formal e baseada em dados, elevando o nível do debate público.
12.5.2. Trend Prediction: Identificação de crises iminentes (e.g., aumento de denúncias de falta de água em um bairro específico antes mesmo de se tornar uma notícia oficial).


