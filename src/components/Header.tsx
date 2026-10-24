import React from 'react';
import {
  Search,
  Bell,
  Share2,
  Sparkles,
  ExternalLink,
  Smartphone,
  ShieldCheck,
  Zap,
  User,
  Plus,
  Globe,
  Database,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';
import { CSE_CONFIG } from '../data/mockData';

interface HeaderProps {
  activeTab: 'rankings' | 'cse' | 'feed' | 'profile' | 'mobile';
  setActiveTab: (tab: 'rankings' | 'cse' | 'feed' | 'profile' | 'mobile') => void;
  user: UserProfile;
  unreadCount: number;
  onOpenAddFounder: () => void;
  onOpenFreeTierModal: () => void;
  onOpenGoogleOAuthModal: () => void;
  onOpenShareModal: () => void;
  notificationPermission: NotificationPermission;
  onRequestNotificationPermission: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  user,
  unreadCount,
  onOpenAddFounder,
  onOpenFreeTierModal,
  onOpenGoogleOAuthModal,
  onOpenShareModal,
  notificationPermission,
  onRequestNotificationPermission,
}) => {
  const dailyRequestsUsed = user.dailyRequestsUsed ?? 14;
  const dailyRequestsTotal = user.dailyRequestsTotal ?? 100;
  const dailyTokensUsed = user.dailyTokensUsed ?? 42500;
  const dailyTokensTotal = user.dailyTokensTotal ?? 1000000;

  const requestsPercent = Math.min(100, Math.round((dailyRequestsUsed / dailyRequestsTotal) * 100));
  const tokensPercent = Math.min(100, Math.round((dailyTokensUsed / dailyTokensTotal) * 100));

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Bar with Hackathon Info & Free Tier Usages */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border-b border-slate-800 px-3 sm:px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Hackathon & Sourcing/DD Links */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1.5 font-bold text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              NYC VC Hackathon 2026
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href={CSE_CONFIG.hackathonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white underline underline-offset-2 flex items-center gap-1 transition-colors"
            >
              Luma Track
              <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a
              href={CSE_CONFIG.devpostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 flex items-center gap-1 transition-colors"
            >
              Devpost Sourcing & DD Track
              <ExternalLink className="w-2.5 h-2.5 text-indigo-400" />
            </a>
          </div>

          {/* Right: Daily Requests Usage / Total & Daily Token Usage / Total */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Daily Webapp Google Free Tier Requests Usage / Total */}
            <button
              onClick={onOpenFreeTierModal}
              className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 transition-all cursor-pointer"
              title="Daily Webapp Google Free Tier Requests Usage / Total"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <div className="text-left flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-slate-300">Requests:</span>
                <span className="text-[11px] font-bold text-white font-mono">
                  {dailyRequestsUsed} / {dailyRequestsTotal}
                </span>
                <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden md:block">
                  <div
                    className="h-full bg-blue-400 rounded-full"
                    style={{ width: `${requestsPercent}%` }}
                  />
                </div>
                <span className="text-[9px] bg-blue-500/20 px-1 py-0.2 rounded font-semibold text-blue-200 hidden lg:inline">
                  {dailyRequestsTotal - dailyRequestsUsed} left
                </span>
              </div>
            </button>

            {/* Google Token Free Tier Daily Token Usage / Total */}
            <button
              onClick={onOpenFreeTierModal}
              className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-all cursor-pointer"
              title="Google Token Free Tier Daily Token Usage / Total"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="text-left flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-slate-300">Tokens:</span>
                <span className="text-[11px] font-bold text-white font-mono">
                  {dailyTokensUsed.toLocaleString()} / {dailyTokensTotal.toLocaleString()}
                </span>
                <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden md:block">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${tokensPercent}%` }}
                  />
                </div>
                <span className="text-[9px] bg-emerald-500/20 px-1 py-0.2 rounded font-semibold text-emerald-200 hidden lg:inline">
                  Free Tier
                </span>
              </div>
            </button>

            {/* Turn on Browser Notifications Button */}
            <button
              onClick={onRequestNotificationPermission}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                notificationPermission === 'granted'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                  : notificationPermission === 'denied'
                  ? 'bg-slate-800/80 border-slate-700 text-slate-400'
                  : 'bg-purple-600 hover:bg-purple-500 border-purple-500 text-white shadow-md shadow-purple-600/20 animate-pulse'
              }`}
              title="Browser Desktop & Web Notifications"
            >
              <Bell className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <span>
                {notificationPermission === 'granted'
                  ? 'Notifications On'
                  : notificationPermission === 'denied'
                  ? 'Notifications Blocked'
                  : 'Turn on Notifications'}
              </span>
            </button>

            <span className="text-slate-600 hidden xl:inline">|</span>

            {/* CSE Identifier */}
            <a
              href={CSE_CONFIG.controlPanelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 text-[11px] hidden xl:flex items-center gap-1"
            >
              CSE: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 font-mono">{CSE_CONFIG.cx.slice(0, 8)}...</code>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg sm:text-xl tracking-tight text-white">
                DealFlow <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">100% Ranker</span>
              </h1>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Track 1 & 2
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Founder Discovery, Google CSE Web Verification & 100-Point DD Score
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
          <button
            onClick={() => setActiveTab('rankings')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rankings'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span>🏆</span>
            <span className="hidden md:inline">Founder</span> Rankings
          </button>

          <button
            onClick={() => setActiveTab('cse')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cse'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Google CSE</span>
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 relative ${
              activeTab === 'feed'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Feed</span>
            {unreadCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile ({user.personalFounderScore.totalScore}%)</span>
          </button>

          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mobile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Flutter Mobile</span>
            <span className="sm:hidden">App</span>
          </button>
        </nav>

        {/* Right Action Buttons with Official Google OAuth Login Button */}
        <div className="flex items-center gap-2">
          {/* Official Google OAuth Login Button at the Top */}
          <button
            onClick={onOpenGoogleOAuthModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold shadow-md transition-all cursor-pointer ring-1 ring-slate-300/80 hover:shadow-lg"
            title="Google OAuth Login & Free Tier Account"
          >
            {/* Official Google 'G' icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <div className="flex items-center gap-1.5 text-left">
              <span className="font-bold text-slate-900 hidden sm:inline">Google OAuth:</span>
              <span className="text-slate-600 font-mono text-[11px] truncate max-w-[110px] sm:max-w-[140px]">
                {user.email.split('@')[0]}
              </span>
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
                title="Google OAuth Connected"
              />
            </div>
          </button>

          {/* Score New Founder Button */}
          <button
            onClick={onOpenAddFounder}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Score Founder</span>
            <span className="md:hidden">Score</span>
          </button>

          {/* Remix & Share */}
          <button
            onClick={onOpenShareModal}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-1"
            title="Remixable link & mobile router link"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden xl:inline">Share & Remix</span>
          </button>

          {/* User Profile Avatar Pill */}
          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-colors cursor-pointer"
            title="Open Profile Section"
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-400"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
            </div>
            <div className="text-left hidden 2xl:block">
              <p className="text-xs font-semibold leading-tight text-white">{user.name}</p>
              <p className="text-[10px] text-emerald-400 leading-none">
                Score: {user.personalFounderScore.totalScore}%
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
