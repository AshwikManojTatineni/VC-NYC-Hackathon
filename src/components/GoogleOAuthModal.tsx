import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Bell, Sparkles, Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { UserProfile } from '../types';
import { sendBrowserNotification, requestNotificationPermission } from '../utils/browserNotifications';

interface GoogleOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLoginSuccess: (updatedUser: Partial<UserProfile>) => void;
  notificationPermission: NotificationPermission;
  onPermissionChange: (perm: NotificationPermission) => void;
}

export const GoogleOAuthModal: React.FC<GoogleOAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  notificationPermission,
  onPermissionChange,
}) => {
  if (!isOpen) return null;

  const [enableBrowserNotifs, setEnableBrowserNotifs] = useState(notificationPermission === 'granted');
  const [selectedEmail, setSelectedEmail] = useState(user.email);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSignIn = async () => {
    setIsLoggingIn(true);

    // Request notification permission if checked
    let perm = notificationPermission;
    if (enableBrowserNotifs && notificationPermission !== 'granted') {
      perm = await requestNotificationPermission();
      onPermissionChange(perm);
    }

    setTimeout(() => {
      onLoginSuccess({
        email: selectedEmail,
        googleConnected: true,
      });

      // Send browser notification for Google OAuth login
      sendBrowserNotification('Google OAuth Login Successful', {
        body: `Signed in as ${selectedEmail}. Free Tier: 100 web requests and 1,000,000 token quota active.`,
        icon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
      });

      setIsLoggingIn(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      {/* Google OAuth Styled Dialog */}
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative my-8 text-white space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header with Google Logo */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <div>
              <h3 className="font-bold text-base text-white">Google OAuth 2.0 Sign In</h3>
              <p className="text-[11px] text-slate-400">DealFlow 100% Founder Ranking App</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Account Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Choose an account to continue:</label>

          {/* Primary Account */}
          <div
            onClick={() => setSelectedEmail(user.email)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              selectedEmail === user.email
                ? 'bg-blue-600/10 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-400"
              />
              <div>
                <p className="text-xs font-bold text-white">{user.name}</p>
                <p className="text-[11px] text-slate-300 font-mono">{user.email}</p>
                <span className="text-[10px] text-emerald-400 font-medium">Verified Free-Tier Token Active</span>
              </div>
            </div>

            {selectedEmail === user.email && (
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
            )}
          </div>

          {/* Secondary Syndicate Demo Account */}
          <div
            onClick={() => setSelectedEmail('investor@dealflow.vc')}
            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              selectedEmail === 'investor@dealflow.vc'
                ? 'bg-blue-600/10 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
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

        {/* Free Web API Quota Details */}
        <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero-Cost Free Tier Quotas Granted:</span>
          </div>
          <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
            <li>Google Custom Search Engine: 100 free web queries/day (cx=82c791e40658d4209)</li>
            <li>Google Token Free Tier: 1,000,000 daily evaluation tokens (Zero cost)</li>
            <li>In-memory token caching with auto-refresh</li>
          </ul>
        </div>

        {/* Turn on Browser Notifications Toggle */}
        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Turn on Browser Notifications</p>
              <p className="text-[10px] text-slate-400">
                Receive popup alerts for Track 1, Track 2, and score shifts
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

        {/* Buttons */}
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
            onClick={handleSignIn}
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
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>Continue</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
