pnpm nx g @nx/next:app apps/web-portal --appDir=true --style=tailwind --unitTestRunner=jest --linter=eslint
pnpm nx g @nx/nest:app apps/api-core --unitTestRunner=jest --linter=eslint
pnpm nx g @nx/next:app apps/admin-cms --appDir=true --style=tailwind --unitTestRunner=jest --linter=eslint
pnpm nx g @nx/react:library libs/foundation/ui-kit-atoms --tags=type:ui,scope:foundation --bundler=vite --unitTestRunner=jest
pnpm nx g @nx/react:library libs/foundation/ui-kit-molecules --tags=type:ui,scope:foundation --bundler=vite --unitTestRunner=jest
pnpm nx g @nx/react:library libs/foundation/ui-kit-organisms --tags=type:ui,scope:foundation --bundler=vite --unitTestRunner=jest
pnpm nx g @nx/js:library libs/foundation/internationalization-engine --tags=type:util,scope:foundation --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/foundation/design-tokens --tags=type:util,scope:foundation --bundler=tsc
pnpm nx g @nx/js:library libs/foundation/types-common --tags=type:domain,scope:foundation --bundler=tsc
pnpm nx g @nx/js:library libs/foundation/apparatus-metadata-registry --tags=type:util,scope:foundation --bundler=tsc
pnpm nx g @nx/js:library libs/realms/news-domain --tags=type:domain,scope:news --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/react:library libs/realms/news-ui --tags=type:ui,scope:news --bundler=vite --unitTestRunner=jest
pnpm nx g @nx/js:library libs/realms/complaints-domain --tags=type:domain,scope:complaints --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/react:library libs/realms/complaints-ui --tags=type:ui,scope:complaints --bundler=vite --unitTestRunner=jest
pnpm nx g @nx/js:library libs/realms/governance-domain --tags=type:domain,scope:governance --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/react:library libs/realms/community-ui --tags=type:ui,scope:community --bundler=vite --unitTestRunner=jest
pnpm nx g @nx/js:library libs/realms/geographic-context --tags=type:domain,scope:realms --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/realms/geography-infrastructure --tags=type:infrastructure,scope:realms --bundler=tsc
pnpm nx g @nx/js:library libs/integrations/supabase-bridge --tags=type:infrastructure,scope:integrations --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/integrations/blockchain-ledger --tags=type:infrastructure,scope:integrations --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/integrations/ai-oracle --tags=type:infrastructure,scope:integrations --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/integrations/search-engine --tags=type:infrastructure,scope:integrations --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/integrations/whatsapp-gateway --tags=type:infrastructure,scope:integrations --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/integrations/ai-model-orchestrator --tags=type:infrastructure,scope:integrations --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/integrations/viral-social-bridge --tags=type:infrastructure,scope:integrations --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/orchestration/viral-engine --tags=type:util,scope:orchestration --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/orchestration/security-auditor --tags=type:util,scope:orchestration --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/orchestration/sovereign-logger --tags=type:util,scope:orchestration --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/orchestration/ai-self-healing --tags=type:util,scope:orchestration --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/orchestration/sovereign-error-observability --tags=type:util,scope:orchestration --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/orchestration/ai-neural-auditor --tags=type:util,scope:orchestration --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/orchestration/semantic-clustering --tags=type:util,scope:orchestration --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/orchestration/authority-bridge --tags=type:util,scope:orchestration --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/orchestration/notification-nexus --tags=type:util,scope:orchestration --bundler=tsc --unitTestRunner=jest
pnpm nx g @nx/js:library libs/tools/apparatus-factory --tags=type:util,scope:tools --bundler=tsc

