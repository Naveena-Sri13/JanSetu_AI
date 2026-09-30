import React from 'react';
import {
  Layers,
  Calculator,
  ShieldCheck,
  Cpu,
  Database,
  Cloud,
  ArrowRight,
  AlertTriangle,
  Globe,
  FileText,
  UserCheck,
} from 'lucide-react';
import { DNI_WEIGHTS } from '../../lib/dniEngine';

export const MethodologyTab: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Title */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-700/10 dark:bg-indigo-950 dark:text-indigo-300">
          <Layers className="h-3.5 w-3.5" />
          <span>Analytical Transparency & Governance</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Methodology & Responsible AI Framework
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          JanSetu AI operates on an explicit separation between <strong>deterministic analytical algorithms</strong> and <strong>generative AI synthesis</strong>. No funding allocation is automated; all outputs serve as structured decision-support for human policymakers.
        </p>
      </div>

      {/* Section 26: 8-Step Pipeline */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          The 8-Step Civic Intelligence Pipeline
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          How raw multilingual voices become structured development intelligence
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: 'Step 1',
              title: 'Citizen Voice / Text',
              desc: 'Input captured via Web Speech or text in 6 Indian languages without requiring literacy in English.',
              color: 'border-indigo-500',
            },
            {
              step: 'Step 2',
              title: 'Linguistic Understanding',
              desc: 'Gemini 3.8 parses colloquial dialects, idioms, and multi-sentence context into semantic intents.',
              color: 'border-blue-500',
            },
            {
              step: 'Step 3',
              title: 'Structured Extraction',
              desc: 'Enforces strict JSON schema: sector, subcategory, location, affected groups, severity, requested action.',
              color: 'border-violet-500',
            },
            {
              step: 'Step 4',
              title: 'Geographic Aggregation',
              desc: 'Spatial clustering aggregates requests by district, mandal, and coordinates without saving PII.',
              color: 'border-emerald-500',
            },
            {
              step: 'Step 5',
              title: 'Public Data Correlation',
              desc: 'Cross-references demand against Open Government Data: demographics, transit routes, and hospital distances.',
              color: 'border-amber-500',
            },
            {
              step: 'Step 6',
              title: 'Development Need Index',
              desc: 'Deterministic multi-factor mathematical formula computes objective priority (0–100).',
              color: 'border-rose-500',
            },
            {
              step: 'Step 7',
              title: 'AI Evidence Synthesis',
              desc: 'Gemini generates non-hallucinatory synthesis strictly grounded on displayed empirical metrics.',
              color: 'border-indigo-600',
            },
            {
              step: 'Step 8',
              title: 'Human Policy Review',
              desc: 'Cabinet, district collectors, and planning boards review candidate interventions before budget decisions.',
              color: 'border-teal-500',
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className={`rounded-xl border-l-4 ${s.color} border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {s.step}
              </span>
              <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                {s.title}
              </h4>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 14: Development Need Index Scoring Engine Formula */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Development Need Index (DNI) Formula
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Deterministic scoring model eliminating black-box hallucinations in resource prioritization.
        </p>

        {/* Mathematical Expression Box */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 font-mono text-xs sm:text-sm text-indigo-950 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:text-indigo-200">
          <p className="font-bold">
            Development Need Index = (0.35 × Demand) + (0.25 × Infrastructure Gap) + (0.20 × Population Impact) + (0.10 × Criticality) + (0.10 × Geographic Concentration)
          </p>
        </div>

        {/* Weights Breakdown */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <span className="text-indigo-600 font-bold text-base block">35%</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block">Citizen Demand</span>
            <p className="text-[11px] text-slate-500 mt-1">Volume and frequency of verified community signals.</p>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <span className="text-rose-600 font-bold text-base block">25%</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block">Infrastructure Gap</span>
            <p className="text-[11px] text-slate-500 mt-1">Deficit in official service coverage (e.g. 84% gap).</p>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <span className="text-amber-600 font-bold text-base block">20%</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block">Population Impact</span>
            <p className="text-[11px] text-slate-500 mt-1">Concentration of rural, elderly, and vulnerable citizens.</p>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <span className="text-blue-600 font-bold text-base block">10%</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block">Service Criticality</span>
            <p className="text-[11px] text-slate-500 mt-1">Severity weight (emergency healthcare vs leisure transit).</p>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <span className="text-emerald-600 font-bold text-base block">10%</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block">Geo Concentration</span>
            <p className="text-[11px] text-slate-500 mt-1">Spatial clustering density around vital corridors.</p>
          </div>
        </div>
      </div>

      {/* Section 27: Responsible AI & Ethics Constitution */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Responsible AI & Civic Ethics Constitution
          </h3>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-xs text-emerald-950 font-semibold mb-4 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300">
          JanSetu AI is a decision-support system, not an autonomous policymaker.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-indigo-500" />
              Human-in-the-Loop Supremacy
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Candidate interventions generated by Gemini are non-binding. Department heads, elected officials, and Gram Sabhas maintain constitutional authority over all resource allocations.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Zero-PII Privacy by Design
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              No Aadhaar cards, telephone numbers, or private addresses are stored. All signals are immediately anonymized and geocoded to coarse administrative centroids.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-amber-500" />
              Transparent Prototype Data Labelling
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Synthetic citizen requests are explicitly tagged as prototype test records. They are never falsely presented as official government complaints.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-blue-500" />
              Dialect & Digital Divide Mitigation
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Voice recognition enables non-literate citizens to articulate needs in mother tongues, preventing rural under-representation in digital public planning.
            </p>
          </div>
        </div>
      </div>

      {/* Section 37: Future Cloud Production Architecture */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-2">
          <Cloud className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Future National Scale Cloud Architecture
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Architected for high-concurrency Digital Public Infrastructure across 700+ Indian districts.
        </p>

        {/* ASCII / Diagram Flow */}
        <div className="rounded-xl bg-slate-900 p-5 text-white font-mono text-xs overflow-x-auto shadow-inner">
          <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
            <div className="rounded border border-indigo-500 bg-indigo-950/60 px-3 py-2 text-center">
              Citizen Channels<br /><span className="text-[10px] text-indigo-300">Voice / Text / WhatsApp</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
            <div className="rounded border border-blue-500 bg-blue-950/60 px-3 py-2 text-center">
              Speech & Translation<br /><span className="text-[10px] text-blue-300">Cloud Speech-to-Text</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
            <div className="rounded border border-violet-500 bg-violet-950/60 px-3 py-2 text-center">
              Gemini 3.8 Flash<br /><span className="text-[10px] text-violet-300">Structured Entity Extraction</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
            <div className="rounded border border-emerald-500 bg-emerald-950/60 px-3 py-2 text-center">
              Cloud Run & API<br /><span className="text-[10px] text-emerald-300">Zero-PII Normalization</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
            <div className="rounded border border-amber-500 bg-amber-950/60 px-3 py-2 text-center">
              BigQuery & GIS<br /><span className="text-[10px] text-amber-300">Geospatial Hotspot Engine</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
            <div className="rounded border border-rose-500 bg-rose-950/60 px-3 py-2 text-center">
              Policymaker Dashboard<br /><span className="text-[10px] text-rose-300">Evidence & Interventions</span>
            </div>
          </div>
        </div>

        {/* Section 39: BRICS & Regional Portability */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
          <strong className="font-semibold text-slate-900 dark:text-white block mb-1">
            Global & BRICS Portability:
          </strong>
          &ldquo;The same architecture can be adapted to other multilingual, geographically distributed public-service environments by replacing regional datasets and administrative boundaries.&rdquo;
        </div>
      </div>
    </div>
  );
};
