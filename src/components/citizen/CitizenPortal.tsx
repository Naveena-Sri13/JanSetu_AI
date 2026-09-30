import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Edit3,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Loader2,
  MapPin,
  Tag,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  CitizenRequest,
  DevelopmentSectorId,
  LanguageCode,
  SeverityLevel,
  StructuredExtraction,
} from '../../types';
import { SUPPORTED_LANGUAGES, DEVELOPMENT_SECTORS } from '../../data/sectors';
import { DEMO_SCENARIOS } from '../../data/demoScenarios';
import { analyzeCitizenRequest, AnalysisResponse } from '../../lib/geminiClient';
import { VoiceRecorder } from './VoiceRecorder';
import { RequestConfirmation } from './RequestConfirmation';
import { SemanticConvergence } from './SemanticConvergence';

interface CitizenPortalProps {
  onNewRequestAdded: (newReq: CitizenRequest) => void;
  onNavigateToDashboard: () => void;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  onNewRequestAdded,
  onNavigateToDashboard,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('ta');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [editableExtraction, setEditableExtraction] = useState<StructuredExtraction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<CitizenRequest | null>(null);

  // Handle Voice transcription
  const handleTranscription = (transcript: string) => {
    setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
  };

  // Run AI analysis
  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setProcessingStage('Analyzing linguistic nuances and regional dialect...');

    // Progress feedback simulation
    setTimeout(() => {
      setProcessingStage('Mapping to Indian Civic Development Sectors...');
    }, 600);
    setTimeout(() => {
      setProcessingStage('Extracting geographic entities and affected demographics...');
    }, 1200);

    const result = await analyzeCitizenRequest(inputText, selectedLanguage);

