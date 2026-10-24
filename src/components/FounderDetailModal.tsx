import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Globe,
  ExternalLink,
  Star,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  Search,
  Share2,
  TrendingUp,
  FileText,
  Activity,
  Layers,
  Calendar,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Legend
} from 'recharts';
import { Founder, ScoreHistoryPoint } from '../types';
import { CSE_CONFIG } from '../data/mockData';

interface FounderDetailModalProps {
  founder: Founder | null;
  onClose: () => void;
  onToggleStar: (founderId: string) => void;
  onRunCSESearch: (query: string) => void;
  onUpdateScore?: (founderId: string, newTotal: number) => void;
}

export const FounderDetailModal: React.FC<FounderDetailModalProps> = ({
  founder,
  onClose,
  onToggleStar,
  onRunCSESearch,
}) => {
  if (!founder) return null;

  const [activeTab, setActiveTab] = useState<'scorecard' | 'history' | 'cseAudit' | 'diligence'>('scorecard');
  const [showSubMetrics, setShowSubMetrics] = useState(false);

  const { scores } = founder;

  // Generate realistic historical progression points if not explicitly defined
  const getHistoricalProgression = (): ScoreHistoryPoint[] => {
    if (founder.history && founder.history.length > 0) {
      return founder.history;
    }
    const current = founder.scores.totalScore;
    return [
      {
        date: 'Oct 02',
        stage: 'Initial Discovery Signal',
        totalScore: Math.max(48, current - 26),
        domainDepth: Math.max(12, founder.scores.domainDepth - 6),
        tractionVelocity: Math.max(10, founder.scores.tractionVelocity - 8),
        marketTAM: Math.max(10, founder.scores.marketTAM - 4),
        cseSignals: Math.max(5, founder.scores.cseSignals - 4),
        dueDiligence: Math.max(5, founder.scores.dueDiligence - 4),
      },
      {
        date: 'Oct 08',
        stage: 'Track 1 Sourcing Ingest',
        totalScore: Math.max(56, current - 19),
        domainDepth: Math.max(15, founder.scores.domainDepth - 4),
        tractionVelocity: Math.max(13, founder.scores.tractionVelocity - 6),
        marketTAM: Math.max(12, founder.scores.marketTAM - 3),
        cseSignals: Math.max(7, founder.scores.cseSignals - 3),
        dueDiligence: Math.max(7, founder.scores.dueDiligence - 3),
      },
      {
        date: 'Oct 14',
        stage: 'Devpost Join & Codebase',
        totalScore: Math.max(65, current - 13),
        domainDepth: Math.max(18, founder.scores.domainDepth - 2),
        tractionVelocity: Math.max(16, founder.scores.tractionVelocity - 4),
        marketTAM: Math.max(14, founder.scores.marketTAM - 2),
        cseSignals: Math.max(9, founder.scores.cseSignals - 2),
        dueDiligence: Math.max(8, founder.scores.dueDiligence - 2),
      },
      {
        date: 'Oct 18',
        stage: 'Track 2 AST DD Audit',
        totalScore: Math.max(74, current - 7),
        domainDepth: Math.max(20, founder.scores.domainDepth - 1),
        tractionVelocity: Math.max(18, founder.scores.tractionVelocity - 2),
        marketTAM: founder.scores.marketTAM,
        cseSignals: Math.max(11, founder.scores.cseSignals - 1),
        dueDiligence: Math.max(10, founder.scores.dueDiligence - 1),
      },
      {
        date: 'Oct 21',
        stage: 'Google CSE Citation Peak',
        totalScore: Math.max(82, current - 2),
        domainDepth: founder.scores.domainDepth,
        tractionVelocity: Math.max(20, founder.scores.tractionVelocity - 1),
        marketTAM: founder.scores.marketTAM,
        cseSignals: founder.scores.cseSignals,
        dueDiligence: founder.scores.dueDiligence,
      },
      {
        date: 'Oct 24',
        stage: 'Final 100% Scorecard',
        totalScore: current,
        domainDepth: founder.scores.domainDepth,
        tractionVelocity: founder.scores.tractionVelocity,
        marketTAM: founder.scores.marketTAM,
        cseSignals: founder.scores.cseSignals,
        dueDiligence: founder.scores.dueDiligence,
      },
    ];
  };

  const historyData = getHistoricalProgression();
  const initialScore = historyData[0]?.totalScore || 65;
  const growthDelta = scores.totalScore - initialScore;

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload as ScoreHistoryPoint;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-700 shadow-2xl text-xs space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="font-bold text-white flex items-center gap-1">
              <Calendar className="w-3 h-3 text-blue-400" />
              {label}
            </span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-semibold">
              {dataPoint.stage}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-300 font-medium">Total 100% Score:</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">
              {dataPoint.totalScore}%
            </span>
          </div>

          <div className="pt-1 border-t border-slate-800/80 space-y-0.5 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Domain Depth:</span>
              <span className="text-blue-300 font-mono">{dataPoint.domainDepth}/25</span>
            </div>
            <div className="flex justify-between">
              <span>Traction Velocity:</span>
              <span className="text-indigo-300 font-mono">{dataPoint.tractionVelocity}/25</span>
            </div>
            <div className="flex justify-between">
              <span>Market TAM:</span>
              <span className="text-purple-300 font-mono">{dataPoint.marketTAM}/20</span>
            </div>
            <div className="flex justify-between">
              <span>Google CSE:</span>
              <span className="text-amber-300 font-mono">{dataPoint.cseSignals}/15</span>
            </div>
            <div className="flex justify-between">
              <span>Due Diligence:</span>
              <span className="text-emerald-300 font-mono">{dataPoint.dueDiligence}/15</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white space-y-6">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={founder.avatar}
                alt={founder.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/40 shadow-lg"
              />
              {founder.verifiedDueDiligence && (
                <div
                  className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow"
                  title="Due Diligence Verified"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                <span className="text-xs text-slate-400">• {founder.role}</span>
                <button
                  onClick={() => onToggleStar(founder.id)}
                  className="text-slate-400 hover:text-amber-400 transition-colors ml-1 cursor-pointer"
                  title="Toggle shortlist"
                >
                  <Star
                    className={`w-4 h-4 ${
                      founder.starred ? 'fill-amber-400 text-amber-400' : 'text-slate-500'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-blue-300">{founder.startup}</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400">{founder.location}</span>
                <span className="text-slate-500">•</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300">
                  {founder.track === 'both' ? 'Tracks 1 & 2' : `Track: ${founder.track}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400">{scores.totalScore}%</span>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Score</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('scorecard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'scorecard' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            100% Scorecard Audit
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'history' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Score Progression Graph (Recharts)</span>
          </button>
          <button
            onClick={() => setActiveTab('cseAudit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'cseAudit' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Google CSE Verification ({founder.cseFoundSnippets})
          </button>
          <button
            onClick={() => setActiveTab('diligence')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'diligence' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Due Diligence & Devpost Feeds
          </button>
        </div>

        {/* Tab 1: 100% Scorecard Audit */}
        {activeTab === 'scorecard' && (
          <div className="space-y-5">
            <p className="text-xs text-slate-300">{founder.tagline}</p>

            {/* Score item grid */}
            <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              {/* Domain Depth */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-blue-400">1. Domain Expertise & Technical Depth (Max 25%)</span>
                  <span className="font-bold text-white">{scores.domainDepth} / 25 pts</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${(scores.domainDepth / 25) * 100}%` }}
                  />
                </div>
              </div>

              {/* Traction Velocity */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-indigo-400">2. Traction Velocity & Hackathon Progress (Max 25%)</span>
                  <span className="font-bold text-white">{scores.tractionVelocity} / 25 pts</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${(scores.tractionVelocity / 25) * 100}%` }}
                  />
                </div>
              </div>

              {/* Market TAM */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-purple-400">3. Market Headroom & TAM (Max 20%)</span>
                  <span className="font-bold text-white">{scores.marketTAM} / 20 pts</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${(scores.marketTAM / 20) * 100}%` }}
                  />
                </div>
              </div>

              {/* CSE Signals */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-amber-400">
                    4. Google Custom Search Engine (CSE) Web Citations (Max 15%)
                  </span>
                  <span className="font-bold text-white">{scores.cseSignals} / 15 pts</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${(scores.cseSignals / 15) * 100}%` }}
                  />
                </div>
              </div>

              {/* Due Diligence */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-emerald-400">
                    5. Track 2 Due-Diligence & Forensic Audit (Max 15%)
                  </span>
                  <span className="font-bold text-white">{scores.dueDiligence} / 15 pts</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${(scores.dueDiligence / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Teaser for Recharts History Graph */}
            <div
              onClick={() => setActiveTab('history')}
              className="bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 hover:border-blue-500/40 p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Historical Total Score Progression</h4>
                  <p className="text-xs text-slate-400">
                    Score climbed from <strong className="text-slate-200">{initialScore}%</strong> to{' '}
                    <strong className="text-emerald-400">{scores.totalScore}%</strong> (+{growthDelta}% over hackathon timeline)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                <span>View Recharts Graph</span>
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            {/* Highlights & Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Investment Highlights
                </h4>
                <ul className="space-y-1 text-xs text-slate-200 list-disc list-inside">
                  {founder.keyHighlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Due-Diligence Watch Items
                </h4>
                <ul className="space-y-1 text-xs text-slate-200 list-disc list-inside">
                  {founder.redFlags.map((rf, i) => (
                    <li key={i}>{rf}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Historical Score Progression (Recharts Line Graph) */}
        {activeTab === 'history' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Historical Progression of Total Score Over Time
                </h4>
                <p className="text-xs text-slate-400">
                  Tracing scorecard evolution from initial discovery through Devpost ingestion, AST code audit, and Google CSE web verification.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSubMetrics(!showSubMetrics)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    showSubMetrics
                      ? 'bg-blue-600 text-white border-blue-500 shadow'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{showSubMetrics ? 'Hide Sub-Scores' : 'Overlay Sub-Scores'}</span>
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[11px]">Initial Discovery</span>
                <p className="text-xl font-extrabold text-white font-mono">{initialScore}%</p>
                <span className="text-[10px] text-slate-500">Oct 02, 2026</span>
              </div>
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[11px]">Current 100% Score</span>
                <p className="text-xl font-extrabold text-emerald-400 font-mono">{scores.totalScore}%</p>
                <span className="text-[10px] text-emerald-400 font-semibold">Active Ranking</span>
              </div>
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[11px]">Overall Score Delta</span>
                <p className="text-xl font-extrabold text-blue-400 font-mono">+{growthDelta}%</p>
                <span className="text-[10px] text-blue-300 font-semibold">Positive Momentum</span>
              </div>
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[11px]">CSE Snippets Mined</span>
                <p className="text-xl font-extrabold text-amber-400 font-mono">{founder.cseFoundSnippets}</p>
                <span className="text-[10px] text-amber-300 font-semibold">cx={CSE_CONFIG.cx.slice(0, 6)}</span>
              </div>
            </div>

            {/* Recharts Line Chart Container */}
            <div className="bg-slate-950/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                <span className="font-semibold text-slate-300">Score Progression Over Hackathon Timeline (Oct 02 - Oct 24)</span>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-3 h-1 bg-emerald-400 rounded-full" />
                    Total 100% Score
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-3 h-0.5 border-t border-dashed border-slate-500" />
                    VC Threshold (90%)
                  </span>
                </div>
              </div>

              <div className="h-[280px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="date"
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      dy={8}
                    />
                    <YAxis
                      domain={[40, 100]}
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      tickFormatter={(val) => `${val}%`}
                      dx={-4}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={90}
                      stroke="#eab308"
                      strokeDasharray="4 4"
                      label={{ value: 'Top 1% Tier', fill: '#eab308', fontSize: 10, position: 'insideTopRight' }}
                    />
                    <ReferenceLine
                      y={75}
                      stroke="#64748b"
                      strokeDasharray="3 3"
                    />

                    {/* Primary Total Score Line */}
                    <Line
                      type="monotone"
                      dataKey="totalScore"
                      name="Total Score (%)"
                      stroke="#10b981"
                      strokeWidth={3.5}
                      dot={{ fill: '#059669', stroke: '#34d399', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8, fill: '#34d399', stroke: '#ffffff', strokeWidth: 2 }}
                    />

                    {/* Optional Sub-Metric Overlay Lines */}
                    {showSubMetrics && (
                      <>
                        <Line
                          type="monotone"
                          dataKey="domainDepth"
                          name="Domain Depth (/25)"
                          stroke="#3b82f6"
                          strokeWidth={1.5}
                          strokeDasharray="2 2"
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="tractionVelocity"
                          name="Traction (/25)"
                          stroke="#818cf8"
                          strokeWidth={1.5}
                          strokeDasharray="2 2"
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="cseSignals"
                          name="CSE Signals (/15)"
                          stroke="#f59e0b"
                          strokeWidth={1.5}
                          strokeDasharray="2 2"
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="dueDiligence"
                          name="Due Diligence (/15)"
                          stroke="#06b6d4"
                          strokeWidth={1.5}
                          strokeDasharray="2 2"
                          dot={false}
                        />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Stage Milestone Steps */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2 border-t border-slate-800/80">
                {historyData.map((pt, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[11px] text-center">
                    <p className="text-slate-400 text-[10px]">{pt.date}</p>
                    <p className="font-bold text-white leading-tight truncate mt-0.5">{pt.stage}</p>
                    <p className="font-mono font-extrabold text-emerald-400 mt-0.5">{pt.totalScore}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: CSE Web Verification */}
        {activeTab === 'cseAudit' && (
          <div className="space-y-4">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-sm">Indexed Search Verification Query</span>
                </div>
                <span className="text-xs text-slate-400">
                  CSE ID: <code className="text-blue-300 font-mono">{CSE_CONFIG.cx}</code>
                </span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 flex items-center justify-between">
                <span>{founder.cseQuery}</span>
                <button
                  onClick={() => {
                    onClose();
                    onRunCSESearch(founder.cseQuery);
                  }}
                  className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Search className="w-3 h-3" />
                  <span>Execute Search</span>
                </button>
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
                <span>Total verified public mentions & patents indexed:</span>
                <span className="font-bold text-amber-400 text-sm">{founder.cseFoundSnippets} results</span>
              </div>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="font-semibold text-slate-300">Quick Search Links:</span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://cse.google.com/cse?cx=${CSE_CONFIG.cx}&q=${encodeURIComponent(founder.cseQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white border border-slate-700 flex items-center gap-1 transition-colors"
                >
                  <Search className="w-3 h-3 text-blue-400" />
                  <span>Open in Google Custom Search Engine</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={CSE_CONFIG.controlPanelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1 transition-colors"
                >
                  <span>Edit CSE Sites in Control Panel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Due Diligence & Devpost Feeds */}
        {activeTab === 'diligence' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-slate-400">Funding Target Round</span>
                <p className="text-base font-bold text-white mt-1">{founder.askAmount} ({founder.fundingStage})</p>
              </div>
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-slate-400">Forensic Verification Status</span>
                <p className="text-base font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  {founder.verifiedDueDiligence ? 'Fully Verified' : 'In Review'}
                </p>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3">
              <h5 className="font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Hackathon Sources
              </h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={founder.devpostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-2.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-blue-300 border border-slate-800 flex items-center justify-between transition-colors"
                >
                  <span>Devpost Software Submission Track</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={founder.lumaHackathonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-2.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-indigo-300 border border-slate-800 flex items-center justify-between transition-colors"
                >
                  <span>NYC VC Hackathon Event (Luma)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Tags:</span>
            {founder.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onRunCSESearch(founder.cseQuery);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Verify on CSE</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
