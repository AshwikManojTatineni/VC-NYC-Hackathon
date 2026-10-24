import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Star,
  ExternalLink,
  ShieldCheck,
  Globe,
  Award,
  ChevronRight,
  TrendingUp,
  Filter,
  Sparkles,
  Info
} from 'lucide-react';
import { Founder, TrackType } from '../types';
import { CSE_CONFIG } from '../data/mockData';

interface FounderRankingTableProps {
  founders: Founder[];
  onSelectFounder: (founder: Founder) => void;
  onToggleStar: (founderId: string) => void;
  onRunCSESearch: (query: string) => void;
  onOpenAddFounder: () => void;
}

export const FounderRankingTable: React.FC<FounderRankingTableProps> = ({
  founders,
  onSelectFounder,
  onToggleStar,
  onRunCSESearch,
  onOpenAddFounder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [sortBy, setSortBy] = useState<'total' | 'cse' | 'traction' | 'dd'>('total');

  const filteredFounders = founders
    .filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.startup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTrack =
        selectedTrack === 'all'
          ? true
          : selectedTrack === 'sourcing'
          ? f.track === 'sourcing' || f.track === 'both'
          : selectedTrack === 'due-diligence'
          ? f.track === 'due-diligence' || f.track === 'both'
          : true;

      const matchesStarred = onlyStarred ? f.starred : true;

      return matchesSearch && matchesTrack && matchesStarred;
    })
    .sort((a, b) => {
      if (sortBy === 'total') return b.scores.totalScore - a.scores.totalScore;
      if (sortBy === 'cse') return b.scores.cseSignals - a.scores.cseSignals;
      if (sortBy === 'traction') return b.scores.tractionVelocity - a.scores.tractionVelocity;
      if (sortBy === 'dd') return b.scores.dueDiligence - a.scores.dueDiligence;
      return 0;
    });

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 80) return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    if (score >= 70) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Explaining Hackathon Tracks & 100% Score System */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950/60 p-6 rounded-2xl border border-slate-700/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-blue-300" />
              NYC VC Hackathon 2026: Sourcing & Due-Diligence Tracks
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              100% Composite Founder Scoring Engine
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Synthesizing real-time signal from <strong>Google Custom Search Engine</strong> (<code className="text-blue-300">cx=82c791e40658d4209</code>), Devpost hackathon join repositories, GitHub commit velocity, and deep due-diligence forensic audits.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 self-stretch md:self-auto">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Domain Depth</span>
              <p className="text-lg font-bold text-blue-400 mt-0.5">25% Max</p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Traction Velocity</span>
              <p className="text-lg font-bold text-indigo-400 mt-0.5">25% Max</p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Market TAM</span>
              <p className="text-lg font-bold text-purple-400 mt-0.5">20% Max</p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Google CSE Citations</span>
              <p className="text-lg font-bold text-amber-400 mt-0.5">15% Max</p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center col-span-2 sm:col-span-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Due Diligence Audit</span>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">15% Max</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search founders, startups, tags, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Track Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Track:
          </span>
          <button
            onClick={() => setSelectedTrack('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              selectedTrack === 'all'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Tracks
          </button>
          <button
            onClick={() => setSelectedTrack('sourcing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              selectedTrack === 'sourcing'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Track 1: Sourcing
          </button>
          <button
            onClick={() => setSelectedTrack('due-diligence')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              selectedTrack === 'due-diligence'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Track 2: Due Diligence
          </button>
        </div>

        {/* Starred & Sorting */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOnlyStarred(!onlyStarred)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              onlyStarred
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
            <span>Shortlisted</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="total">Sort by: 100% Total Score</option>
              <option value="cse">Sort by: Google CSE Citations</option>
              <option value="traction">Sort by: Traction & Velocity</option>
              <option value="dd">Sort by: Due Diligence Verification</option>
            </select>
          </div>
        </div>
      </div>

      {/* Founder Rankings List */}
      <div className="space-y-4">
        {filteredFounders.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <p className="text-slate-400 text-base">No founders match your current search and filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTrack('all');
                setOnlyStarred(false);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFounders.map((founder, index) => {
            const rank = index + 1;
            return (
              <div
                key={founder.id}
                className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all shadow-md hover:shadow-xl group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left Column: Rank, Avatar, Name, Startup */}
                  <div className="flex items-start gap-4">
                    {/* Rank Badge */}
                    <div className="flex flex-col items-center justify-center w-8 pt-1">
                      <span className="text-lg font-black text-slate-500 group-hover:text-blue-400 transition-colors">
                        #{rank}
                      </span>
                      <button
                        onClick={() => onToggleStar(founder.id)}
                        className="mt-2 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                        title={founder.starred ? 'Remove star' : 'Star founder'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            founder.starred ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={founder.avatar}
                        alt={founder.name}
                        className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-700 shadow-md"
                      />
                      {founder.verifiedDueDiligence && (
                        <div
                          className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow"
                          title="Due Diligence Verified"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-base text-white hover:text-blue-300 transition-colors cursor-pointer"
                          onClick={() => onSelectFounder(founder)}
                        >
                          {founder.name}
                        </h3>
                        <span className="text-xs text-slate-400">• {founder.role}</span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                          {founder.startup}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            founder.track === 'sourcing'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : founder.track === 'due-diligence'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          }`}
                        >
                          {founder.track === 'both' ? 'Tracks 1 & 2' : `Track: ${founder.track}`}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-1">{founder.tagline}</p>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
                        <span>📍 {founder.location}</span>
                        <span>•</span>
                        <span>Stage: <strong className="text-slate-200">{founder.fundingStage}</strong></span>
                        <span>•</span>
                        <span>Target Round: <strong className="text-slate-200">{founder.askAmount}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: 100% Score Breakdown Bars */}
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex-1 max-w-lg space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                        100% Score Breakdown
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        CSE Snippets: <strong className="text-amber-400">{founder.cseFoundSnippets}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      <div className="space-y-1">
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(founder.scores.domainDepth / 25) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400">Domain {founder.scores.domainDepth}/25</p>
                      </div>

                      <div className="space-y-1">
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${(founder.scores.tractionVelocity / 25) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400">Traction {founder.scores.tractionVelocity}/25</p>
                      </div>

                      <div className="space-y-1">
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${(founder.scores.marketTAM / 20) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400">TAM {founder.scores.marketTAM}/20</p>
                      </div>

                      <div className="space-y-1">
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${(founder.scores.cseSignals / 15) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400">CSE {founder.scores.cseSignals}/15</p>
                      </div>

                      <div className="space-y-1">
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${(founder.scores.dueDiligence / 15) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400">DD {founder.scores.dueDiligence}/15</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Total Score & Quick Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 min-w-[200px]">
                    {/* Score Ring */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-2 rounded-xl border flex flex-col items-center justify-center min-w-[70px] ${getScoreBadgeColor(
                          founder.scores.totalScore
                        )}`}
                      >
                        <span className="text-xl font-black leading-none">
                          {founder.scores.totalScore}%
                        </span>
                        <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80 mt-0.5">
                          Total Score
                        </span>
                      </div>
                    </div>

                    {/* Quick Button Group */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRunCSESearch(founder.cseQuery)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        title="Query Google Custom Search Engine"
                      >
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        <span className="hidden sm:inline">CSE Web</span>
                      </button>

                      <button
                        onClick={() => onSelectFounder(founder)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow transition-all cursor-pointer"
                      >
                        <span>Audit</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Action to add new founder */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onOpenAddFounder}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>Evaluate & Calculate 100% Score for New Founder</span>
        </button>
      </div>
    </div>
  );
};
