import React, { useState } from 'react';
import {
  X,
  Share2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Linkedin,
  Twitter,
  Github,
  Award,
  Send,
  Zap
} from 'lucide-react';
import { Founder } from '../types';

interface SocialConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  founder: Founder | null;
  onSocialConnected?: (founderName: string, network: string) => void;
}

export const SocialConnectModal: React.FC<SocialConnectModalProps> = ({
  isOpen,
  onClose,
  founder,
  onSocialConnected,
}) => {
  if (!isOpen || !founder) return null;

  const [selectedTemplate, setSelectedTemplate] = useState<'intro' | 'diligence' | 'syndicate'>('intro');
  const [customMessage, setCustomMessage] = useState('');
  const [copiedNetwork, setCopiedNetwork] = useState<string | null>(null);

  const templates = {
    intro: `Hi ${founder.name},\n\nI came across ${founder.startup} via the NYC VC Hackathon Sourcing Track and noticed your ${founder.scores.totalScore}% ranking score on our dealflow radar. We love your traction in ${founder.tags.join(', ')}.\n\nWould love to connect and schedule a quick Google Meet deep-dive to explore our syndicate allocation!`,
    diligence: `Hi ${founder.name},\n\nFollowing up on ${founder.startup}'s Track 2 Due Diligence AST audit and prism.blockconvey.com MCP monitoring metrics. Your 100-point security audit scored exceptionally well.\n\nCould we jump on a brief 20-min video conference to review your akta.pro moat analysis?`,
    syndicate: `Hi ${founder.name},\n\nWe are organizing a collaborative co-investment pool on Roundtable. CP for your current round (${founder.askAmount} ask, ${founder.fundingStage} stage). Several syndicate LPs are eager to participate.\n\nLet's connect on LinkedIn/X and get an allocation reserved!`,
  };

  const activeMessage = customMessage || templates[selectedTemplate];

  const handleCopyAndOpen = (network: string, url: string) => {
    navigator.clipboard.writeText(activeMessage);
    setCopiedNetwork(network);
    if (onSocialConnected) {
      onSocialConnected(founder.name, network);
    }
    setTimeout(() => {
      setCopiedNetwork(null);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Share2 className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold">Connect on Social Networks</h3>
            </div>
            <p className="text-xs text-slate-400">
              Direct founder channels for <strong>{founder.name}</strong> ({founder.startup})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Founder Social Network Channel Cards */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Verified Founder Social Channels
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* LinkedIn */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">LinkedIn</p>
                  <p className="text-[10px] text-slate-400">Direct InMail</p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopyAndOpen('linkedin', founder.socials?.linkedin || 'https://linkedin.com')
                }
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedNetwork === 'linkedin' ? <Check className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                <span>{copiedNetwork === 'linkedin' ? 'Copied & Opened' : 'DM Pitch'}</span>
              </button>
            </div>

            {/* X / Twitter */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-700 text-slate-200">
                  <Twitter className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">X / Twitter</p>
                  <p className="text-[10px] text-slate-400">Public & DMs</p>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopyAndOpen('twitter', founder.socials?.twitter || 'https://x.com')
                }
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedNetwork === 'twitter' ? <Check className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                <span>{copiedNetwork === 'twitter' ? 'Copied & Opened' : 'DM Pitch'}</span>
              </button>
            </div>

            {/* GitHub */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-900 text-slate-200">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">GitHub Repo</p>
                  <p className="text-[10px] text-slate-400">Track 1 Commits</p>
                </div>
              </div>

              <a
                href={founder.socials?.github || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-[11px] flex items-center gap-1 transition-colors"
              >
                <span>View Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Warpcast */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Warpcast</p>
                  <p className="text-[10px] text-slate-400">Farcaster Social</p>
                </div>
              </div>

              <a
                href={founder.socials?.warpcast || 'https://warpcast.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
              >
                <span>Direct Cast</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* AI VC Outreach Message Templates */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              AI VC Intro Message Generator:
            </label>

            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate('intro');
                  setCustomMessage('');
                }}
                className={`px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  selectedTemplate === 'intro' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                First Look
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate('diligence');
                  setCustomMessage('');
                }}
                className={`px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  selectedTemplate === 'diligence' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Diligence
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate('syndicate');
                  setCustomMessage('');
                }}
                className={`px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  selectedTemplate === 'syndicate' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                }`}
              >
                Roundtable SPV
              </button>
            </div>
          </div>

          <textarea
            rows={5}
            value={activeMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Award className="w-3.5 h-3.5" />
              +100 VC XP awarded upon social network reach-out
            </span>

            <button
              onClick={() => {
                navigator.clipboard.writeText(activeMessage);
                setCopiedNetwork('clipboard');
                setTimeout(() => setCopiedNetwork(null), 2000);
              }}
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer font-semibold"
            >
              {copiedNetwork === 'clipboard' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedNetwork === 'clipboard' ? 'Message Copied!' : 'Copy Template'}</span>
            </button>
          </div>
        </div>

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
