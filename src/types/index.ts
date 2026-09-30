export type LanguageCode = 'ta' | 'hi' | 'en' | 'te' | 'kn' | 'bn';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export type DevelopmentSectorId =
  | 'transportation'
  | 'healthcare'
  | 'water'
  | 'roads'
  | 'electricity'
  | 'sanitation'
  | 'education'
  | 'agriculture'
  | 'climate';

export interface DevelopmentSector {
  id: DevelopmentSectorId;
  name: string;
  description: string;
  iconName: string;
  color: string;
  isFlagship?: boolean;
}

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface CitizenRequest {
  id: string;
  createdAt: string;
  language: LanguageCode;
  originalText: string;
  normalizedText: string;
  state: string;
  district: string;
  subdivision?: string;
  latitude: number;
  longitude: number;
  sector: DevelopmentSectorId;
  subcategory: string;
  issue: string;
  affectedGroups: string[];
  severity: SeverityLevel;
  requestedAction: string;
  source: 'voice' | 'text' | 'synthetic_prototype' | 'demo_scenario';
  status: 'verified' | 'pending_review';
}

export interface InfrastructureRecord {
  id: string;
  district: string;
  state: string;
  sector: DevelopmentSectorId;
  serviceCoveragePct: number; // e.g. 21%
  infrastructureGapPct: number; // e.g. 79%
  nearestFacilityKm: number; // e.g. 14.5 km to hospital / highway
  keyIndicatorLabel: string;
  keyIndicatorValue: string;
  sourceLabel: string; // e.g. "Open Government Data (data.gov.in) / State Transport Dept"
  lastUpdated: string;
}

export interface DemographicRecord {
  district: string;
  state: string;
  totalPopulation: number;
  ruralPopulationPct: number;
  vulnerableGroupsPct: number; // elderly, daily wage workers, children
  householdsCount: number;
  areaSqKm: number;
}

export interface InvestmentRecord {
  id: string;
  district: string;
  state: string;
  sector: DevelopmentSectorId;
  activeProjectsCount: number;
  committedCrores: number;
  status: 'ongoing' | 'planned' | 'under_review';
  schemes: string[];
  lastDisbursedYear: number;
  note: string;
}

export interface DNIFactors {
  demand: number; // 0-100 (weight 35%)
  infrastructureGap: number; // 0-100 (weight 25%)
  populationImpact: number; // 0-100 (weight 20%)
  criticality: number; // 0-100 (weight 10%)
  geographicConcentration: number; // 0-100 (weight 10%)
}

export interface Hotspot {
  id: string;
  state: string;
  district: string;
  sector: DevelopmentSectorId;
  requestCount: number;
  population: number;
  infrastructureGap: number; // %
  serviceCoverage: number; // %
  criticality: number; // 0-100
  geographicConcentration: number; // 0-100
  developmentNeedIndex: number; // 0-100 deterministic
  factors: DNIFactors;
  latitude: number;
  longitude: number;
  sampleRequests: CitizenRequest[];
  infrastructure?: InfrastructureRecord;
  demographics?: DemographicRecord;
  investment?: InvestmentRecord;
  aiInsight?: string;
  candidateIntervention?: string;
  whyThisAppears?: string[];
}

export interface StructuredExtraction {
  language: LanguageCode | string;
  sector: DevelopmentSectorId;
  subcategory: string;
  issue: string;
  location: string;
  district: string;
  state: string;
  affectedGroups: string[];
  severity: SeverityLevel;
  requestedAction: string;
  confidence: number;
  normalizedSummary: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  language: LanguageCode;
  languageLabel: string;
  sector: DevelopmentSectorId;
  district: string;
  state: string;
  originalText: string;
  englishInterpretation: string;
  structuredExtraction: StructuredExtraction;
}
