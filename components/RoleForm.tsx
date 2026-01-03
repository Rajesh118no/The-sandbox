
import React from 'react';

interface RoleFormProps {
  notes: string;
  setNotes: (val: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
  useThinking: boolean;
  setUseThinking: (val: boolean) => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ 
  notes, 
  setNotes, 
  isLoading, 
  onGenerate,
  useThinking,
  setUseThinking
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-4">
        <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2">
          Raw Role Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste emails, bullet points, or Slack messages about the role here... e.g., 'Need a Senior Frontend Eng for our fintech platform. Must know React, TS, d3. Remote ok. We value ownership and high code quality. Benefits: unlimited PTO, 401k.'"
          className="w-full h-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400"
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={useThinking} 
              onChange={() => setUseThinking(!useThinking)}
            />
            <div className={`block w-10 h-6 rounded-full transition-colors ${useThinking ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${useThinking ? 'translate-x-4' : ''}`}></div>
          </div>
          <div className="ml-3 text-sm font-medium text-slate-700 select-none flex items-center gap-1.5">
            Deep Thinking Mode
            <div className="group relative">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 Uses Gemini's full reasoning budget (32k tokens) to craft highly nuanced materials.
               </div>
            </div>
          </div>
        </label>

        <button
          onClick={onGenerate}
          disabled={isLoading || !notes.trim()}
          className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
            isLoading || !notes.trim() 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{useThinking ? 'Reasoning...' : 'Processing...'}</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 3.5a11.06 11.06 0 0 0 12.12 0c.5-1.97-2-2.17-2-3.5 0-1.67-1.35-3.02-3.02-3.02Z"/><path d="m2 22 2-2"/></svg>
              <span>Generate Package</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RoleForm;