    setIsProcessing(false);
    setAnalysisResult(result);
    setEditableExtraction({ ...result.data });
  };

  // Load a quick scenario
  const handleLoadScenario = (scenarioId: string) => {
    const sc = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
    if (!sc) return;
    setSelectedLanguage(sc.language);
    setInputText(sc.originalText);
    setSubmittedRequest(null);
    setAnalysisResult(null);
    setEditableExtraction(null);
  };

  // Confirm and submit structured request
  const handleConfirmSubmit = () => {
    if (!editableExtraction) return;

    const newReqId = `JS-${editableExtraction.state.substring(0, 2).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const newRequest: CitizenRequest = {
      id: newReqId,
      createdAt: new Date().toISOString(),
      language: selectedLanguage,
      originalText: inputText,
      normalizedText: editableExtraction.normalizedSummary || editableExtraction.issue,
      state: editableExtraction.state,
      district: editableExtraction.district,
      latitude: 12.1211, // approximate centroid
      longitude: 78.1582,
      sector: editableExtraction.sector,
      subcategory: editableExtraction.subcategory,
      issue: editableExtraction.issue,
      affectedGroups: editableExtraction.affectedGroups,
      severity: editableExtraction.severity,
      requestedAction: editableExtraction.requestedAction,
      source: 'text',
      status: 'verified',
    };

    onNewRequestAdded(newRequest);
    setSubmittedRequest(newRequest);
  };

  const handleResetForm = () => {
    setInputText('');
    setAnalysisResult(null);
    setEditableExtraction(null);
    setSubmittedRequest(null);
    setIsEditing(false);
  };

  if (submittedRequest) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <RequestConfirmation
          request={submittedRequest}
          onViewInDashboard={onNavigateToDashboard}
          onSubmitAnother={handleResetForm}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Multilingual Civic Voice Portal</span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Tell us what your community needs.
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Share a local development need in your own language. JanSetu AI turns community voices into structured development signals for evidence-based planning.
        </p>
      </div>

      {/* Language Selector */}
      <div className="mt-8">
        <label className="block text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Select Your Preferred Language
        </label>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setSelectedLanguage(lang.code as LanguageCode)}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/20'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <span>{lang.nativeName}</span>
              <span className="text-[11px] opacity-75">({lang.name})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Section */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Voice Input Section */}
        <div className="border-b border-slate-100 pb-6 dark:border-slate-800">
          <VoiceRecorder
            language={selectedLanguage}
            onTranscription={handleTranscription}
            disabled={isProcessing}
          />
        </div>

        {/* Text Area */}
        <div className="mt-6">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Or type your development need in your own words:
          </label>
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            placeholder={`Type here in ${SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.name || 'your language'} (e.g., lack of buses to the hospital, water pipeline leaks, unpaved roads)...`}
            className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:outline-hidden focus:ring-1 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder-slate-500"
          />

          {/* Quick Demo Preloads */}
          <div className="mt-3">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mr-2">
              Try demonstration scenario:
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {DEMO_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleLoadScenario(sc.id)}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
                >
                  {sc.title.split('—')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-indigo-500" />
              <span>Zero-PII. Anonymous submission for community infrastructure.</span>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isProcessing || !inputText.trim()}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing Voice/Text...</span>
                </>
              ) : (
                <>
                  <span>Understand Request</span>
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Processing State Message */}
        {isProcessing && (
          <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 text-center dark:border-indigo-900/60 dark:bg-indigo-950/30">
            <div className="flex items-center justify-center gap-2 text-indigo-700 dark:text-indigo-300 font-medium text-xs sm:text-sm">
              <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
              <span>{processingStage}</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Running server-side Gemini 3.8 multilingual extraction & spatial entity normalization
            </p>
          </div>
        )}
      </div>

      {/* Section 9: We Understood Your Request (Review & Edit Before Confirming) */}
      {analysisResult && editableExtraction && (
        <div className="mt-8 rounded-2xl border-2 border-indigo-500/80 bg-white p-6 shadow-md dark:border-indigo-600 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  We understood your request
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Extracted via {analysisResult.source === 'live_gemini' ? 'Gemini 3.8 Multilingual AI' : 'Deterministic Demonstration Engine'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>{isEditing ? 'Done Editing' : 'Edit Extracted Fields'}</span>
            </button>
          </div>

          {/* Review Warning Banner */}
          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <strong className="font-semibold">Review before submitting:</strong> AI extraction may be imperfect. Verify the category, district, and requested action below before adding to the community intelligence dataset.
            </div>
          </div>

          {/* Fields Grid */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {/* Language */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Detected Language
              </span>
              {isEditing ? (
                <select
                  value={editableExtraction.language}
                  onChange={(e) =>
                    setEditableExtraction({ ...editableExtraction, language: e.target.value })
                  }
                  className="mt-1 w-full rounded border border-slate-300 p-1 text-xs dark:border-slate-700 dark:bg-slate-900"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name} ({l.nativeName})
                    </option>
                  ))}
                </select>
              ) : (
                <span className="mt-1 block font-medium text-slate-800 dark:text-slate-200 capitalize">
                  {SUPPORTED_LANGUAGES.find((l) => l.code === editableExtraction.language)?.name ||
                    editableExtraction.language}
                </span>
              )}
            </div>

            {/* Development Sector */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Development Sector
              </span>
              {isEditing ? (
                <select
                  value={editableExtraction.sector}
                  onChange={(e) =>
                    setEditableExtraction({
                      ...editableExtraction,
                      sector: e.target.value as DevelopmentSectorId,
                    })
                  }
                  className="mt-1 w-full rounded border border-slate-300 p-1 text-xs dark:border-slate-700 dark:bg-slate-900"
                >
                  {DEVELOPMENT_SECTORS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="mt-1 block font-medium text-indigo-700 dark:text-indigo-400 capitalize">
                  {DEVELOPMENT_SECTORS.find((s) => s.id === editableExtraction.sector)?.name ||
                    editableExtraction.sector}
                </span>
              )}
            </div>

            {/* Issue */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 md:col-span-2 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Key Development Issue
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={editableExtraction.issue}
                  onChange={(e) =>
                    setEditableExtraction({ ...editableExtraction, issue: e.target.value })
                  }
                  className="mt-1 w-full rounded border border-slate-300 p-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                />
              ) : (
                <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                  {editableExtraction.issue}
                </p>
              )}
            </div>

            {/* Location & District */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Location & District
              </span>
              {isEditing ? (
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="District"
                    value={editableExtraction.district}
                    onChange={(e) =>
                      setEditableExtraction({ ...editableExtraction, district: e.target.value })
                    }
                    className="rounded border border-slate-300 p-1 text-xs dark:border-slate-700 dark:bg-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={editableExtraction.state}
                    onChange={(e) =>
                      setEditableExtraction({ ...editableExtraction, state: e.target.value })
                    }
                    className="rounded border border-slate-300 p-1 text-xs dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
              ) : (
                <span className="mt-1 block font-medium text-slate-800 dark:text-slate-200">
                  {editableExtraction.district}, {editableExtraction.state}
                </span>
              )}
            </div>

            {/* Severity */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Urgency / Severity Level
              </span>
              {isEditing ? (
                <select
                  value={editableExtraction.severity}
                  onChange={(e) =>
                    setEditableExtraction({
                      ...editableExtraction,
                      severity: e.target.value as SeverityLevel,
                    })
                  }
                  className="mt-1 w-full rounded border border-slate-300 p-1 text-xs dark:border-slate-700 dark:bg-slate-900 capitalize"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              ) : (
                <span
                  className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${
                    editableExtraction.severity === 'critical'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : editableExtraction.severity === 'high'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                  }`}
                >
                  {editableExtraction.severity}
                </span>
              )}
            </div>

            {/* Affected Groups */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 md:col-span-2 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Affected Groups
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {editableExtraction.affectedGroups.map((group, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>

            {/* Requested Action */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 md:col-span-2 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Requested Action
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={editableExtraction.requestedAction}
                  onChange={(e) =>
                    setEditableExtraction({
                      ...editableExtraction,
                      requestedAction: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded border border-slate-300 p-1.5 text-xs dark:border-slate-700 dark:bg-slate-900"
                />
              ) : (
                <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
                  {editableExtraction.requestedAction}
                </p>
              )}
            </div>
          </div>

          {/* Confirm & Submit */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleResetForm}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Cancel & Start Over
            </button>

            <button
              type="button"
              onClick={handleConfirmSubmit}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
            >
              <span>Confirm & Add to Community Signals</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Semantic Convergence Demonstration Section */}
      <div className="mt-12">
        <SemanticConvergence />
      </div>
    </div>
  );
};
