// Automated Licence Compliance & Legal Guardrail Validator

export interface LicenseValidationResult {
  isCompliant: boolean;
  isCommercialPermitted: boolean;
  requiresShareAlike: boolean;
  copyleftRiskLevel: 'none' | 'low' | 'severe_viral';
  mandatoryAttributionText: string;
  violations: string[];
}

interface KnownLicenseDefinition {
  isCommercial: boolean;
  requiresShareAlike: boolean;
  copyleftRisk: 'none' | 'low' | 'severe_viral';
  attributionTemplate: (sourceName: string) => string;
}

const KNOWN_LICENSES: Record<string, KnownLicenseDefinition> = {
  'MIT': {
    isCommercial: true,
    requiresShareAlike: false,
    copyleftRisk: 'none',
    attributionTemplate: (name) => `Data sourced from ${name} under the permissive MIT License.`,
  },
  'Apache-2.0': {
    isCommercial: true,
    requiresShareAlike: false,
    copyleftRisk: 'none',
    attributionTemplate: (name) => `Derived from ${name} licensed under the Apache License 2.0.`,
  },
  'CC-BY-4.0': {
    isCommercial: true,
    requiresShareAlike: false,
    copyleftRisk: 'none',
    attributionTemplate: (name) => `Scientific findings and metrics courtesy of ${name} under Creative Commons Attribution 4.0.`,
  },
  'CC0-1.0': {
    isCommercial: true,
    requiresShareAlike: false,
    copyleftRisk: 'none',
    attributionTemplate: (name) => `Open metadata provided by ${name} under CC0 Public Domain Dedication.`,
  },
  'CC-BY-SA-3.0': {
    isCommercial: true,
    requiresShareAlike: true,
    copyleftRisk: 'low', // Data-level ShareAlike, does not infect software source code if isolated
    attributionTemplate: (name) => `Exercise text from ${name} under CC-BY-SA 3.0. Derivative datasets must preserve ShareAlike.`,
  },
  'CC-BY-SA-4.0': {
    isCommercial: true,
    requiresShareAlike: true,
    copyleftRisk: 'low',
    attributionTemplate: (name) => `Anatomical assets from ${name} under CC-BY-SA 4.0.`,
  },
  'AGPL-3.0': {
    isCommercial: false, // In practice, network copyleft forces open-sourcing SaaS backend
    requiresShareAlike: true,
    copyleftRisk: 'severe_viral',
    attributionTemplate: (name) => `AGPL-3.0 component: AIRGAP REQUIRED. Never link directly to proprietary codebase.`,
  },
  'GPL-3.0': {
    isCommercial: false,
    requiresShareAlike: true,
    copyleftRisk: 'severe_viral',
    attributionTemplate: (name) => `GPL-3.0 component: AIRGAP REQUIRED. Do not bundle into client application.`,
  },
};

export class LicenceValidator {
  public static validate(licenseId: string, sourceName: string): LicenseValidationResult {
    const lic = KNOWN_LICENSES[licenseId.toUpperCase()] || KNOWN_LICENSES[licenseId];
    const violations: string[] = [];

    if (!lic) {
      return {
        isCompliant: false,
        isCommercialPermitted: false,
        requiresShareAlike: false,
        copyleftRiskLevel: 'severe_viral',
        mandatoryAttributionText: `Unrecognized license "${licenseId}" from ${sourceName}. Manual legal review required.`,
        violations: [`Unknown license "${licenseId}": Ingestion blocked.`],
      };
    }

    if (lic.copyleftRisk === 'severe_viral') {
      violations.push(
        `CRITICAL: Source "${sourceName}" is licensed under viral copyleft (${licenseId}). Direct code linkage or bundled distribution will contaminate proprietary codebase.`
      );
    }

    const isCompliant = violations.length === 0;

    return {
      isCompliant,
      isCommercialPermitted: lic.isCommercial,
      requiresShareAlike: lic.requiresShareAlike,
      copyleftRiskLevel: lic.copyleftRisk,
      mandatoryAttributionText: lic.attributionTemplate(sourceName),
      violations,
    };
  }
}
