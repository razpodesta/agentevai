/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ProjectHealthAuditor
 * @version 1.2.2
 * @protocol OEDP-V5.5 - High Precision Audit
 * @description Auditor forense de infraestrutura TypeScript.
 * Analisa a integridade e perfeição de cada biblioteca no Monorepo Nx.
 * @policy ZERO-EXTERNAL-DEPENDENCIES: Motor de busca recursivo compatível com Node 20.
 * @policy RUNTIME-ESM: Otimizado para execução via TSX.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, sep, normalize } from 'node:path';

/**
 * @section Definições de ADN de Configuração (Contratos de Elite)
 */
interface ITSConfigReference {
  readonly path: string;
}

interface ITSConfig {
  readonly extends?: string;
  readonly compilerOptions?: {
    readonly moduleResolution?: string;
    readonly module?: string;
    readonly skipLibCheck?: boolean;
  };
  readonly references?: readonly ITSConfigReference[];
}

interface IAuditIssue {
  readonly level: 'ERROR' | 'WARNING';
  readonly message: string;
  readonly recoverySuggestion: string;
}

interface ILibraryAuditReport {
  readonly libraryName: string;
  readonly path: string;
  readonly status: 'PERFECT' | 'DEGRADED' | 'CRITICAL';
  readonly issues: readonly IAuditIssue[];
}

const REPORT_DIRECTORY = join(process.cwd(), 'reports/system-health');
const REPORT_FILE = join(REPORT_DIRECTORY, 'infrastructure-audit.json');

/**
 * @name executeForensicAudit
 * @function
 * @description Inicia a varredura neural do sistema de arquivos para validar a malha de tipos.
 */
async function executeForensicAudit(): Promise<void> {
  console.log('\n[VIGILÂNCIA NEURAL] Iniciando Auditoria de Infraestrutura OEDP-V5.5...');
  console.log(`|-> Kernel detectado: Node.js ${process.version}`);

  const auditResults: ILibraryAuditReport[] = [];

  try {
    /**
     * SANEAMENTO NODE 20:
     * Substituído 'globSync' (Node 22) por 'readdirSync' com 'recursive: true' (Node 20.1+).
     */
    const libraryDirectory = join(process.cwd(), 'libs');
    const allFiles = readdirSync(libraryDirectory, { recursive: true }) as string[];

    // Filtragem manual para localizar apenas os tsconfig.json de raiz de biblioteca
    const libraryConfigurations = allFiles
      .filter(file => file.endsWith('tsconfig.json') && !file.includes('tsconfig.lib.json') && !file.includes('tsconfig.spec.json'))
      .map(file => join('libs', file));

    for (const configurationPath of libraryConfigurations) {
      const libraryName = dirname(configurationPath).split(sep).pop() || 'UNKNOWN_LEGO';
      console.log(`|-> Inspecionando Aparato: [${libraryName}]...`);

      const issues: IAuditIssue[] = [];
      const contentRaw = readFileSync(configurationPath, 'utf-8');

      try {
        const configuration: ITSConfig = JSON.parse(contentRaw);

        // 1. Validação de Integridade (Herança de Base)
        if (!configuration.extends?.includes('tsconfig.base.json')) {
          issues.push({
            level: 'ERROR',
            message: 'O aparato não estende o tsconfig.base.json original.',
            recoverySuggestion: 'Adicionar "extends": "../../../tsconfig.base.json" no topo do arquivo.'
          });
        }

        // 2. Validação de Coerência ESM
        if (configuration.compilerOptions) {
          const { moduleResolution, skipLibCheck } = configuration.compilerOptions;

          if (!['bundler', 'NodeNext'].includes(moduleResolution || '')) {
            issues.push({
              level: 'WARNING',
              message: `moduleResolution [${moduleResolution}] fora do padrão de elite.`,
              recoverySuggestion: 'Mudar para "bundler" (Next.js 16) ou "NodeNext".'
            });
          }

          if (skipLibCheck !== true) {
            issues.push({
              level: 'WARNING',
              message: 'skipLibCheck não está ativo.',
              recoverySuggestion: 'Definir "skipLibCheck": true em compilerOptions.'
            });
          }
        }

        // 3. Validação de Referências (Completude de Malha)
        const references = configuration.references || [];
        const hasLibraryConfig = references.some(ref => ref.path.includes('tsconfig.lib.json'));
        const hasSpecConfig = references.some(ref => ref.path.includes('tsconfig.spec.json'));

        if (!hasLibraryConfig || !hasSpecConfig) {
          issues.push({
            level: 'ERROR',
            message: 'Vácuo de referências detectado (Lib ou Spec ausente).',
            recoverySuggestion: 'Garantir que o array de "references" contenha os caminhos para .lib e .spec.'
          });
        }

        auditResults.push({
          libraryName,
          path: normalize(configurationPath),
          status: issues.some(issue => issue.level === 'ERROR') ? 'CRITICAL' : issues.length > 0 ? 'DEGRADED' : 'PERFECT',
          issues
        });

      } catch {
        console.error(`[FALHA] Corrupção de rastro no arquivo: ${configurationPath}`);
      }
    }

    const reportSnapshot = {
      metadata: {
        generatedAt: new Date().toISOString(),
        protocol: 'OEDP-V5.5',
        nodeVersion: process.version,
        totalAparatosAudited: auditResults.length,
        entropyDetected: auditResults.filter(result => result.status !== 'PERFECT').length
      },
      results: auditResults
    };

    if (!existsSync(REPORT_DIRECTORY)) {
      mkdirSync(REPORT_DIRECTORY, { recursive: true });
    }

    writeFileSync(REPORT_FILE, JSON.stringify(reportSnapshot, null, 2));

    console.log('\n[SUCESSO] Auditoria Finalizada com Precisão de Relógio Suíço.');
    console.log(`|-> RELATÓRIO DE SAÍDA: ${REPORT_FILE}`);
    console.log(`|-> STATUS: ${reportSnapshot.metadata.entropyDetected} aparatos requerem calibração.\n`);

  } catch (globalError) {
    console.error('\n[ERRO FATAL] Falha catastrófica no motor de auditoria:', globalError);
  }
}

executeForensicAudit();
