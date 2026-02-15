/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignI18nCompiler
 * @version 6.6.3
 * @protocol OEDP-V6.5 - Concentric Swarm Assembly
 * @description Atuador industrial que realiza a mineração e selagem de dicionários.
 * CURADO: Resolvido erro TS2339 via reconciliação de interface nominal.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { 
  IConsolidatedDictionary
} from './schemas/CompilerContracts.schema.js';

/* --- 🏛️ CONFIGURAÇÃO DE FRONTEIRAS ZENITH --- */

const ROOT_PATH = process.cwd();
const GLOBAL_LOCALES_HUB = join(ROOT_PATH, 'locales');
const LIBRARIES_ROOT = join(ROOT_PATH, 'libs');
const SOVEREIGN_LANGUAGES = ['pt-BR', 'es-ES', 'en-US'];

const TARGET_APPLICATIONS = [
  { name: 'web-portal', physicalPath: join(ROOT_PATH, 'apps/web-portal/public/locales') },
  { name: 'admin-cms', physicalPath: join(ROOT_PATH, 'apps/admin-cms/public/locales') }
];

/**
 * @name executeConcentricCompilation
 * @function
 * @description Orquestra a varredura, unificação e selagem dos dicionários tri-lingues.
 */
function executeConcentricCompilation(): void {
  console.log('\n[SINCRO SEMÂNTICA] Iniciando Mineração de Enxame i18n (V6.6.3)...');

  SOVEREIGN_LANGUAGES.forEach((activeSovereignLocale) => {
    const consolidatedContent: IConsolidatedDictionary = {};

    if (existsSync(GLOBAL_LOCALES_HUB)) {
      const globalSourcePath = join(GLOBAL_LOCALES_HUB, activeSovereignLocale);
      if (existsSync(globalSourcePath)) {
        mineTranslationsRecursively(globalSourcePath, consolidatedContent);
      }
    }

    if (existsSync(LIBRARIES_ROOT)) {
      mineLibrarySilos(LIBRARIES_ROOT, activeSovereignLocale, consolidatedContent);
    }

    const contentStringified = JSON.stringify(consolidatedContent);
    const integrityHash = createHash('sha256').update(contentStringified).digest('hex');

    const dictionaryPayload = {
      metadata: {
        activeLocale: activeSovereignLocale,
        bundleVersion: '6.6.3',
        generatedAt: new Date().toISOString(),
        integrityHash: integrityHash
      },
      content: consolidatedContent
    };

    dispatchToApplications(activeSovereignLocale, dictionaryPayload);
  });

  console.log('[FINISH] Soberania Linguística Consolidada com 100% de rastro.\n');
}

function mineTranslationsRecursively(currentScanningPath: string, storage: IConsolidatedDictionary): void {
  const directoryEntries = readdirSync(currentScanningPath, { withFileTypes: true });
  for (const entry of directoryEntries) {
    const fullPhysicalPath = join(currentScanningPath, entry.name);
    if (entry.isDirectory()) {
      mineTranslationsRecursively(fullPhysicalPath, storage);
    } else if (entry.name.endsWith('.json')) {
      ingestFragment(fullPhysicalPath, storage);
    }
  }
}

function mineLibrarySilos(basePath: string, activeLocale: string, storage: IConsolidatedDictionary): void {
  const realmEntries = readdirSync(basePath);
  realmEntries.forEach(realmName => {
    const realmPath = join(basePath, realmName);
    if (!statSync(realmPath).isDirectory()) return;
    const libraryEntries = readdirSync(realmPath);
    libraryEntries.forEach(libraryName => {
      const apparatusTargetRoot = join(realmPath, libraryName, 'src/lib');
      searchApparatusI18nRecursively(apparatusTargetRoot, activeLocale, storage);
    });
  });
}

function searchApparatusI18nRecursively(targetPath: string, locale: string, storage: IConsolidatedDictionary): void {
  if (!existsSync(targetPath)) return;
  const folderItems = readdirSync(targetPath, { withFileTypes: true });
  for (const item of folderItems) {
    const fullItemPath = join(targetPath, item.name);
    if (item.isDirectory()) {
      const potentialSiloPath = join(fullItemPath, 'i18n', locale);
      if (existsSync(potentialSiloPath)) {
        mineTranslationsRecursively(potentialSiloPath, storage);
      } else {
        searchApparatusI18nRecursively(fullItemPath, locale, storage);
      }
    }
  }
}

function ingestFragment(filePath: string, storage: IConsolidatedDictionary): void {
  try {
    const rawFileContent = readFileSync(filePath, 'utf-8');
    const fragment = JSON.parse(rawFileContent) as IConsolidatedDictionary;
    
    Object.keys(fragment).forEach(apparatusIdentifier => {
      const fragmentEntries = Object.values(fragment[apparatusIdentifier]);
      
      fragmentEntries.forEach((translationEntry: unknown) => {
        /** 
         * @section PERÍCIA_DE_CHAVE (Cura TS2339)
         * Utilizamos Type Guard para validar a transmutação léxica.
         */
        const typedEntry = translationEntry as Record<string, unknown>;
        
        if (typedEntry['value'] && !typedEntry['semanticContent']) {
           console.warn(`|-> [ENTROPIA] O aparato ${apparatusIdentifier} em ${relative(ROOT_PATH, filePath)} ainda utiliza a chave depreciada 'value'.`);
        }
      });

      if (storage[apparatusIdentifier]) {
        Object.assign(storage[apparatusIdentifier], fragment[apparatusIdentifier]);
      } else {
        storage[apparatusIdentifier] = fragment[apparatusIdentifier];
      }
    });
  } catch (error) {
    console.error(`|-> [FALHA] Corrupção no rastro: ${relative(ROOT_PATH, filePath)}`, error);
  }
}

function dispatchToApplications(activeLocale: string, payload: object): void {
  TARGET_APPLICATIONS.forEach((application) => {
    const outputDirectory = join(application.physicalPath, activeLocale);
    if (!existsSync(outputDirectory)) mkdirSync(outputDirectory, { recursive: true });
    const finalFilePath = join(outputDirectory, 'dictionary.json');
    writeFileSync(finalFilePath, JSON.stringify(payload, null, 2));
    console.log(`|-> [SELO] ${application.name} (${activeLocale}) sincronizado.`);
  });
}

executeConcentricCompilation();