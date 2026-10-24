import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  ExternalLink,
  Settings,
  Sparkles,
  Globe,
  Database,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { CSE_CONFIG } from '../data/mockData';

interface CSEWidgetProps {
  initialQuery?: string;
  onUseSignalInScore?: (query: string, snippetCount: number) => void;
}

export const CSEWidget: React.FC<CSEWidgetProps> = ({
  initialQuery = '',
  onUseSignalInScore,
}) => {
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [copiedScript, setCopiedScript] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const cseContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      setActiveQuery(initialQuery);
    }
  }, [initialQuery]);

  // Ensure Google CSE script is loaded and re-initialized if needed
  useEffect(() => {
    // Check if script already on page
    const existingScript = document.querySelector(
      `script[src*="cse.google.com/cse.js?cx=${CSE_CONFIG.cx}"]`
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://cse.google.com/cse.js?cx=${CSE_CONFIG.cx}`;
      script.async = true;
      document.head.appendChild(script);
    }

    // Attempt to re-render CSE if google.search.cse.element is available
    if (window.google?.search?.cse?.element) {
      try {
        window.google.search.cse.element.render();
      } catch (e) {
        // Handle gracefully if already rendered
      }
    }
  }, []);

  const handleCopyScript = () => {
    const codeSnippet = `<script async src="https://cse.google.com/cse.js?cx=${CSE_CONFIG.cx}"></script>\n<div class="gcse-search"></div>`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleRefreshWidget = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      if (window.google?.search?.cse?.element) {
        try {
          window.google.search.cse.element.render();
        } catch (e) {
          console.warn('CSE re-render notice:', e);
        }
      }
      setIsRefreshing(false);
    }, 600);
  };

  const presetQueries = [
    'Elena Rostova NexusDeal AI autonomous scout',
    'Marcus Vance AuditFlow DD due diligence',
    'Synthetica BioSourcing computational bio venture',
    'NYC VC Hackathon 2026 track 1 sourcing',
    'Devpost Dealflow VC hackathon joins',
    'Automated cap table forensic audit AI',
  ];

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Globe className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white">Google Programmable Custom Search Engine</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Engine ID: <code className="bg-slate-800 text-blue-300 px-2 py-0.5 rounded font-mono font-semibold">{CSE_CONFIG.cx}</code>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={CSE_CONFIG.controlPanelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Control Panel (Editable)</span>
              <ExternalLink className="w-3 h-3 text-indigo-300" />
            </a>

            <a
              href={CSE_CONFIG.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Standalone Web URL</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={CSE_CONFIG.aboutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>About CSE</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Preset Sample Searches */}
        <div className="pt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Instant Query Triggers for Hackathon Due-Diligence:
          </p>
          <div className="flex flex-wrap gap-2">
            {presetQueries.map((query) => (
              <button
                key={query}
                onClick={() => {
                  setActiveQuery(query);
                  // Fill input in gcse-search if present
                  const input = document.querySelector<HTMLInputElement>('input.gsc-input');
                  if (input) {
                    input.value = query;
                    const btn = document.querySelector<HTMLButtonElement>('button.gsc-search-button');
                    if (btn) btn.click();
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-500/40 border border-slate-700/80 text-xs text-slate-300 hover:text-white transition-all cursor-pointer text-left"
              >
                🔍 {query}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Google CSE Embed Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-sm text-white">Live CSE Interactive Interface</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Live Widget Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshWidget}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh CSE Widget"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
            </button>
            <button
              onClick={handleCopyScript}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedScript ? 'Copied HTML snippet!' : 'Copy CSE HTML'}</span>
            </button>
          </div>
        </div>

        {/* Embedded HTML container for Google Custom Search */}
        <div
          ref={cseContainerRef}
          className="bg-white rounded-xl p-4 min-h-[160px] shadow-inner text-slate-900 overflow-hidden"
        >
          {/* Official Google CSE element */}
          <div className="gcse-search" data-gname="dealflow_cse"></div>
          
          <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Powered by Google Programmable Search Engine (Free Tier: 100 queries/day)</span>
            <a
              href={`https://cse.google.com/cse?cx=${CSE_CONFIG.cx}&q=${encodeURIComponent(activeQuery || 'founder due diligence')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
            >
              Open search in separate tab
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* CSE Web Signal to 100% Score Conversion Matrix */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-400" />
          How Custom Search Engine (CSE) Informs the 15% Score Component
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
            <span className="font-semibold text-blue-400">1. Domain Authority & Press Hits</span>
            <p className="text-slate-300">
              Scans Google index for coverage in TechCrunch, Bloomberg, SEC EDGAR, arXiv publications, and Crunchbase references.
            </p>
          </div>
          <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
            <span className="font-semibold text-emerald-400">2. Technical Citation Depth</span>
            <p className="text-slate-300">
              Evaluates open-source GitHub release velocity, starred repositories, and Devpost track verification markers.
            </p>
          </div>
          <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
            <span className="font-semibold text-purple-400">3. Due Diligence Risk Flags</span>
            <p className="text-slate-300">
              Cross-references legal disputes, duplicate trademarks, IP assignment conflicts, and executive departures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
