import React, { useState } from 'react';
import {
  X,
  Layers,
  Activity,
  Cpu,
  FileCheck,
  Users,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Founder } from '../types';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
  founder: Founder | null;
}

export const TechStackModal: React.FC<TechStackModalProps> = ({
  isOpen,
  onClose,
  founder,
}) => {
  if (!isOpen || !founder) return null;

  const [activeTech, setActiveTech] = useState<'mcp' | 'akta' | 'roundtable' | 'nicrron'>('mcp');

  const { techStack } = founder;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Layers className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Required Project Technologies & Agent Telemetry</h3>
                <p className="text-xs text-slate-400">
                  Infrastructure audit for <strong>{founder.name}</strong> ({founder.startup})
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Required Technology Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTech('mcp')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTech === 'mcp'
                ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500/40'
                : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-400 uppercase">MCP Agent</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="font-bold text-xs text-white mt-1">prism.blockconvey.com</p>
            <span className="text-[10px] text-slate-400">Block Convey MCP</span>
          </button>

          <button
            onClick={() => setActiveTech('akta')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTech === 'akta'
                ? 'bg-purple-600/15 border-purple-500 ring-1 ring-purple-500/40'
                : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-purple-400 uppercase">AI Memo</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">{techStack.aktaProWokelo.investmentMemoScore}/100</span>
            </div>
            <p className="font-bold text-xs text-white mt-1">akta.pro</p>
            <span className="text-[10px] text-slate-400">by Wokelo AI</span>
          </button>

          <button
            onClick={() => setActiveTech('roundtable')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTech === 'roundtable'
                ? 'bg-indigo-600/15 border-indigo-500 ring-1 ring-indigo-500/40'
                : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">Syndicate</span>
              <span className="text-[10px] font-mono text-indigo-300 font-bold">{techStack.roundtableCP.committedPercent}%</span>
            </div>
            <p className="font-bold text-xs text-white mt-1">Roundtable. CP</p>
            <span className="text-[10px] text-slate-400">SPV Co-Investment</span>
          </button>

          <button
            onClick={() => setActiveTech('nicrron')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTech === 'nicrron'
                ? 'bg-emerald-600/15 border-emerald-500 ring-1 ring-emerald-500/40'
                : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Telemetry</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="font-bold text-xs text-white mt-1">NicrronNinoo</p>
            <span className="text-[10px] text-slate-400">Pipeline Protocol</span>
          </button>
        </div>

        {/* Tab 1: prism.blockconvey.com by Block Convey (MCP Agent Monitor) */}
        {activeTech === 'mcp' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-blue-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <h4 className="font-bold text-sm text-white">prism.blockconvey.com — MCP Agent Monitor</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    Live Model Context Protocol (MCP) server & agent supervision telemetry.
                  </p>
                </div>

                <a
                  href={techStack.prismBlockConvey.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span>Open prism.blockconvey.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 text-center pt-2">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase">Active MCP Tools</span>
                  <p className="text-lg font-bold text-blue-400 mt-0.5">{techStack.prismBlockConvey.mcpToolsCount} tools</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase">Agent Response Latency</span>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5">{techStack.prismBlockConvey.agentLatencyMs} ms</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase">Monitor Status</span>
                  <p className="text-lg font-bold text-white mt-0.5 capitalize">{techStack.prismBlockConvey.status}</p>
                </div>
              </div>

              {/* MCP Tool Registry */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-semibold text-slate-300">Verified MCP Endpoints:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span>tools/sourcing_scout</span>
                    <span className="text-emerald-400">✓ Healthy</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span>tools/due_diligence_ast</span>
                    <span className="text-emerald-400">✓ Healthy</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span>tools/sec_edgar_filings</span>
                    <span className="text-emerald-400">✓ Healthy</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span>tools/google_cse_citations</span>
                    <span className="text-emerald-400">✓ Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: akta.pro by Wokelo AI */}
        {activeTech === 'akta' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-purple-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-purple-400" />
                    <h4 className="font-bold text-sm text-white">akta.pro by Wokelo AI — Investment Diligence Brief</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    Automated competitive landscape, TAM quantification, and defensive moat analysis.
                  </p>
                </div>

                <a
                  href={techStack.aktaProWokelo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span>Open akta.pro</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">AI Moat Analysis & Thesis:</span>
                  <span className="font-mono text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded">
                    Score: {techStack.aktaProWokelo.investmentMemoScore}/100
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                  "{techStack.aktaProWokelo.moatAnalysis}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Roundtable. CP */}
        {activeTech === 'roundtable' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-indigo-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <h4 className="font-bold text-sm text-white">Roundtable. CP — Syndicate Co-Investment & SPV</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    Collaborative venture syndicate deal-room, allocation pool, and LP quorum voting.
                  </p>
                </div>

                <a
                  href="https://luma.com/vc-hack-nyc?tk=CmQIOo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span>Roundtable Deal-Room</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[11px]">Syndicate SPV Pool</span>
                    <p className="text-base font-bold text-white">{techStack.roundtableCP.spvPoolName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-[11px]">Allocation Target</span>
                    <p className="text-base font-bold text-emerald-400">{techStack.roundtableCP.allocationTarget}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>LP Soft-Commit Allocation</span>
                    <span className="font-bold text-indigo-400">{techStack.roundtableCP.committedPercent}% Filled</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                      style={{ width: `${techStack.roundtableCP.committedPercent}%` }}
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Quorum Status:</span>
                  <span className="font-semibold text-emerald-400">{techStack.roundtableCP.quorumStatus}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: NicrronNinoo */}
        {activeTech === 'nicrron' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-sm text-white">NicrronNinoo — Neural Pipeline Telemetry</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    Real-time founder telemetry agent protocol syncing candidate repository events.
                  </p>
                </div>

                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-mono font-bold">
                  {techStack.nicrronNinoo.telemetryVersion}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Agent Sync Rate</span>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5">{techStack.nicrronNinoo.agentSyncRate}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Last Telemetry Heartbeat</span>
                  <p className="text-lg font-bold text-white mt-0.5">{techStack.nicrronNinoo.lastPing}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
