/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ConcentricMeshAuditor
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Master Integrity Guard
 * @description Script de perícia que valida a existência de contrapartes concêntricas 
 * (Schemas e Locales) para cada aparato de UI ou Lógica no ecossistema.
 * @policy ZERO-ANY: Tipagem estrita para relatórios de auditoria.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral militar.
 */

import { readdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/** 
 * @section Configuração de Fronteiras 
 */
const SOURCE_DIRECTORIES = ['libs', 'apps'];
const SCHEMAS_ROOT = join(process.cwd(), 'schemas');
const LOCALES_ROOT = join(process.cwd(), 'locales');
const SOVEREIGN_LANGUAGES = ['pt-BR', 'es-ES', 'en-US'];

interface IApparatusIntegrityReport {
  readonly apparatusName: string;
  readonly physicalPath: string;
  readonly hasSchema: boolean;
  readonly missingLocales: string[];
  readonly integrityStatus: 'PERFECT' | 'DEGRADED' | 'CRITICAL';
}

/**
 * @name executeMeshAuditoria
 * @description Inicia a varredura neural para detecção de vácuos de ADN.
 */
function executeMeshAuditoria(): void {
  console.log('\n[VIGILÂNCIA NEURAL] Iniciando Auditoria de Malha Concêntrica OEDP-V6.5...');
  
  const globalIntegrityCollection: IApparatusIntegrityReport[] = [];

  SOURCE_DIRECTORIES.forEach(sourceRoot => {
    const rootPath = join(process.cwd(), sourceRoot);
    if (!existsSync(rootPath)) return;

    scanDirectoryRecursively(rootPath, sourceRoot, globalIntegrityCollection);
  });

  // 📊 GERAÇÃO DE RELATÓRIO TERMINAL
  renderAuditReport(globalIntegrityCollection);
}

/**
 * @name scanDirectoryRecursively
 * @private
 */
function scanDirectoryRecursively(
  currentPath: string, 
  sourceRoot: string,
  collection: IApparatusIntegrityReport[]
): void {
  const entries = readdirSync(currentPath, { withFileTypes: true });

  // Detectamos um "Aparato" se a pasta contém um arquivo .tsx ou um index.ts (ponto de exportação)
  const isApparatusFolder = entries.some(entry => 
    (entry.name.endsWith('.tsx') || entry.name === 'index.ts') && 
    !entry.name.includes('.spec.') &&
    !entry.name.includes('.schema.')
  );

  if (isApparatusFolder) {
    const apparatusName = currentPath.split(sep).pop() || 'UNKNOWN';
    
    // Normalização de rastro: removemos 'src/lib' e 'src/app' para bater com o espelho concêntrico
    const relativePath = relative(process.cwd(), currentPath)
      .replace(`${sourceRoot}${sep}`, '')
      .replace(`src${sep}lib${sep}`, '')
      .replace(`src${sep}app${sep}`, '');

    const report = auditApparatus(apparatusName, relativePath, sourceRoot);
    collection.push(report);
  }

  // Continua a varredura
  entries.filter(e => e.isDirectory() && !['node_modules', '.next', 'dist', 'i18n', 'schemas'].includes(e.name))
    .forEach(entry => scanDirectoryRecursively(join(currentPath, entry.name), sourceRoot, collection));
}

/**
 * @name auditApparatus
 * @private
 * @description Realiza o Check-Sum físico de arquivos concêntricos.
 */
function auditApparatus(name: string, mirrorPath: string, root: string): IApparatusIntegrityReport {
  // 1. Auditoria de Schema
  const expectedSchemaPath = join(SCHEMAS_ROOT, root, mirrorPath, `${name}.schema.ts`);
  const hasSchema = existsSync(expectedSchemaPath);

  // 2. Auditoria de Locales
  const missingLocales: string[] = [];
  SOVEREIGN_LANGUAGES.forEach(locale => {
    const expectedJsonPath = join(LOCALES_ROOT, locale, root, mirrorPath, `${name}.json`);
    if (!existsSync(expectedJsonPath)) {
      missingLocales.push(locale);
    }
  });

  // 3. Veredito de Integridade
  let status: IApparatusIntegrityReport['integrityStatus'] = 'PERFECT';
  if (!hasSchema) status = 'CRITICAL';
  else if (missingLocales.length > 0) status = 'DEGRADED';

  return {
    apparatusName: name,
    physicalPath: mirrorPath,
    hasSchema,
    missingLocales,
    integrityStatus: status
  };
}

/**
 * @name renderAuditReport
 * @private
 */
function renderAuditReport(reports: IApparatusIntegrityReport[]): void {
  const criticals = reports.filter(r => r.integrityStatus === 'CRITICAL');
  const degradeds = reports.filter(r => r.integrityStatus === 'DEGRADED');

  console.log(`\n|-> VARREDURA CONCLUÍDA: ${reports.length} Aparatos inspecionados.`);
  
  if (criticals.length > 0) {
    console.error(`\n❌ [ESTADO CRÍTICO] - ${criticals.length} Aparatos sem Schema Zod:`);
    criticals.forEach(r => console.log(`   - ${r.apparatusName} (Mirror: ${r.physicalPath})`));
  }

  if (degradeds.length > 0) {
    console.warn(`\n⚠️ [ESTADO DEGRADADO] - ${degradeds.length} Aparatos com Locales incompletos:`);
    degradeds.forEach(r => console.log(`   - ${r.apparatusName}: Faltando [${r.missingLocales.join(', ')}]`));
  }

  if (criticals.length === 0 && degradeds.length === 0) {
    console.log('\n✅ [VEREDITO ZENITH] Malha Concêntrica 100% Sincronizada.');
  } else {
    console.log('\n|-> Ação Requerida: Execute a migração física conforme Manifesto 0023.\n');
  }
}

// Ignição do Auditor
executeMeshAuditoria();