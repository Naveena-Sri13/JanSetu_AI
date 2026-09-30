import { DNIFactors } from '../types';

/**
 * Weights defined by the JanSetu AI Analytical Specification:
 * - Citizen Demand: 35%
 * - Infrastructure Gap: 25%
 * - Population Impact: 20%
 * - Service Criticality: 10%
 * - Geographic Concentration: 10%
 */
export const DNI_WEIGHTS = {
  demand: 0.35,
  infrastructureGap: 0.25,
  populationImpact: 0.20,
  criticality: 0.10,
  geographicConcentration: 0.10,
} as const;

/**
 * Deterministically calculates the Development Need Index (DNI)
 * based strictly on factor scores (normalized 0-100).
 *
 * NOTE: This is a deterministic analytical index designed for policymaker review,
 * NOT an autonomous government funding decision.
 */
export function calculateDNI(factors: DNIFactors): number {
  const clamp = (val: number) => Math.max(0, Math.min(100, val));

  const demand = clamp(factors.demand);
  const gap = clamp(factors.infrastructureGap);
  const popImpact = clamp(factors.populationImpact);
  const crit = clamp(factors.criticality);
  const geoConc = clamp(factors.geographicConcentration);

  const rawDni =
    DNI_WEIGHTS.demand * demand +
    DNI_WEIGHTS.infrastructureGap * gap +
    DNI_WEIGHTS.populationImpact * popImpact +
    DNI_WEIGHTS.criticality * crit +
    DNI_WEIGHTS.geographicConcentration * geoConc;

  return Number(rawDni.toFixed(1));
}

export function getDNILevel(dni: number): {
  label: string;
  badgeClass: string;
  colorHex: string;
} {
  if (dni >= 80) {
    return {
      label: 'High Need (Tier 1)',
      badgeClass: 'bg-rose-500/10 text-rose-700 border-rose-500/20 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
      colorHex: '#E11D48',
    };
  }
  if (dni >= 65) {
    return {
      label: 'Significant Need (Tier 2)',
      badgeClass: 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
      colorHex: '#D97706',
    };
  }
  if (dni >= 50) {
    return {
      label: 'Moderate Need (Tier 3)',
      badgeClass: 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
      colorHex: '#2563EB',
    };
  }
  return {
    label: 'Baseline Monitoring',
    badgeClass: 'bg-slate-500/10 text-slate-700 border-slate-500/20 dark:bg-slate-950/40 dark:text-slate-300 dark:border-slate-800',
    colorHex: '#64748B',
  };
}
