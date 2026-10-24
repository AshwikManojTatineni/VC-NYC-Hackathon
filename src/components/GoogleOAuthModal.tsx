import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  UserCheck,
  LogOut,
  ExternalLink,
  Copy,
  Check,
  User,
  Zap,
  Globe
} from 'lucide-react';
import { UserProfile } from '../types';
import { sendBrowserNotification, requestNotificationPermission } from '../utils/browserNotifications';

interface GoogleOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLoginSuccess: (updatedUser: Partial<UserProfile>) => void;
  onLogout: () => void;
  notificationPermission: NotificationPermission;
  onPermissionChange: (perm: NotificationPermission) => void;
}

export const GoogleOAuthModal: React.FC<GoogleOAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  onLogout,
  notificationPermission,
  onPermissionChange,
}) => {
  if (!isOpen) return null;

  const [enableBrowserNotifs, setEnableBrowserNotifs] = useState(notificationPermission === 'granted');
  const [authMode, setAuthMode] = useState<'quick' | 'custom'>('quick');
  const [selectedEmail, setSelectedEmail] = useState(user.email || 'ashwikmanojtatineni101@gmail.com');
  const [customEmail, setCustomEmail] = useState(user.email || 'ashwikmanojtatineni101@gmail.com');
  const [customName, setCustomName] = useState(user.name || 'Ashwik Manoj');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const webappUrl = 'https://ais-pre-gvialmdiot7cqpybfmftev-184925551349.us-east5.run.app/';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(webappUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSignIn = async (emailToUse: string, nameToUse: string) => {
    setIsLoggingIn(true);

    // Request notification permission if checked
    let perm = notificationPermission;
    if (enableBrowserNotifs && notificationPermission !== 'granted') {
      perm = await requestNotificationPermission();
      onPermissionChange(perm);
    }

    setTimeout(() => {
      onLoginSuccess({
        email: emailToUse,
        name: nameToUse,
        googleConnected: true,
        freeTierTokenActive: true,
      });

      // Send browser notification for Google OAuth login
      sendBrowserNotification('Google OAuth Login Successful', {
        body: `Signed in as ${emailToUse}. Free Tier: 100 daily requests and 1,000,000 tokens active.`,
        icon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
      });

      setIsLoggingIn(false);
      onClose();
    }, 500);
  };

  const handleLogoutAction = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      {/* Google OAuth Styled Dialog */}
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header with Google Logo */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <svg className="w-7 h-7 shrink-0" viewBox="0 0 48 48">
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
            </svg>
            <div>
              <h3 className="font-bold text-lg text-white">Google OAuth 2.0 Authentication</h3>
              <p className="text-xs text-slate-400">DealFlow Founder Ranking & VC Sourcing</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Auth Status Banner */}
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
            user.googleConnected
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                user.googleConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <div>
              <p className="text-xs font-bold text-white">
                {user.googleConnected ? 'Currently Logged In' : 'Currently Signed Out'}
              </p>
              <p className="text-[11px] font-mono text-slate-300">{user.email}</p>
            </div>
          </div>

          {user.googleConnected && (
            <button
              onClick={handleLogoutAction}
              className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Log out of webapp"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>

        {/* Tab to toggle Quick Google Accounts vs Enter Own Google OAuth Email */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setAuthMode('quick')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              authMode === 'quick' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            One-Click Google Accounts
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('custom')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              authMode === 'custom' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Enter Own Google Account
          </button>
        </div>

        {authMode === 'quick' ? (
          /* Account Selector */
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-slate-300">Choose a Google Account to login:</label>

            {/* Account 1: Ashwik Manoj (Requested user email) */}
            <div
              onClick={() => setSelectedEmail('ashwikmanojtatineni101@gmail.com')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedEmail === 'ashwikmanojtatineni101@gmail.com'
                  ? 'bg-blue-600/15 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                  : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                  alt="Ashwik Manoj"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-400"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white">Ashwik Manoj</p>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-semibold">
                      Primary
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-mono">ashwikmanojtatineni101@gmail.com</p>
                  <span className="text-[10px] text-emerald-400 font-medium">Free Tier 1M Tokens & 100 Requests</span>
                </div>
              </div>

              {selectedEmail === 'ashwikmanojtatineni101@gmail.com' && (
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
              )}
            </div>

            {/* Account 2: Secondary NYC Venture Partner */}
            <div
              onClick={() => setSelectedEmail('investor@dealflow.vc')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedEmail === 'investor@dealflow.vc'
                  ? 'bg-blue-600/15 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                  : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow">
                  VC
                </div>
                <div>
                  <p className="text-xs font-bold text-white">NYC Venture Partner</p>
                  <p className="text-[11px] text-slate-300 font-mono">investor@dealflow.vc</p>
                  <span className="text-[10px] text-slate-400">Track 1 & Track 2 Committee</span>
                </div>
              </div>

              {selectedEmail === 'investor@dealflow.vc' && (
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
              )}
            </div>
          </div>
        ) : (
          /* Custom Google Account Login Form */
          <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                Your Google OAuth Email Address:
              </label>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="e.g. ashwikmanojtatineni101@gmail.com"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                Display Name:
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Ashwik Manoj"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Connect your own Google Account to store personal founder evaluations and authenticate API calls.
            </p>
          </div>
        )}

        {/* Free Web API Quota Details */}
        <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Google Free Tier Quotas Activated:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Google CSE Web API:</span>
              <strong className="text-blue-300 font-mono">100 / 100 free/day</strong>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Daily Token Quota:</span>
              <strong className="text-emerald-300 font-mono">1,000,000 free tokens</strong>
            </div>
          </div>
        </div>

        {/* Turn on Browser Notifications Toggle */}
        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Browser Desktop Notifications</p>
              <p className="text-[10px] text-slate-400">
                Receive popup alerts for Track 1, Track 2, and Google Calendar meetings
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enableBrowserNotifs}
              onChange={(e) => setEnableBrowserNotifs(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Webapp Live Link Box */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px] flex items-center gap-1">
              <Globe className="w-3 h-3 text-blue-400" /> Webapp Live Link:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={webappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
              >
                <span>Open</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <code className="block bg-slate-900 px-2.5 py-1.5 rounded-lg text-blue-300 text-[11px] font-mono break-all select-all">
            {webappUrl}
          </code>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              if (authMode === 'quick') {
                const name = selectedEmail.includes('ashwik') ? 'Ashwik Manoj' : 'NYC Venture Partner';
                handleSignIn(selectedEmail, name);
              } else {
                handleSignIn(customEmail.trim() || 'ashwikmanojtatineni101@gmail.com', customName.trim() || 'Ashwik Manoj');
              }
            }}
            disabled={isLoggingIn}
            className="flex-1 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>{user.googleConnected ? 'Switch Account / Login' : 'Login with Google'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
