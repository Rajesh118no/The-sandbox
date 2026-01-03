
import React, { useState } from 'react';
import Header from './components/Header.tsx';
import RoleForm from './components/RoleForm.tsx';
import OutputDisplay from './components/OutputDisplay.tsx';
import ChatWidget from './components/ChatWidget.tsx';
import { RecruitmentOutput } from './types.ts';
import { generateRecruitmentMaterials } from './services/geminiService.ts';

const App: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<RecruitmentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useThinking, setUseThinking] = useState(true);

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateRecruitmentMaterials(notes, useThinking);
      setOutput(result);
      // Smooth scroll to output
      setTimeout(() => {
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError('Failed to generate materials. Please check your notes and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Turn Chaos into <span className="text-indigo-600">Perfect Candidates.</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Paste your raw role requirements, scribbles, or Slack brain-dumps. 
            We'll craft a polished LinkedIn JD and a tactical interview guide instantly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <RoleForm 
            notes={notes} 
            setNotes={setNotes} 
            isLoading={isLoading} 
            onGenerate={handleGenerate} 
            useThinking={useThinking}
            setUseThinking={setUseThinking}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 animate-fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {isLoading && !output && (
            <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
              <p className="mt-6 text-slate-500 font-medium animate-pulse text-center">
                {useThinking 
                  ? "Engaging deep reasoning engine to analyze soft skills and industry requirements..." 
                  : "Drafting your recruitment package..."}
              </p>
            </div>
          )}

          <OutputDisplay data={output} />
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-xs border-t border-slate-200 mt-12">
        <p>© 2024 Recruitment Sandbox • Built with Gemini 3 Pro • Thinking Enabled</p>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;
