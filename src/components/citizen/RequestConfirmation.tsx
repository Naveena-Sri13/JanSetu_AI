import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, RefreshCw, MapPin, Tag, Clock } from 'lucide-react';
import { CitizenRequest } from '../../types';

interface RequestConfirmationProps {
  request: CitizenRequest;
  onViewInDashboard: () => void;
  onSubmitAnother: () => void;
}

export const RequestConfirmation: React.FC<RequestConfirmationProps> = ({
  request,
  onViewInDashboard,
  onSubmitAnother,
}) => {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8 shadow-sm dark:border-emerald-950 dark:bg-slate-900">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="mt-4 font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
          Your community signal has been added.
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Thank you. Your voice has been converted into a structured signal and added to the regional development intelligence dataset.
        </p>
      </div>

      {/* Structured Details Card */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-xs">Anonymous Signal ID</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{request.id}</span>
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-xs">Submission Timestamp</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{new Date(request.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-xs">Development Sector</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
              <Tag className="h-3.5 w-3.5 text-indigo-500" />
              <span className="capitalize">{request.sector}</span>
              <span className="text-xs text-slate-500">({request.subcategory})</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-xs">Geographic Cluster</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
              <MapPin className="h-3.5 w-3.5 text-rose-500" />
              <span>{request.district}, {request.state}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-700/60">
          <span className="text-slate-500 dark:text-slate-400 block text-xs">Normalized Civic Issue</span>
          <p className="mt-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
            {request.issue}
          </p>
        </div>
      </div>

      {/* Privacy Guarantee Box */}
      <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
        <span>
          <strong>Privacy Safeguard:</strong> JanSetu AI operates under strict Zero-PII principles. No Aadhaar number, phone number, or residential address is stored. Your submission is geocoded to district/mandal resolution for public planning.
        </span>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
        <button
          onClick={onSubmitAnother}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Submit Another Signal</span>
        </button>

        <button
          onClick={onViewInDashboard}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 transition"
        >
          <span>View in Policymaker Dashboard</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
