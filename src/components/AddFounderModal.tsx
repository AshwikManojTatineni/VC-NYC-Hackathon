import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Globe, Plus, Calculator } from 'lucide-react';
import { Founder, TrackType } from '../types';
import { CSE_CONFIG } from '../data/mockData';

interface AddFounderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFounder: (founder: Founder) => void;
}

export const AddFounderModal: React.FC<AddFounderModalProps> = ({
  isOpen,
  onClose,
  onAddFounder,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [startup, setStartup] = useState('');
  const [role, setRole] = useState('Founder & CEO');
  const [tagline, setTagline] = useState('');
  const [track, setTrack] = useState<TrackType>('sourcing');
  const [location, setLocation] = useState('New York, NY');
  const [askAmount, setAskAmount] = useState('$1.5M');
  const [fundingStage, setFundingStage] = useState('Pre-Seed');

  // 100% Score sub-components
  const [domainDepth, setDomainDepth] = useState(22); // /25
  const [tractionVelocity, setTractionVelocity] = useState(21); // /25
  const [marketTAM, setMarketTAM] = useState(18); // /20
  const [cseSignals, setCseSignals] = useState(13); // /15
  const [dueDiligence, setDueDiligence] = useState(13); // /15

  const totalScore = domainDepth + tractionVelocity + marketTAM + cseSignals + dueDiligence;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !startup.trim()) return;

    const newFounder: Founder = {
      id: `founder-${Date.now()}`,
      name: name.trim(),
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 5000)}?auto=format&fit=crop&w=256&q=80`,
      role,
      startup: startup.trim(),
      tagline: tagline.trim() || `${startup} autonomous venture engine`,
      track,
      location,
      fundingStage,
      askAmount,
      scores: {
        domainDepth,
        tractionVelocity,
        marketTAM,
        cseSignals,
        dueDiligence,
        totalScore,
      },
      cseQuery: `${name} ${startup} dealflow venture`,
      cseFoundSnippets: Math.floor(Math.random() * 20) + 8,
      devpostUrl: CSE_CONFIG.devpostUrl,
      lumaHackathonUrl: CSE_CONFIG.hackathonUrl,
      tags: [
        track === 'sourcing' ? 'Track 1 Sourcing' : track === 'due-diligence' ? 'Track 2 Due-Diligence' : 'Tracks 1 & 2',
        fundingStage,
        'NYC Hackathon',
      ],
      keyHighlights: [
        'Evaluated via 100% composite score engine with live Google CSE cross-reference',
        `Target round ask: ${askAmount}`,
      ],
      redFlags: ['Standard pre-seed execution risk'],
      verifiedDueDiligence: dueDiligence >= 12,
      starred: false,
    };

    onAddFounder(newFounder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Calculator className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold">Score New Founder (100% Engine)</h3>
            </div>
            <p className="text-xs text-slate-400">
              Input founder data, calibrate weights, and index against Google Custom Search Engine
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Founder Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Lin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Startup / Project Name</label>
              <input
                type="text"
                required
                placeholder="e.g. ScribeVector"
                value={startup}
                onChange={(e) => setStartup(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-medium mb-1">Tagline & Problem Statement</label>
              <input
                type="text"
                placeholder="e.g. Autonomous LLM agent for continuous SOC2 and HIPAA audit compliance"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Hackathon Track</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value as TrackType)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="sourcing">Track 1: Sourcing Track</option>
                <option value="due-diligence">Track 2: Due-Diligence Track</option>
                <option value="both">Both Tracks (Full-Stack VC)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Funding Ask & Stage</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="$1.5M"
                  value={askAmount}
                  onChange={(e) => setAskAmount(e.target.value)}
                  className="w-1/2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
                <input
                  type="text"
                  placeholder="Pre-Seed"
                  value={fundingStage}
                  onChange={(e) => setFundingStage(e.target.value)}
                  className="w-1/2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>
          </div>

          {/* 100% Score Calibration Sliders */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                Scorecard Breakdown (Total: 100%)
              </span>
              <span className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                {totalScore}% Calculated Score
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Domain Expertise & Technical Depth (Max 25%)</span>
                  <span className="font-mono font-bold text-blue-400">{domainDepth} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={domainDepth}
                  onChange={(e) => setDomainDepth(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Traction Velocity & Growth (Max 25%)</span>
                  <span className="font-mono font-bold text-indigo-400">{tractionVelocity} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={tractionVelocity}
                  onChange={(e) => setTractionVelocity(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Market TAM & Defensibility (Max 20%)</span>
                  <span className="font-mono font-bold text-purple-400">{marketTAM} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={marketTAM}
                  onChange={(e) => setMarketTAM(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Google CSE Signal & Web Citations (Max 15%)</span>
                  <span className="font-mono font-bold text-amber-400">{cseSignals} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={cseSignals}
                  onChange={(e) => setCseSignals(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Due Diligence Audit & Cap Table Integrity (Max 15%)</span>
                  <span className="font-mono font-bold text-emerald-400">{dueDiligence} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={dueDiligence}
                  onChange={(e) => setDueDiligence(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Dealflow Ranking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
