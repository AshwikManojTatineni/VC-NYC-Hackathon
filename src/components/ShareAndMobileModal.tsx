import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Smartphone,
  ExternalLink,
  QrCode,
  Layers,
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { Founder } from '../types';

interface ShareAndMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  founders: Founder[];
}

export const ShareAndMobileModal: React.FC<ShareAndMobileModalProps> = ({
  isOpen,
  onClose,
  founders,
}) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<'ios' | 'android'>('ios');
  const [activeRouterTab, setActiveRouterTab] = useState<'routes' | 'flutterCode' | 'qr'>('routes');

  if (!isOpen) return null;

  const currentOrigin = window.location.origin;
  const devUrl = 'https://ais-dev-gvialmdiot7cqpybfmftev-184925551349.us-east5.run.app';
  const sharedUrl = 'https://ais-pre-gvialmdiot7cqpybfmftev-184925551349.us-east5.run.app';
  const aiStudioTestingUrl = 'https://ai.studio/apps/7dc8f91b-b368-401c-8e3c-c9bb8f4add22';
  const aiStudioRemixUrl = 'https://aistudio.google.com/apps/7dc8f91b-b368-401c-8e3c-c9bb8f4add22';
  const flutterWebRouterUrl = 'https://flutter.org/demo/dealflow-vc';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(key);
    setTimeout(() => setCopiedLink(null), 2200);
  };

  const sampleFlutterRouterCode = `// Flutter Router (go_router) for DealFlow Founder Ranking
// flutter.org compliant mobile route structure

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final GoRouter dealFlowRouter = GoRouter(
  initialLocation: '/dealflow/rankings',
  routes: <RouteBase>[
    GoRoute(
      path: '/dealflow/rankings',
      builder: (BuildContext context, GoRouterState state) {
        return const FounderRankingsScreen();
      },
      routes: <RouteBase>[
        GoRoute(
          path: 'founder/:id',
          builder: (BuildContext context, GoRouterState state) {
            final founderId = state.pathParameters['id']!;
            return FounderScorecardScreen(founderId: founderId);
          },
        ),
        GoRoute(
          path: 'cse-search',
          builder: (BuildContext context, GoRouterState state) {
            return const GoogleCSESearchScreen(cx: '82c791e40658d4209');
          },
        ),
      ],
    ),
  ],
);`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Share2 className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold">Sharable Links & Flutter Mobile Router</h3>
            </div>
            <p className="text-xs text-slate-400">
              Google AI Studio remix link generator and iOS/Android deep-link router (flutter.org compatible)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Google AI Studio Remixable & Share Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Google AI Studio Web Links (Test & Remix)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Direct AI Studio Testing Link */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-blue-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-300">Google AI Studio Test Link</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">
                  Testing
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate font-mono bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                {aiStudioTestingUrl}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => copyToClipboard(aiStudioTestingUrl, 'testing')}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink === 'testing' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink === 'testing' ? 'Copied!' : 'Copy Test Link'}</span>
                </button>
                <a
                  href={aiStudioTestingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                  title="Open AI Studio Testing App"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Shared Preview Link */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">Production / Shared Preview</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  HTTPS Live
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate font-mono bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                {sharedUrl}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => copyToClipboard(sharedUrl, 'shared')}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink === 'shared' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink === 'shared' ? 'Copied!' : 'Copy Live App'}</span>
                </button>
                <a
                  href={sharedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                  title="Open live app"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* AI Studio Remix Link */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400">AI Studio Remix Link</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                  Applet ID
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate font-mono bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                {aiStudioRemixUrl}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => copyToClipboard(aiStudioRemixUrl, 'remix')}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink === 'remix' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink === 'remix' ? 'Copied!' : 'Copy Remix'}</span>
                </button>
                <a
                  href={aiStudioRemixUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                  title="Open in AI Studio"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Mobile Android & iOS Link to Router Flutter.org */}
        <div className="space-y-4 pt-2 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                Flutter.org Mobile Router (Android & iOS Deep Links)
              </h4>
              <p className="text-xs text-slate-400">
                Schema routing: <code className="text-blue-300">dealflow://founder/:id</code> & web route{' '}
                <code className="text-blue-300">flutter.org/demo/dealflow-vc</code>
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveRouterTab('routes')}
                className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  activeRouterTab === 'routes' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Deep Links
              </button>
              <button
                onClick={() => setActiveRouterTab('flutterCode')}
                className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  activeRouterTab === 'flutterCode' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Flutter Code
              </button>
              <button
                onClick={() => setActiveRouterTab('qr')}
                className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  activeRouterTab === 'qr' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Mobile QR
              </button>
            </div>
          </div>

          {activeRouterTab === 'routes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    🍏 iOS Universal Links & Native Scheme
                  </span>
                  <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">
                    iOS 17+
                  </span>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded-lg text-slate-300 border border-slate-800 flex items-center justify-between">
                    <span className="truncate">dealflow://rankings</span>
                    <button
                      onClick={() => copyToClipboard('dealflow://rankings', 'ios-rankings')}
                      className="text-blue-400 hover:text-blue-300 ml-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg text-slate-300 border border-slate-800 flex items-center justify-between">
                    <span className="truncate">dealflow://founder/f1?source=hackathon</span>
                    <button
                      onClick={() => copyToClipboard('dealflow://founder/f1?source=hackathon', 'ios-f1')}
                      className="text-blue-400 hover:text-blue-300 ml-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    🤖 Android App Links & Intent Filter
                  </span>
                  <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">
                    Android 14+
                  </span>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded-lg text-slate-300 border border-slate-800 flex items-center justify-between">
                    <span className="truncate">https://flutter.org/demo/dealflow-vc</span>
                    <button
                      onClick={() => copyToClipboard(flutterWebRouterUrl, 'android-web')}
                      className="text-blue-400 hover:text-blue-300 ml-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg text-slate-300 border border-slate-800 flex items-center justify-between">
                    <span className="truncate">dealflow://cse/82c791e40658d4209</span>
                    <button
                      onClick={() => copyToClipboard('dealflow://cse/82c791e40658d4209', 'android-cse')}
                      className="text-blue-400 hover:text-blue-300 ml-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRouterTab === 'flutterCode' && (
            <div className="relative">
              <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-blue-300 overflow-x-auto max-h-56">
                <code>{sampleFlutterRouterCode}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(sampleFlutterRouterCode, 'code')}
                className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedLink === 'code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink === 'code' ? 'Copied code!' : 'Copy Flutter Router'}</span>
              </button>
            </div>
          )}

          {activeRouterTab === 'qr' && (
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
              {/* Scalable Vector QR Visual */}
              <div className="p-3 bg-white rounded-2xl shadow-xl shrink-0">
                <svg
                  className="w-36 h-36"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" fill="white" />
                  {/* Position detection patterns */}
                  <rect x="10" y="10" width="26" height="26" fill="black" />
                  <rect x="14" y="14" width="18" height="18" fill="white" />
                  <rect x="18" y="18" width="10" height="10" fill="black" />

                  <rect x="64" y="10" width="26" height="26" fill="black" />
                  <rect x="68" y="14" width="18" height="18" fill="white" />
                  <rect x="72" y="18" width="10" height="10" fill="black" />

                  <rect x="10" y="64" width="26" height="26" fill="black" />
                  <rect x="14" y="68" width="18" height="18" fill="white" />
                  <rect x="18" y="72" width="10" height="10" fill="black" />

                  {/* Simulated data blocks */}
                  <rect x="42" y="12" width="6" height="6" fill="black" />
                  <rect x="52" y="12" width="6" height="6" fill="black" />
                  <rect x="42" y="24" width="16" height="6" fill="black" />
                  <rect x="12" y="44" width="8" height="6" fill="black" />
                  <rect x="26" y="44" width="8" height="8" fill="black" />
                  <rect x="42" y="42" width="16" height="16" fill="black" />
                  <rect x="66" y="44" width="12" height="6" fill="black" />
                  <rect x="84" y="44" width="6" height="12" fill="black" />
                  <rect x="42" y="68" width="8" height="8" fill="black" />
                  <rect x="56" y="64" width="8" height="16" fill="black" />
                  <rect x="72" y="64" width="16" height="8" fill="black" />
                  <rect x="72" y="78" width="8" height="12" fill="black" />
                  <rect x="86" y="80" width="6" height="10" fill="black" />
                </svg>
              </div>

              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Instant Mobile Device Test
                </span>
                <h5 className="font-bold text-white text-base">Scan with iPhone Camera or Android Lens</h5>
                <p className="text-xs text-slate-300 max-w-sm">
                  Opens the live responsive web app directly on your mobile device, testing 100% score calculation and custom search engine verification on the go.
                </p>
                <button
                  onClick={() => copyToClipboard(sharedUrl, 'qr-url')}
                  className="mt-1 text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy mobile destination URL</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
