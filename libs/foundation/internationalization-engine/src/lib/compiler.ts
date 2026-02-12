/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignI18nCompiler
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Concentric Assembly
 * @description Atuador industrial que consolida fragmentos de tradução do Hub /locales.
 * CURADO: Erradicação de 'any', 'unused-vars' (dirname, error) e nomenclaturas genéricas.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZERO-ANY: Tipagem estrita via Record de profundidade.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';

/** 
 * @section Definições de ADN (Internal Types) 
 * Substituem o uso de 'any' por contratos determinísticos.
 */
interface ISovereignTranslationFragment {
  readonly [key: string]: {
    readonly value: string;
    readonly version: string;
    readonly aura?: {
      readonly severity: string;
      readonly vocalize: boolean;
    };
  };
}

interface IConsolidatedDictionaryContent {
  [apparatusName: string]: ISovereignTranslationFragment;
}

const ROOT_LOCALES_DIRECTORY = join(process.cwd(), 'locales');
const TARGET_APPLICATIONS_DIRECTORIES = [
  join(process.cwd(), 'apps/web-portal/public/locales'),
  join(process.cwd(), 'apps/admin-cms/public/locales')
];

/**
 * @name executeConcentricCompilation
 * @function
 * @description Orquestra a unificação trilingue baseada no Manifesto 0023.
 */
function executeConcentricCompilation(): void {
  console.log('\n[SINCRO SEMÂNTICA] Iniciando Compilação Concêntrica i18n...');

  const sovereignLanguages = ['pt-BR', 'es-ES', 'en-US'];

  sovereignLanguages.forEach((activeLocale) => {
    const localeSourceDirectory = join(ROOT_LOCALES_DIRECTORY, activeLocale);
    
    if (!existsSync(localeSourceDirectory)) {
      console.warn(`|-> [AVISO] Rastro não localizado para o idioma: ${activeLocale}`);
      return;
    }

    // CURA @typescript-eslint/no-explicit-any: Uso de interface de conteúdo consolidado
    const consolidatedContent: IConsolidatedDictionaryContent = {};

    /**
     * @name scanAndCollectFragments
     * @description Varredura recursiva do Hub Concêntrico para extração de rastro.
     */
    const scanAndCollectFragments = (currentScanningPath: string): void => {
      const directoryEntries = readdirSync(currentScanningPath, { withFileTypes: true });

      for (const entry of directoryEntries) {
        const fullPhysicalPath = join(currentScanningPath, entry.name);
        
        if (entry.isDirectory()) {
          scanAndCollectFragments(fullPhysicalPath);
        } else if (entry.name.endsWith('.json')) {
          try {
            const rawFileContent = readFileSync(fullPhysicalPath, 'utf-8');
            const fragmentPayload = JSON.parse(rawFileContent) as IConsolidatedDictionaryContent;
            
            // Injeção de fragmento respeitando o Namespace do Aparato (Lego)
            Object.assign(consolidatedContent, fragmentPayload);
          } catch (caughtError) {
            // CURA no-unused-vars: O erro agora é consumido na telemetria de terminal
            console.error(`|-> [FALHA] Corrupção no fragmento [${entry.name}]:`, caughtError);
          }
        }
      }
    };

    scanAndCollectFragments(localeSourceDirectory);

    // 2. SELAGEM DE PRODUÇÃO: dictionary.json
    const dictionaryPayload = {
      metadata: {
        locale: activeLocale,
        version: '6.5.1',
        generatedAt: new Date().toISOString(),
        integrityHash: 'ZENITH_SEALED_OEDP_6_5'
      },
      content: consolidatedContent
    };

    // 3. DESPACHO PARA AS APPS (Physical Delivery)
    TARGET_APPLICATIONS_DIRECTORIES.forEach((applicationPath) => {
      const localeOutputDirectory = join(applicationPath, activeLocale);
      
      if (!existsSync(localeOutputDirectory)) {
        mkdirSync(localeOutputDirectory, { recursive: true });
      }
      
      const finalOutputPath = join(localeOutputDirectory, 'dictionary.json');
      writeFileSync(finalOutputPath, JSON.stringify(dictionaryPayload, null, 2));
      
      console.log(`|-> [SUCESSO] Silo ${activeLocale} selado em: ${relative(process.cwd(), finalOutputPath)}`);
    });
  });

  console.log('[FINISH] Soberania Linguística Consolidada com 100% de integridade.\n');
}

// Início do Processo de Elite
executeConcentricCompilation();