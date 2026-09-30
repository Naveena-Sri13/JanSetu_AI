import { DevelopmentSector } from '../types';

export const DEVELOPMENT_SECTORS: DevelopmentSector[] = [
  {
    id: 'transportation',
    name: 'Public Transportation',
    description: 'Bus connectivity, feeder routes, transit schedules, inter-village accessibility',
    iconName: 'Bus',
    color: '#2563EB', // Blue
    isFlagship: true,
  },
  {
    id: 'healthcare',
    name: 'Healthcare Access',
    description: 'Primary health centers, emergency transport, maternal care, diagnostic clinics',
    iconName: 'HeartPulse',
    color: '#DC2626', // Red
  },
  {
    id: 'water',
    name: 'Drinking Water & Supply',
    description: 'Potable water pipelines, purification plants, groundwater recharge, tanker regularity',
    iconName: 'Droplets',
    color: '#0284C7', // Cyan/Sky
  },
  {
    id: 'roads',
    name: 'Rural & Connecting Roads',
    description: 'All-weather tar roads, culverts, bridge connectivity, village arterial links',
    iconName: 'Route',
    color: '#D97706', // Amber
  },
  {
    id: 'electricity',
    name: 'Power & Grid Reliability',
    description: 'Substation capacity, uninterrupted agricultural power, domestic load stability',
    iconName: 'Zap',
    color: '#CA8A04', // Yellow
  },
  {
    id: 'sanitation',
    name: 'Solid Waste & Sanitation',
    description: 'Drainage clearing, decentralized sewage treatment, public sanitary blocks',
    iconName: 'Trash2',
    color: '#059669', // Emerald
  },
  {
    id: 'education',
    name: 'School Infrastructure',
    description: 'Classrooms, secondary school distance, lab facilities, safe student transit',
    iconName: 'GraduationCap',
    color: '#7C3AED', // Violet
  },
  {
    id: 'agriculture',
    name: 'Agricultural Market Access',
    description: 'Cold storage, APMC market feeder transport, irrigation canal maintenance',
    iconName: 'Sprout',
    color: '#16A34A', // Green
  },
  {
    id: 'climate',
    name: 'Climate Resilience & Flood',
    description: 'Stormwater embankments, flood shelters, cyclone protection, drought relief bunds',
    iconName: 'ShieldAlert',
    color: '#4B5563', // Gray/Slate
  },
];

export const SUPPORTED_LANGUAGES = [
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🌐' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
] as const;
