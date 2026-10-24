import React, { useState } from 'react';
import {
  User,
  Mail,
  Camera,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Globe,
  Award,
  Zap,
  Save,
  RotateCcw,
  Sliders,
  ExternalLink,
  Lock
} from 'lucide-react';
import { UserProfile, ScoreBreakdown } from '../types';
import { CSE_CONFIG } from '../data/mockData';

interface UserProfileSectionProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
  onRankingScoreChanged?: (oldScore: number, newScore: number) => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
];

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  user,
  onUpdateUser,
  onRankingScoreChanged,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [startup, setStartup] = useState(user.startup);
  const [tagline, setTagline] = useState(user.tagline);
  const [role, setRole] = useState(user.role);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [showCustomAvatarInput, setShowCustomAvatarInput] = useState(false);

  // Founder score subcomponents
  const [domainDepth, setDomainDepth] = useState(user.personalFounderScore.domainDepth);
  const [tractionVelocity, setTractionVelocity] = useState(user.personalFounderScore.tractionVelocity);
  const [marketTAM, setMarketTAM] = useState(user.personalFounderScore.marketTAM);
  const [cseSignals, setCseSignals] = useState(user.personalFounderScore.cseSignals);
  const [dueDiligence, setDueDiligence] = useState(user.personalFounderScore.dueDiligence);

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const calculatedTotal = domainDepth + tractionVelocity + marketTAM + cseSignals + dueDiligence;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const oldTotal = user.personalFounderScore.totalScore;
    const newScore: ScoreBreakdown = {
      domainDepth,
      tractionVelocity,
      marketTAM,
      cseSignals,
      dueDiligence,
      totalScore: calculatedTotal,
    };

    const updated: Partial<UserProfile> = {
      name,
      email,
      bio,
      avatar,
      startup,
      tagline,
      role,
      personalFounderScore: newScore,
    };

    onUpdateUser(updated);

    // Persist in localStorage
    try {
      localStorage.setItem('dealflow_user_profile', JSON.stringify({ ...user, ...updated }));
    } catch (err) {
      console.warn('Storage sync failed', err);
    }

    if (onRankingScoreChanged && oldTotal !== calculatedTotal) {
      onRankingScoreChanged(oldTotal, calculatedTotal);
    }

    setSavedStatus('Profile & Founder Ranking Score saved successfully!');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  const handleApplyCustomAvatar = () => {
    if (customAvatarUrl.trim()) {
      setAvatar(customAvatarUrl.trim());
      setShowCustomAvatarInput(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Profile Hero & Google OAuth Authentication Status */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-5">
            {/* Avatar with status indicator */}
            <div className="relative group">
              <img
                src={avatar}
                alt={name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-500/30 shadow-xl"
              />
              <button
                type="button"
                onClick={() => setShowCustomAvatarInput(!showCustomAvatarInput)}
                className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-semibold gap-1"
                title="Change Avatar"
              >
                <Camera className="w-4 h-4" />
                <span>Change</span>
              </button>
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 ring-2 ring-slate-900 flex items-center justify-center text-white"
                title="Google OAuth Session Active"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white">{name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {role}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Google OAuth Authenticated
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono">{email}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl pt-1 leading-relaxed">
                {bio || 'No bio entered yet. Update below to outline your track & investment thesis.'}
              </p>
            </div>
          </div>

          {/* Ranking Score Highlight Card */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-blue-500/30 flex flex-col items-center justify-center text-center min-w-[200px] shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-yellow-400" />
              Your Founder Ranking Score
            </span>
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 my-1">
              {calculatedTotal}%
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Rank #{user.rankingPosition} Leaderboard Tier
            </span>
          </div>
        </div>

        {/* Custom Avatar URL bar if toggled */}
        {showCustomAvatarInput && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-2">
            <input
              type="url"
              placeholder="Paste image URL (https://...)"
              value={customAvatarUrl}
              onChange={(e) => setCustomAvatarUrl(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleApplyCustomAvatar}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
            >
              Apply Photo
            </button>
            <div className="flex items-center gap-1.5 pl-2">
              <span className="text-[11px] text-slate-400">Presets:</span>
              {AVATAR_PRESETS.map((p, i) => (
                <img
                  key={i}
                  src={p}
                  alt={`preset ${i}`}
                  onClick={() => setAvatar(p)}
                  className="w-6 h-6 rounded-full object-cover cursor-pointer hover:ring-2 ring-blue-400"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Profile Form & Founder Scorecard Calibration */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Personal Information & Bio */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              Founder & Google Account Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Google OAuth Email (Verified)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Linked to your Google Web API free token tier session.
                </p>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Startup / Project Name</label>
                <input
                  type="text"
                  value={startup}
                  onChange={(e) => setStartup(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. AI-driven deal sourcing and cap-table stress testing"
                  className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-300 font-semibold">Founder Bio & Investment Focus</label>
                  <span className="text-[10px] text-slate-400">{bio.length} characters</span>
                </div>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Outline your background, domain depth, previous venture exits, and hackathon focus..."
                  className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 100% Founder Ranking Scorecard Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Store & Calibrate Founder Score (100% Total)
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {calculatedTotal} / 100%
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Calibrate your score parameters based on verified Track 1 sourcing commits, Track 2 due-diligence audit logs, and Google Custom Search Engine (<code className="text-blue-300">cx={CSE_CONFIG.cx.slice(0, 8)}...</code>) citations.
            </p>

            <div className="space-y-3.5 text-xs">
              {/* Domain Depth */}
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-blue-400">1. Domain Expertise & Technical Depth (Max 25%)</span>
                  <span className="font-bold text-white font-mono">{domainDepth} pts</span>
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

              {/* Traction Velocity */}
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-indigo-400">2. Traction Velocity & Hackathon Velocity (Max 25%)</span>
                  <span className="font-bold text-white font-mono">{tractionVelocity} pts</span>
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

              {/* Market TAM */}
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-purple-400">3. Market Headroom & Defensibility (Max 20%)</span>
                  <span className="font-bold text-white font-mono">{marketTAM} pts</span>
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

              {/* CSE Signals */}
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-amber-400">4. Google CSE Citations & Web Presence (Max 15%)</span>
                  <span className="font-bold text-white font-mono">{cseSignals} pts</span>
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

              {/* Due Diligence */}
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-emerald-400">5. Due Diligence Verification Audit (Max 15%)</span>
                  <span className="font-bold text-white font-mono">{dueDiligence} pts</span>
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
        </div>

        {/* Save Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs">
            {savedStatus ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {savedStatus}
              </span>
            ) : (
              <span className="text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                Changes are stored securely in local browser storage and reflected across the dealflow ranking.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setName(user.name);
                setEmail(user.email);
                setBio(user.bio);
                setAvatar(user.avatar);
                setDomainDepth(user.personalFounderScore.domainDepth);
                setTractionVelocity(user.personalFounderScore.tractionVelocity);
                setMarketTAM(user.personalFounderScore.marketTAM);
                setCseSignals(user.personalFounderScore.cseSignals);
                setDueDiligence(user.personalFounderScore.dueDiligence);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile & Store Founder Score</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
