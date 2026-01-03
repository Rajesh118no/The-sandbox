
import React, { useState } from 'react';
import { RecruitmentOutput } from '../types.ts';

interface OutputDisplayProps {
  data: RecruitmentOutput | null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'jd' | 'interview'>('jd');

  if (!data) return null;

  const { jobDescription, interviewGuide } = data;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getFullJDText = () => {
    return `${jobDescription.title}\n\n${jobDescription.summary}\n\nKey Responsibilities:\n${jobDescription.responsibilities.join('\n')}\n\nRequirements:\n${jobDescription.requirements.join('\n')}\n\nCulture & Benefits:\n${jobDescription.cultureAndBenefits.join('\n')}`;
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('jd')}
          className={`px-6 py-3 text-sm font-semibold transition-colors relative ${
            activeTab === 'jd' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          LinkedIn Job Description
          {activeTab === 'jd' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></div>}
        </button>
        <button
          onClick={() => setActiveTab('interview')}
          className={`px-6 py-3 text-sm font-semibold transition-colors relative ${
            activeTab === 'interview' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Interview Guide (10 Questions)
          {activeTab === 'interview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></div>}
        </button>
      </div>

      {activeTab === 'jd' ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn Ready Draft
            </h3>
            <button 
              onClick={() => copyToClipboard(getFullJDText())}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              Copy Text
            </button>
          </div>
          <div className="p-8 space-y-8 text-slate-700 leading-relaxed max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{jobDescription.title}</h2>
              <p className="text-indigo-600 font-medium text-sm">Full-Time • Hybrid / Remote Options</p>
            </div>
            
            <section>
              <h4 className="font-bold text-slate-900 mb-2">About the Role</h4>
              <p>{jobDescription.summary}</p>
            </section>

            <section>
              <h4 className="font-bold text-slate-900 mb-3">Key Responsibilities</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {jobDescription.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-indigo-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="font-bold text-slate-900 mb-3">What We're Looking For</h4>
              <ul className="space-y-2">
                {jobDescription.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-3">Culture & Benefits</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobDescription.cultureAndBenefits.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          {interviewGuide.map((q, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:border-indigo-200 group">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
                      {q.targetSkill}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-900 transition-colors">
                    "{q.question}"
                  </h4>
                  <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-slate-300">
                    <p className="text-xs text-slate-500 italic">
                      <span className="font-bold not-italic text-slate-600">Hiring Manager Note:</span> {q.rationale}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;
