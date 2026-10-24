import React, { useState } from 'react';
import {
  X,
  Zap,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  User,
  LogOut,
  Mail,
  Sparkles,
  Globe,
  KeyRound,
  Lock
} from 'lucide-react';
import { UserProfile } from '../types';

interface FreeTierMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
}

export const FreeTierMonitorModal: React.FC<FreeTierMonitorModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  if (!isOpen) return null;

  const [selectedRole, setSelectedRole] = useState(user.role);
  const [emailInput, setEmailInput] = useState(user.email);
  const [nameInput, setNameInput] = useState(user.name);
  const [savedNotice, setSavedNotice] = useState(false);

  const dailyRequestsUsed = user.dailyRequestsUsed ?? 14;
  const dailyRequestsTotal = user.dailyRequestsTotal ?? 100;
  const dailyTokensUsed = user.dailyTokensUsed ?? 42500;
  const dailyTokensTotal = user.dailyTokensTotal ?? 1000000;

  const requestsPercent = Math.min(100, Math.round((dailyRequestsUsed / dailyRequestsTotal) * 100));
  const tokensPercent = Math.min(100, Math.round((dailyTokensUsed / dailyTokensTotal) * 100));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: nameInput,
      role: selectedRole,
      email: emailInput,
      googleConnected: true,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleResetQuota = () => {
    onUpdateUser({
      dailyRequestsUsed: 0,
      dailyTokensUsed: 0,
      freeTierQueriesRemaining: user.freeTierQueriesTotal,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Zap className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold">Google Free Tier & OAuth Control</h3>
            </div>
            <p className="text-xs text-slate-400">
              Zero-cost quota protection: Webapp requests & daily token meters
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Google OAuth Session Card */}
        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  Google OAuth 2.0 Identity
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full font-mono">
                    Connected
                  </span>
                </span>
                <p className="text-[11px] font-mono text-slate-400">{user.email}</p>
              </div>
            </div>

            <button
              onClick={() => {
                onUpdateUser({
                  email: user.email === 'ashwikmanojtatineni101@gmail.com' ? 'investor@dealflow.vc' : 'ashwikmanojtatineni101@gmail.com',
                });
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-blue-400 border border-slate-700 transition-colors cursor-pointer"
            >
              Switch Account
            </button>
          </div>
        </div>

        {/* Dual Meter: Daily Requests Usage / Total & Daily Token Usage / Total */}
        <div className="space-y-4">
          {/* 1. Daily Webapp Google Free Tier Requests Usage / Total */}
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  Daily Webapp Google Free Tier Requests
                </span>
                <p className="text-2xl font-black text-blue-400 mt-1 font-mono">
                  {dailyRequestsUsed}{' '}
                  <span className="text-sm font-normal text-slate-400">/ {dailyRequestsTotal} requests used</span>
                </p>
              </div>

              <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-lg">
                {dailyRequestsTotal - dailyRequestsUsed} requests left
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${requestsPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Allocated for Google Custom Search Engine (CSE) queries & web citation checks per day.
            </p>
          </div>

          {/* 2. Google Token Free Tier Daily Token Usage / Total */}
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Google Token Free Tier Daily Usage
                </span>
                <p className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                  {dailyTokensUsed.toLocaleString()}{' '}
                  <span className="text-sm font-normal text-slate-400">
                    / {dailyTokensTotal.toLocaleString()} tokens
                  </span>
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-lg">
                {((dailyTokensTotal - dailyTokensUsed) / 1000).toFixed(1)}k tokens left
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${tokensPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Allocated for automated due diligence parsing, AST risk analysis, and candidate indexing without fee.
            </p>
          </div>
        </div>

        {/* User Identity Form */}
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              Edit Account Information
            </h4>
            <button
              type="button"
              onClick={handleResetQuota}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Meter</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Display Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Google OAuth Email</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-emerald-400 text-xs">
              {savedNotice ? '✓ Session saved!' : ''}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
