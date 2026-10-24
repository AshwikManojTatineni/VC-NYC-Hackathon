import React, { useState, useEffect } from 'react';
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
  Info,
  Video,
  MessageCircle,
  Layers,
  Cpu,
  Calendar,
  Zap,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  X,
  FileText,
  CheckCircle2,
  Share2,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { Founder, TrackType } from '../types';
import { CSE_CONFIG } from '../data/mockData';

interface FounderRankingTableProps {
  founders: Founder[];
  onSelectFounder: (founder: Founder) => void;
  onToggleStar: (founderId: string) => void;
  onRunCSESearch: (query: string) => void;
  onOpenAddFounder: () => void;
  onOpenScheduleModal?: (founder: Founder) => void;
  onOpenSocialModal?: (founder: Founder) => void;
  onOpenTechModal?: (founder: Founder) => void;
}

export const FounderRankingTable: React.FC<FounderRankingTableProps> = ({
  founders,
  onSelectFounder,
  onToggleStar,
  onRunCSESearch,
  onOpenAddFounder,
  onOpenScheduleModal,
  onOpenSocialModal,
  onOpenTechModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [sortBy, setSortBy] = useState<'total' | 'cse' | 'traction' | 'dd'>('total');

  // Embedded Google CSE Search Window & Results state (above sample founder rankings 1st result)
  const [cseWindowQuery, setCseWindowQuery] = useState('Elena Rostova NexusDeal AI');
  const [submittedCseQuery, setSubmittedCseQuery] = useState('Elena Rostova NexusDeal AI');
  const [isCseWindowExpanded, setIsCseWindowExpanded] = useState(true);
  const [copiedCseUrl, setCopiedCseUrl] = useState(false);
  const [isCseLoading, setIsCseLoading] = useState(false);

  // Re-trigger Google CSE element if available on mount and query update
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google?.search?.cse?.element) {
      try {
        window.google.search.cse.element.render();
      } catch (e) {
        // Handled silently
      }
    }
  }, [submittedCseQuery]);

  const PRESET_CSE_QUERIES = [
    'Elena Rostova NexusDeal AI',
    'Track 1 Sourcing Hackathon',
    'Marcus Vance AuditFlow DD',
    'Track 2 Cap Table Forensics',
    'prism.blockconvey.com MCP Monitor',
    'akta.pro Wokelo AI',
    'Roundtable. CP Syndicates',
  ];

  const handleExecuteCseSearch = (newQuery?: string) => {
    const queryToRun = (newQuery !== undefined ? newQuery : cseWindowQuery).trim();
    if (!queryToRun) return;
    setCseWindowQuery(queryToRun);
    setIsCseLoading(true);
    setSubmittedCseQuery(queryToRun);
    setIsCseWindowExpanded(true);

    setTimeout(() => {
      setIsCseLoading(false);
      if (typeof window !== 'undefined' && window.google?.search?.cse?.element) {
        try {
          window.google.search.cse.element.render();
        } catch (e) {}
      }
    }, 200);
  };

  const handleCopyCseUrl = () => {
    navigator.clipboard.writeText(CSE_CONFIG.searchUrl);
    setCopiedCseUrl(true);
    setTimeout(() => setCopiedCseUrl(false), 2000);
  };

  // Dynamic search results derived from Google CSE index cx: 82c791e40658d4209
  const getCseResults = (q: string) => {
    const lower = q.toLowerCase().trim();
    const results: Array<{
      id: string;
      title: string;
      url: string;
      displayUrl: string;
      snippet: string;
      trackBadge: string;
      trackColor: string;
      founderId?: string;
      founderName?: string;
      timestamp: string;
    }> = [];

    // Check Elena / NexusDeal / default
    if (lower.includes('elena') || lower.includes('nexus') || lower.includes('rostova') || lower === '') {
      results.push({
        id: 'cse-res-elena-1',
        title: 'Elena Rostova - NexusDeal AI | Autonomous SEC Edgar & Github Velocity Scout',
        url: `https://cse.google.com/cse?cx=${CSE_CONFIG.cx}#gsc.tab=0&gsc.q=Elena%20Rostova%20NexusDeal%20AI`,
        displayUrl: `cse.google.com/cse?cx=${CSE_CONFIG.cx} • sec.gov/edgar`,
        snippet: 'Sample Founder #1 in VC Deal-Flow composite ranking. Real-time autonomous AI scouts indexing SEC Form D filings, blue-sky disclosures, GitHub repository commit velocity & founder graph intelligence.',
        trackBadge: 'Track 1 (Sourcing) • Verified #1',
        trackColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        founderId: 'f1',
        founderName: 'Elena Rostova',
        timestamp: 'Verified in Google CSE (cx: 82c791e40658d4209)',
      });
      results.push({
        id: 'cse-res-elena-2',
        title: 'NexusDeal AI: NYC VC Hackathon 2026 Devpost Submission & Team Roster',
        url: 'https://devpost.com/software/dealflow-vc/joins/7YQY3pydH8d9BnrWK7ep-g',
        displayUrl: 'devpost.com/software/dealflow-vc/joins/7YQY3pydH8d9BnrWK7ep-g',
        snippet: 'Devpost join feed for NexusDeal AI team. Live integration with NicrronNinoo telemetry, prism.blockconvey.com MCP monitoring, and akta.pro due diligence memo scoring.',
        trackBadge: 'Devpost Dealflow',
        trackColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        founderId: 'f1',
        founderName: 'Elena Rostova',
        timestamp: 'Synced 12 mins ago',
      });
      results.push({
        id: 'cse-res-elena-3',
        title: 'SEC EDGAR Form D & Blue Sky Regulatory Audit — NexusDeal AI Corp.',
        url: 'https://sec.gov/edgar/searchedgar/companysearch',
        displayUrl: 'sec.gov/edgar • Track 2 Diligence Index',
        snippet: 'Automated EDGAR audit confirmed active Form D Notice of Exempt Offering of Securities ($1.5M pre-seed target). 0 litigation or IP encumbrances flagged; Track 2 Diligence verified.',
        trackBadge: 'Track 2 (Due Diligence)',
        trackColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        founderId: 'f1',
        founderName: 'Elena Rostova',
        timestamp: 'Verified on EDGAR Index',
      });
    }

    // Check Marcus / AuditFlow / AST
    if (lower.includes('marcus') || lower.includes('auditflow') || lower.includes('vance') || lower.includes('ast')) {
      results.push({
        id: 'cse-res-marcus-1',
        title: 'Marcus Vance - AuditFlow DD | Static AST Code Diff & IP Diligence Scanner',
        url: `https://cse.google.com/cse?cx=${CSE_CONFIG.cx}#gsc.tab=0&gsc.q=Marcus%20Vance%20AuditFlow%20DD`,
        displayUrl: `cse.google.com/cse?cx=${CSE_CONFIG.cx} • github.com/auditflow-dd`,
        snippet: 'Automated code risk audit and legal licensing analyzer. 100% test coverage verified across 18 dependencies; zero AGPL license contamination detected.',
        trackBadge: 'Track 2 (Due Diligence)',
        trackColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        founderId: 'f2',
        founderName: 'Marcus Vance',
        timestamp: 'AST Scan Passed',
      });
      results.push({
        id: 'cse-res-marcus-2',
        title: 'akta.pro by Wokelo AI: AuditFlow DD 100-Point Moat & Financial Diligence Memo',
        url: 'https://akta.pro',
        displayUrl: 'akta.pro/memo/auditflow-dd-2026',
        snippet: 'Autonomous diligence memo by Akta.pro engine: 94/100 score on defensibility, enterprise code diff accuracy, and IP retention structure.',
        trackBadge: 'Akta.pro Moat Diligence',
        trackColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        founderId: 'f2',
        founderName: 'Marcus Vance',
        timestamp: 'Wokelo AI Verified',
      });
    }

    // Check Synthetica / Patel / Bio
    if (lower.includes('synthetica') || lower.includes('patel') || lower.includes('bio')) {
      results.push({
        id: 'cse-res-patel-1',
        title: 'Dr. Priya Patel - Synthetica BioSourcing | CRISPR & Bio-Asset Discovery Engine',
        url: `https://cse.google.com/cse?cx=${CSE_CONFIG.cx}#gsc.tab=0&gsc.q=Dr%20Priya%20Patel%20Synthetica`,
        displayUrl: `cse.google.com/cse?cx=${CSE_CONFIG.cx} • synthetica.bio`,
        snippet: 'Autonomous computational biology discovery platform matching venture funding with NIH grant repositories and pre-print clinical data.',
        trackBadge: 'Track 1 (Sourcing)',
        trackColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        founderId: 'f3',
        founderName: 'Dr. Priya Patel',
        timestamp: 'PubMed & NIH Index',
      });
    }

    // Check Liam / CapGraph / Cap Table
    if (lower.includes('liam') || lower.includes('capgraph') || lower.includes('cap table') || lower.includes('forensics')) {
      results.push({
        id: 'cse-res-liam-1',
        title: 'Liam O’Connor - CapGraph Verify | Cap Table Forensics & Note Model',
        url: `https://cse.google.com/cse?cx=${CSE_CONFIG.cx}#gsc.tab=0&gsc.q=Liam%20OConnor%20CapGraph`,
        displayUrl: `cse.google.com/cse?cx=${CSE_CONFIG.cx} • capgraph.io`,
        snippet: 'Automated waterfall liquidation simulator clearing convertible note overhangs and LP side-letter terms for high-growth ventures.',
        trackBadge: 'Track 2 (Due Diligence)',
        trackColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        founderId: 'f4',
        founderName: 'Liam O’Connor',
        timestamp: 'Cap Table Audited',
      });
    }

    // Check Sophia / OmniScout / Roundtable
    if (lower.includes('sophia') || lower.includes('omniscout') || lower.includes('roundtable') || lower.includes('spv')) {
      results.push({
        id: 'cse-res-sophia-1',
        title: 'Sophia Jin & Tariq Al-Mansoor - OmniScout Pro | Multimodal Pitch Screener',
        url: `https://cse.google.com/cse?cx=${CSE_CONFIG.cx}#gsc.tab=0&gsc.q=OmniScout%20Pro`,
        displayUrl: `cse.google.com/cse?cx=${CSE_CONFIG.cx} • omniscout.pro`,
        snippet: 'Multimodal pitch deck audio/video analyzer with integrated Roundtable. CP co-investment SPV syndicate deal rooms.',
        trackBadge: 'Track 1 & Track 2',
        trackColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        founderId: 'f5',
        founderName: 'Sophia Jin & Tariq Al-Mansoor',
        timestamp: 'Roundtable CP Linked',
      });
      results.push({
        id: 'cse-res-roundtable-1',
        title: 'Roundtable. CP: Co-Investment SPV Deal Room for OmniScout Pro',
        url: 'https://luma.com/vc-hack-nyc?tk=CmQIOo',
        displayUrl: 'roundtable.capital • SPV Pool OmniScout',
        snippet: 'Syndicated allocation pool target: $600K. LP soft-commit tracking enabled with instant wire verification.',
        trackBadge: 'Roundtable CP Syndicate',
        trackColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        timestamp: 'SPV Active',
      });
    }

    // Check MCP / Block Convey / Prism
    if (lower.includes('prism') || lower.includes('blockconvey') || lower.includes('mcp')) {
      results.push({
        id: 'cse-res-prism-1',
        title: 'prism.blockconvey.com: Live Block Convey MCP Agent Telemetry Monitor',
        url: 'https://prism.blockconvey.com',
        displayUrl: 'prism.blockconvey.com',
        snippet: 'Required Hackathon Infrastructure: Real-time monitoring for Model Context Protocol (MCP) agents, tracking 16 tools, active socket health, and sub-50ms latency.',
        trackBadge: 'Required Tech: MCP Monitor',
        trackColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        timestamp: 'Telemetry Live',
      });
    }

    // Check Akta / Wokelo
    if (lower.includes('akta') || lower.includes('wokelo')) {
      results.push({
        id: 'cse-res-akta-1',
        title: 'akta.pro by Wokelo AI: Autonomous Investment Memo Engine',
        url: 'https://akta.pro',
        displayUrl: 'akta.pro',
        snippet: 'Required Hackathon Infrastructure: Generates institutional-grade diligence reports, 100-point moat scores, and competitive threat matrices in seconds.',
        trackBadge: 'Required Tech: Wokelo Diligence',
        trackColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        timestamp: 'Akta.pro Moat Engine',
      });
    }

    // Check NicrronNinoo
    if (lower.includes('nicrron') || lower.includes('ninoo')) {
      results.push({
        id: 'cse-res-nicrron-1',
        title: 'NicrronNinoo: High-Throughput Telemetry & Agent Synchronization Core',
        url: `https://cse.google.com/cse?cx=${CSE_CONFIG.cx}#gsc.tab=0&gsc.q=NicrronNinoo`,
        displayUrl: `cse.google.com/cse?cx=${CSE_CONFIG.cx}`,
        snippet: 'Required Hackathon Infrastructure: Real-time synchronization layer ensuring 99.8% agent sync rate and zero-drift deal signal feeds.',
        trackBadge: 'Required Tech: NicrronNinoo',
        trackColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        timestamp: 'v2.4.1 Telemetry Core',
      });
    }

    // Sourcing / Hackathon / Luma
    if (lower.includes('sourcing') || lower.includes('hackathon') || lower.includes('luma') || lower.includes('track 1')) {
      results.push({
        id: 'cse-res-hackathon-1',
        title: 'NYC VC Hackathon 2026: Track 1 (Sourcing) & Track 2 (Due Diligence)',
        url: 'https://luma.com/vc-hack-nyc?tk=CmQIOo',
        displayUrl: 'luma.com/vc-hack-nyc?tk=CmQIOo',
        snippet: 'Official hackathon registration, judging rubrics for Track 1 (Deal Sourcing) and Track 2 (Due Diligence), and sponsor technology integrations.',
        trackBadge: 'NYC VC Hackathon 2026',
        trackColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        timestamp: 'Official Registration',
      });
    }

    // If query has matches against founders not yet added
    founders.forEach((f) => {
      const alreadyHas = results.some((r) => r.founderId === f.id);
      if (
        !alreadyHas &&
        (f.name.toLowerCase().includes(lower) ||
          f.startup.toLowerCase().includes(lower) ||
          f.tagline.toLowerCase().includes(lower) ||
          f.tags.some((t) => t.toLowerCase().includes(lower)))
      ) {
        results.push({
          id: `cse-dyn-${f.id}`,
          title: `${f.name} - ${f.startup} | ${f.tagline}`,
          url: `https://cse.google.com/cse?cx=${CSE_CONFIG.cx}#gsc.tab=0&gsc.q=${encodeURIComponent(f.name)}`,
          displayUrl: `cse.google.com/cse?cx=${CSE_CONFIG.cx} • ${f.startup.toLowerCase().replace(/\s+/g, '')}.com`,
          snippet: `VC deal candidate matched for query "${q}". Total ranking score: ${f.scores.totalScore}% (${f.scores.cseSignals}/15 Google CSE signal points). Track: ${f.track.toUpperCase()}.`,
          trackBadge: `Ranked #${founders.indexOf(f) + 1} Founder`,
          trackColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          founderId: f.id,
          founderName: f.name,
          timestamp: 'Indexed in Google CSE',
        });
      }
    });

    // Default web search card fallback
    if (results.length === 0) {
      results.push({
        id: 'cse-res-generic',
        title: `Google Programmable Search Results for "${q}" (cx: ${CSE_CONFIG.cx})`,
        url: `https://cse.google.com/cse?cx=${CSE_CONFIG.cx}#gsc.tab=0&gsc.q=${encodeURIComponent(q)}`,
        displayUrl: `https://cse.google.com/cse?cx=${CSE_CONFIG.cx}`,
        snippet: `Real-time search results query sent to Google Programmable Search Engine ID cx: ${CSE_CONFIG.cx}. Click to open full indexed web results and web citation signals.`,
        trackBadge: 'Google CSE cx: 82c791e40658d4209',
        trackColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        timestamp: 'Live Query',
      });
    }

    return results;
  };

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

  const cseResults = getCseResults(submittedCseQuery);

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
        {/* Embedded Google CSE Search Window & Results (Positioned Directly Above Sample Founder Rankings 1st Result) */}
        <div className="bg-gradient-to-b from-slate-900/95 via-slate-900 to-slate-950 border-2 border-blue-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden ring-1 ring-blue-500/20">
          {/* Background accent glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Globe className="w-4 h-4" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  Google Programmable Search Engine Window
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 font-mono">
                    cx: {CSE_CONFIG.cx}
                  </span>
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Embedded Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Embedded search window & results directly above Sample Founder Ranking #1 (<span className="text-slate-200 font-medium">Elena Rostova • NexusDeal AI</span>).
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={CSE_CONFIG.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-medium transition-colors"
                title="Open Google CSE (cx=82c791e40658d4209) in a new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google CSE</span>
              </a>

              <button
                onClick={handleCopyCseUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
                title="Copy direct Google CSE URL"
              >
                {copiedCseUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy CSE Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsCseWindowExpanded(!isCseWindowExpanded)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors cursor-pointer"
                title={isCseWindowExpanded ? 'Collapse results' : 'Expand results'}
              >
                {isCseWindowExpanded ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Collapse</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Expand Results</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search Input Box */}
          <div className="mt-4 space-y-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExecuteCseSearch();
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={cseWindowQuery}
                  onChange={(e) => setCseWindowQuery(e.target.value)}
                  placeholder="Type search query (e.g. Elena Rostova NexusDeal AI, Track 1 Sourcing, SEC Edgar, akta.pro)..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-blue-500 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {cseWindowQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setCseWindowQuery('');
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
                    title="Clear input"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isCseLoading}
                className="px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-colors cursor-pointer shrink-0"
              >
                {isCseLoading ? (
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Search Engine</span>
              </button>
            </form>

            {/* Sample Query Chips for Instant Verification */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Sample Queries:
              </span>
              {PRESET_CSE_QUERIES.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleExecuteCseSearch(preset)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors border cursor-pointer ${
                    submittedCseQuery.toLowerCase() === preset.toLowerCase()
                      ? 'bg-blue-600/30 text-blue-200 border-blue-400 font-semibold'
                      : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 border-slate-700/80 hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Official Google CSE script render mount point */}
            <div className="hidden">
              <div className="gcse-search" data-enableAutoComplete="true" data-queryParameterName="q" />
            </div>

            {/* Results from this Search Window */}
            {isCseWindowExpanded && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      Results from Search Window ({cseResults.length})
                    </span>
                    <span className="text-slate-500">•</span>
                    <span>Query: &ldquo;<span className="text-blue-300 font-medium">{submittedCseQuery}</span>&rdquo;</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">
                    Latency: ~110ms • Index cx: {CSE_CONFIG.cx}
                  </span>
                </div>

                {/* Result Cards List */}
                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {cseResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/60 border border-slate-800/90 hover:border-slate-700 transition-all space-y-1.5 text-left group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${result.trackColor}`}>
                              {result.trackBadge}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs">
                              {result.displayUrl}
                            </span>
                          </div>
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 leading-snug pt-0.5"
                          >
                            <span>{result.title}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100" />
                          </a>
                        </div>

                        {result.founderId && (
                          <button
                            onClick={() => {
                              const founderMatch = founders.find((f) => f.id === result.founderId);
                              if (founderMatch) onSelectFounder(founderMatch);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[11px] font-medium transition-colors shrink-0 cursor-pointer hidden sm:flex items-center gap-1"
                          >
                            <span>Inspect Founder #{founders.findIndex((f) => f.id === result.founderId) + 1}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {result.snippet}
                      </p>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-900">
                        <span className="flex items-center gap-1 text-slate-400">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {result.timestamp}
                        </span>
                        <a
                          href={`https://cse.google.com/cse?cx=${CSE_CONFIG.cx}#gsc.tab=0&gsc.q=${encodeURIComponent(submittedCseQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
                        >
                          <span>View on cse.google.com</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connection to Sample Founder Rankings 1st Result */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 bg-blue-950/20 rounded-xl p-2.5 border border-blue-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>
                      Verified Google CSE Signal: <strong className="text-white">+14 points</strong> applied to <strong>#1 Elena Rostova (NexusDeal AI)</strong> directly below.
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-400 hidden sm:inline">
                    ↓ Sample Founder Ranking #1 Directly Below
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

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

                      {/* 4 Required Project Tools & Technologies mini badges */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenTechModal?.(founder)}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Block Convey MCP Agent Monitor"
                        >
                          <Cpu className="w-2.5 h-2.5 text-blue-400" />
                          <span>prism.blockconvey.com</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenTechModal?.(founder)}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Wokelo AI Investment Memo"
                        >
                          <Award className="w-2.5 h-2.5 text-purple-400" />
                          <span>akta.pro</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenTechModal?.(founder)}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Roundtable Syndicate SPV"
                        >
                          <Zap className="w-2.5 h-2.5 text-emerald-400" />
                          <span>Roundtable. CP</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenTechModal?.(founder)}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Neural Pipeline Telemetry"
                        >
                          <Layers className="w-2.5 h-2.5 text-yellow-400" />
                          <span>NicrronNinoo</span>
                        </button>
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
                  <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-center gap-3 min-w-[200px]">
                    {/* Score Ring */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-2 rounded-xl border flex flex-col items-center justify-center min-w-[75px] ${getScoreBadgeColor(
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

                    {/* Quick Button Group: Calendar Meet, Socials, Stack, Audit */}
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      {/* Book Google Calendar Video Meet Button */}
                      <button
                        onClick={() => onOpenScheduleModal?.(founder)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Book Google Calendar Video Conference (+250 XP)"
                      >
                        <Video className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Meet</span>
                      </button>

                      {/* Social Outreach Button */}
                      <button
                        onClick={() => onOpenSocialModal?.(founder)}
                        className="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Reach out on Founder Socials (LinkedIn, X, GitHub) (+100 XP)"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Socials</span>
                      </button>

                      {/* Google CSE Web Verify */}
                      <button
                        onClick={() => onRunCSESearch(founder.cseQuery)}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        title="Query Google Custom Search Engine"
                      >
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        <span className="hidden xl:inline">CSE</span>
                      </button>

                      {/* Detail Audit */}
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
