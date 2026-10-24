import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FounderRankingTable } from './components/FounderRankingTable';
import { CSEWidget } from './components/CSEWidget';
import { NotificationFeed } from './components/NotificationFeed';
import { UserProfileSection } from './components/UserProfileSection';
import { GamificationDashboard } from './components/GamificationDashboard';
import { ShareAndMobileModal } from './components/ShareAndMobileModal';
import { FounderDetailModal } from './components/FounderDetailModal';
import { AddFounderModal } from './components/AddFounderModal';
import { FreeTierMonitorModal } from './components/FreeTierMonitorModal';
import { GoogleOAuthModal } from './components/GoogleOAuthModal';
import { CalendarMeetModal } from './components/CalendarMeetModal';
import { SocialConnectModal } from './components/SocialConnectModal';
import { TechStackModal } from './components/TechStackModal';
import {
  INITIAL_FOUNDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER,
  CSE_CONFIG,
} from './data/mockData';
import { Founder, NotificationItem, UserProfile, CalendarMeeting } from './types';
import {
  getNotificationPermission,
  requestNotificationPermission,
  sendBrowserNotification,
} from './utils/browserNotifications';
import { Bell, CheckCircle2, AlertCircle, X, ShieldCheck, Sparkles, ExternalLink, Globe } from 'lucide-react';

// Augment window object for Google CSE
declare global {
  interface Window {
    google?: any;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'rankings' | 'cse' | 'feed' | 'profile' | 'gamification' | 'mobile'>('rankings');
  const [founders, setFounders] = useState<Founder[]>(INITIAL_FOUNDERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Load user profile from localStorage if saved previously
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('dealflow_user_profile');
      if (saved) {
        return { ...INITIAL_USER, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not load user profile from storage', e);
    }
    return INITIAL_USER;
  });

  // Selected founder for detail modal
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  // Modal open states
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddFounderModalOpen, setIsAddFounderModalOpen] = useState(false);
  const [isFreeTierModalOpen, setIsFreeTierModalOpen] = useState(false);
  const [isGoogleOAuthModalOpen, setIsGoogleOAuthModalOpen] = useState(false);

  // Gamification & Outreach modals
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedScheduleFounderId, setSelectedScheduleFounderId] = useState<string | undefined>(undefined);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [selectedSocialFounder, setSelectedSocialFounder] = useState<Founder | null>(null);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [selectedTechFounder, setSelectedTechFounder] = useState<Founder | null>(null);

  // Browser notification permission tracking
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(() =>
    getNotificationPermission()
  );

  // In-app popup toast notification
  const [activeToast, setActiveToast] = useState<{
    id: string;
    title: string;
    desc: string;
    type: 'success' | 'info' | 'warning';
  } | null>(null);

  // Pass query from founder table to CSE tab
  const [pendingCSEQuery, setPendingCSEQuery] = useState('');

  // Unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Unified Notification Trigger (Browser Notification + In-App Popup Toast)
  const triggerNotification = (
    title: string,
    desc: string,
    type: 'success' | 'info' | 'warning' = 'info'
  ) => {
    const id = `toast-${Date.now()}`;
    setActiveToast({ id, title, desc, type });
    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === id ? null : curr));
    }, 5500);

    // Also trigger HTML5 Browser Notification API if enabled
    sendBrowserNotification(title, {
      body: desc,
      icon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
    });
  };

  const handleRequestNotificationPermission = async () => {
    const perm = await requestNotificationPermission();
    setNotificationPermission(perm);
    if (perm === 'granted') {
      triggerNotification(
        'Browser Notifications Active 🔔',
        'Desktop & browser popup alerts are now active for DealFlow Sourcing & Due Diligence tracks.',
        'success'
      );
    }
  };

  const handleToggleStar = (founderId: string) => {
    setFounders((prev) =>
      prev.map((f) => (f.id === founderId ? { ...f, starred: !f.starred } : f))
    );
  };

  const handleRunCSESearch = (query: string) => {
    setPendingCSEQuery(query);
    setActiveTab('cse');

    // Deduct 1 free tier query
    setUser((prev) => {
      const updated = {
        ...prev,
        dailyRequestsUsed: Math.min(prev.dailyRequestsTotal, (prev.dailyRequestsUsed || 0) + 1),
        freeTierQueriesRemaining: Math.max(0, prev.freeTierQueriesRemaining - 1),
      };
      try {
        localStorage.setItem('dealflow_user_profile', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Trigger input in Google CSE widget if rendered
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('input.gsc-input');
      if (input) {
        input.value = query;
        const btn = document.querySelector<HTMLButtonElement>('button.gsc-search-button');
        if (btn) btn.click();
      }
    }, 400);
  };

  const handleSelectFounderById = (founderId: string) => {
    const f = founders.find((item) => item.id === founderId);
    if (f) {
      setSelectedFounder(f);
    }
  };

  const handleAddFounder = (newFounder: Founder) => {
    setFounders((prev) => [newFounder, ...prev]);

    // Create notification event in feed
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: `New Founder Scored: ${newFounder.name}`,
      description: `${newFounder.startup} scored ${newFounder.scores.totalScore}% total across Track 1 & 2 criteria.`,
      track: newFounder.track === 'due-diligence' ? 'Track 2 (Due Diligence)' : 'Track 1 (Sourcing)',
      founderName: newFounder.name,
      founderId: newFounder.id,
      scoreImpact: 0,
      read: false,
      severity: 'info',
      sourceUrl: newFounder.devpostUrl,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    triggerNotification(
      `New Founder Scored: ${newFounder.name}`,
      `${newFounder.startup} scored ${newFounder.scores.totalScore}% total across Track 1 & 2 criteria.`,
      'info'
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // Process data from Track 1 (Sourcing track)
  const handleProcessSourcingBatch = () => {
    const sourcingUpdates = [
      {
        founderName: 'Elena Rostova',
        founderId: 'f1',
        title: 'Track 1 (Sourcing) Sourced New GitHub Graph Signals',
        description: 'Autonomous AI scout detected 42 new merged pull requests and a 200% surge in star velocity on NexusDeal AI repository.',
        scoreDelta: 3,
      },
      {
        founderName: 'Kavita Sundaram',
        founderId: 'f3',
        title: 'Track 1 (Sourcing) Academic Spinoff Alert',
        description: 'Synthetica BioSourcing published Columbia/MIT bio-benchmarking preprint cited by 12 biotech venture funds.',
        scoreDelta: 4,
      },
      {
        founderName: 'Sophia Jin & Tariq Al-Mansoor',
        founderId: 'f5',
        title: 'Track 1 (Sourcing) Google CSE Mentions Surge',
        description: 'Custom search engine cx=82c791e40658d4209 indexed 15 new venture syndications mentioning OmniScout Pro.',
        scoreDelta: 2,
      },
    ];

    const pick = sourcingUpdates[Math.floor(Math.random() * sourcingUpdates.length)];

    // Adjust founder score
    setFounders((prev) =>
      prev.map((f) => {
        if (f.id === pick.founderId) {
          const newTraction = Math.min(25, f.scores.tractionVelocity + 1);
          const newCse = Math.min(15, f.scores.cseSignals + 1);
          const newTotal =
            f.scores.domainDepth +
            newTraction +
            f.scores.marketTAM +
            newCse +
            f.scores.dueDiligence;

          return {
            ...f,
            cseFoundSnippets: f.cseFoundSnippets + 3,
            scores: {
              ...f.scores,
              tractionVelocity: newTraction,
              cseSignals: newCse,
              totalScore: newTotal,
            },
          };
        }
        return f;
      })
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: pick.title,
      description: pick.description,
      track: 'Track 1 (Sourcing)',
      founderName: pick.founderName,
      founderId: pick.founderId,
      scoreImpact: pick.scoreDelta,
      read: false,
      severity: 'success',
      sourceUrl: CSE_CONFIG.hackathonUrl,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    triggerNotification(pick.title, pick.description, 'success');
  };

  // Process data from Track 2 (Due Diligence track)
  const handleProcessDueDiligenceBatch = () => {
    const ddUpdates = [
      {
        founderName: 'Marcus Vance',
        founderId: 'f2',
        title: 'Track 2 (Due Diligence) Code Diff Risk Audit Passed',
        description: 'AuditFlow DD completed static AST code inspection for candidate codebase: 0 license vulnerabilities and 100% test coverage.',
        scoreDelta: 5,
        severity: 'success' as const,
      },
      {
        founderName: 'Liam O’Connor',
        founderId: 'f4',
        title: 'Track 2 (Due Diligence) Cap Table Forensic Audit Complete',
        description: 'CapGraph Verify flagged convertible note overhang cleared via signed LP side-letter.',
        scoreDelta: 4,
        severity: 'info' as const,
      },
      {
        founderName: 'Elena Rostova',
        founderId: 'f1',
        title: 'Track 2 (Due Diligence) SEC Filing Audit Verified',
        description: 'Verified Form D registration and state blue-sky compliance records on SEC EDGAR index.',
        scoreDelta: 2,
        severity: 'success' as const,
      },
    ];

    const pick = ddUpdates[Math.floor(Math.random() * ddUpdates.length)];

    // Adjust founder score
    setFounders((prev) =>
      prev.map((f) => {
        if (f.id === pick.founderId) {
          const newDD = Math.min(15, f.scores.dueDiligence + 1);
          const newTotal =
            f.scores.domainDepth +
            f.scores.tractionVelocity +
            f.scores.marketTAM +
            f.scores.cseSignals +
            newDD;

          return {
            ...f,
            verifiedDueDiligence: true,
            scores: {
              ...f.scores,
              dueDiligence: newDD,
              totalScore: newTotal,
            },
          };
        }
        return f;
      })
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: pick.title,
      description: pick.description,
      track: 'Track 2 (Due Diligence)',
      founderName: pick.founderName,
      founderId: pick.founderId,
      scoreImpact: pick.scoreDelta,
      read: false,
      severity: pick.severity,
      sourceUrl: CSE_CONFIG.devpostUrl,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    triggerNotification(pick.title, pick.description, pick.severity);
  };

  // Trigger a significant ranking change notification
  const handleSimulateRankingChange = () => {
    const targetFounder = founders[Math.floor(Math.random() * founders.length)];
    const isPositive = Math.random() > 0.3;
    const delta = isPositive ? Math.floor(Math.random() * 4) + 2 : -3;

    setFounders((prev) =>
      prev.map((f) => {
        if (f.id === targetFounder.id) {
          const updatedTotal = Math.max(50, Math.min(100, f.scores.totalScore + delta));
          return {
            ...f,
            scores: {
              ...f.scores,
              totalScore: updatedTotal,
            },
          };
        }
        return f;
      })
    );

    const title = delta > 0 ? `Ranking Surge: ${targetFounder.name}` : `Ranking Alert: ${targetFounder.name}`;
    const desc = `${targetFounder.startup}'s composite 100% score shifted by ${delta > 0 ? `+${delta}%` : `${delta}%`} following latest diligence recalculation.`;

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title,
      description: desc,
      track: delta > 0 ? 'Track 1 (Sourcing)' : 'Track 2 (Due Diligence)',
      founderName: targetFounder.name,
      founderId: targetFounder.id,
      scoreImpact: delta,
      read: false,
      severity: delta > 0 ? 'success' : 'warning',
      sourceUrl: targetFounder.devpostUrl,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    triggerNotification(title, desc, delta > 0 ? 'success' : 'warning');
  };

  // Called when user recalibrates their own founder ranking score in Profile section
  const handleRankingScoreChanged = (oldScore: number, newScore: number) => {
    const delta = newScore - oldScore;
    const title = `Personal Ranking Score Calibrated: ${newScore}%`;
    const desc = `Your founder ranking score was updated from ${oldScore}% to ${newScore}% (${delta >= 0 ? `+${delta}%` : `${delta}%`}) with Google OAuth session verified.`;

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title,
      description: desc,
      track: 'Devpost',
      scoreImpact: delta,
      read: false,
      severity: delta >= 0 ? 'success' : 'warning',
      sourceUrl: CSE_CONFIG.hackathonUrl,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    triggerNotification(title, desc, delta >= 0 ? 'success' : 'warning');
  };

  // Google OAuth Login Action
  const handleOAuthLoginSuccess = (updatedUser: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedUser, googleConnected: true };
      try {
        localStorage.setItem('dealflow_user_profile', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    const loginNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: `Google OAuth Login: ${updatedUser.email || user.email}`,
      description: `Authenticated session active. 100 free Google CSE requests/day and 1,000,000 token evaluation quota ready.`,
      track: 'Devpost',
      read: false,
      severity: 'success',
      sourceUrl: CSE_CONFIG.hackathonUrl,
    };
    setNotifications((prev) => [loginNotif, ...prev]);

    triggerNotification(
      'Google OAuth Login Successful 🚀',
      `Welcome ${updatedUser.email || user.email}! Free tier requests and daily token quotas active.`,
      'success'
    );
  };

  // Logout Action
  const handleLogout = () => {
    setUser((prev) => {
      const next = { ...prev, googleConnected: false };
      try {
        localStorage.setItem('dealflow_user_profile', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    const logoutNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: 'Google OAuth Session Signed Out',
      description: 'You have logged out of the webapp. You can log in anytime with your Google account to restore full access.',
      track: 'Devpost',
      read: false,
      severity: 'info',
      sourceUrl: CSE_CONFIG.hackathonUrl,
    };
    setNotifications((prev) => [logoutNotif, ...prev]);

    triggerNotification(
      'Logged Out of Webapp 👋',
      'Your Google OAuth session has been closed. Click Sign In to connect your Google account.',
      'info'
    );
  };

  // Schedule Google Calendar Video Conference
  const handleScheduleMeeting = (meeting: CalendarMeeting) => {
    const xpReward = 250;
    setUser((prev) => {
      const newXP = (prev.vcXP || 0) + xpReward;
      const newLevel = Math.floor(newXP / 1000) + 1;
      const updated = {
        ...prev,
        vcXP: newXP,
        vcLevel: newLevel,
        meetingsScheduledCount: (prev.meetingsScheduledCount || 0) + 1,
        scheduledMeetings: [meeting, ...(prev.scheduledMeetings || [])],
      };
      try {
        localStorage.setItem('dealflow_user_profile', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Add to Notification feed
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: `Google Meet Scheduled: ${meeting.founderName}`,
      description: `Confirmed for ${meeting.date} at ${meeting.time}. Google Meet video conference generated (+250 XP earned).`,
      track: 'Calendar Meet',
      founderName: meeting.founderName,
      founderId: meeting.founderId,
      xpEarned: xpReward,
      read: false,
      severity: 'success',
      sourceUrl: meeting.googleCalendarUrl,
    };
    setNotifications((prev) => [notif, ...prev]);

    triggerNotification(
      `Google Calendar Meeting Set 📹 (+${xpReward} XP)`,
      `Video conference with ${meeting.founderName} (${meeting.startup}) booked for ${meeting.date} at ${meeting.time}.`,
      'success'
    );
  };

  // Social Connect Outreach action
  const handleSocialConnected = (founderName: string, network: string) => {
    const xpReward = 100;
    setUser((prev) => {
      const newXP = (prev.vcXP || 0) + xpReward;
      const newLevel = Math.floor(newXP / 1000) + 1;
      const updated = {
        ...prev,
        vcXP: newXP,
        vcLevel: newLevel,
        socialConnectsCount: (prev.socialConnectsCount || 0) + 1,
      };
      try {
        localStorage.setItem('dealflow_user_profile', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: `Social Outreach Sent: ${founderName}`,
      description: `Contacted via ${network}. Custom VC dealflow intro copied and sent (+100 XP).`,
      track: 'Syndicate Quest',
      founderName,
      xpEarned: xpReward,
      read: false,
      severity: 'info',
      sourceUrl: CSE_CONFIG.hackathonUrl,
    };
    setNotifications((prev) => [notif, ...prev]);

    triggerNotification(
      `Social Outreach Triggered 💬 (+${xpReward} XP)`,
      `Outreach message to ${founderName} on ${network} copied. Reach out to win the deal!`,
      'info'
    );
  };

  // Claim Quest reward
  const handleClaimQuest = (questId: string) => {
    setUser((prev) => {
      const quest = prev.quests?.find((q) => q.id === questId);
      const xpReward = quest?.xpReward || 150;
      const newXP = (prev.vcXP || 0) + xpReward;
      const newLevel = Math.floor(newXP / 1000) + 1;
      const updatedQuests = prev.quests?.map((q) =>
        q.id === questId ? { ...q, completed: true } : q
      );

      const updated = {
        ...prev,
        vcXP: newXP,
        vcLevel: newLevel,
        quests: updatedQuests,
      };
      try {
        localStorage.setItem('dealflow_user_profile', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    triggerNotification(
      'Syndicate Quest Completed! 🏆',
      'XP rewards credited to your VC Dealflow profile level.',
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white relative">
      {/* Floating In-App Popup Toast Notification */}
      {activeToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-blue-500/50 shadow-2xl shadow-blue-500/20 text-white flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
              <Bell className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="flex-1 space-y-1">
              <h5 className="font-bold text-xs text-white leading-tight">{activeToast.title}</h5>
              <p className="text-[11px] text-slate-300 leading-relaxed">{activeToast.desc}</p>
            </div>
            <button
              onClick={() => setActiveToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        unreadCount={unreadCount}
        onOpenAddFounder={() => setIsAddFounderModalOpen(true)}
        onOpenFreeTierModal={() => setIsFreeTierModalOpen(true)}
        onOpenGoogleOAuthModal={() => setIsGoogleOAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        notificationPermission={notificationPermission}
        onRequestNotificationPermission={handleRequestNotificationPermission}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {activeTab === 'rankings' && (
          <FounderRankingTable
            founders={founders}
            onSelectFounder={(f) => setSelectedFounder(f)}
            onToggleStar={handleToggleStar}
            onRunCSESearch={handleRunCSESearch}
            onOpenAddFounder={() => setIsAddFounderModalOpen(true)}
            onOpenScheduleModal={(f) => {
              setSelectedScheduleFounderId(f.id);
              setIsScheduleModalOpen(true);
            }}
            onOpenSocialModal={(f) => {
              setSelectedSocialFounder(f);
              setIsSocialModalOpen(true);
            }}
            onOpenTechModal={(f) => {
              setSelectedTechFounder(f);
              setIsTechModalOpen(true);
            }}
          />
        )}

        {activeTab === 'gamification' && (
          <GamificationDashboard
            user={user}
            founders={founders}
            onOpenScheduleModal={(founderId) => {
              setSelectedScheduleFounderId(founderId);
              setIsScheduleModalOpen(true);
            }}
            onOpenSocialModal={(f) => {
              setSelectedSocialFounder(f);
              setIsSocialModalOpen(true);
            }}
            onOpenTechModal={(f) => {
              setSelectedTechFounder(f);
              setIsTechModalOpen(true);
            }}
            onClaimQuest={handleClaimQuest}
          />
        )}

        {activeTab === 'cse' && (
          <CSEWidget
            initialQuery={pendingCSEQuery}
            onUseSignalInScore={(query, count) => {
              // Signal added
            }}
          />
        )}

        {activeTab === 'feed' && (
          <NotificationFeed
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onMarkRead={handleMarkRead}
            onClearAll={handleClearAllNotifications}
            onSelectFounderById={handleSelectFounderById}
            onProcessSourcingBatch={handleProcessSourcingBatch}
            onProcessDueDiligenceBatch={handleProcessDueDiligenceBatch}
            onSimulateRankingChange={handleSimulateRankingChange}
            notificationPermission={notificationPermission}
            onRequestNotificationPermission={handleRequestNotificationPermission}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfileSection
            user={user}
            onUpdateUser={(updated) => {
              setUser((prev) => {
                const next = { ...prev, ...updated };
                try {
                  localStorage.setItem('dealflow_user_profile', JSON.stringify(next));
                } catch (e) {}
                return next;
              });
            }}
            onRankingScoreChanged={handleRankingScoreChanged}
            onLogout={handleLogout}
            onOpenGoogleOAuthModal={() => setIsGoogleOAuthModalOpen(true)}
          />
        )}

        {activeTab === 'mobile' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Flutter Mobile Router & Preview</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Native Android, iOS & web deep-linking compliant with flutter.org architecture
                </p>
              </div>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-colors cursor-pointer"
              >
                Open Share & Mobile Modal
              </button>
            </div>

            {/* Embedded Mobile Device Simulator */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
              <div className="w-[340px] h-[640px] bg-slate-900 rounded-[44px] p-4 border-[6px] border-slate-700 shadow-2xl relative overflow-hidden flex flex-col">
                {/* Mobile Camera notch */}
                <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

                {/* Mobile App Header */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-white">DealFlow 100% Mobile</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                    Flutter
                  </span>
                </div>

                {/* Mobile Scrollable Content */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
                  <div className="bg-blue-900/30 p-2.5 rounded-xl border border-blue-500/30">
                    <p className="font-bold text-white text-[11px]">Track 1 & 2 Live Feed</p>
                    <p className="text-[10px] text-slate-300">Google CSE cx=82c791e40658d4209 active</p>
                  </div>

                  {founders.slice(0, 3).map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFounder(f)}
                      className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80 flex items-center justify-between cursor-pointer hover:bg-slate-700"
                    >
                      <div className="flex items-center gap-2">
                        <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-white text-[11px] leading-tight">{f.name}</p>
                          <p className="text-[9px] text-slate-400">{f.startup}</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-400 text-xs">{f.scores.totalScore}%</span>
                    </div>
                  ))}
                </div>

                {/* Mobile Bottom Navigation Bar */}
                <div className="pt-3 border-t border-slate-800 flex justify-around text-[10px] text-slate-400">
                  <span className="text-blue-400 font-bold">🏆 Rankings</span>
                  <span>🔍 CSE</span>
                  <span>🔔 Feeds</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="max-w-md space-y-4 text-xs text-slate-300">
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-sm text-white">Flutter Router Integration Guide</h4>
                  <p>
                    Deploy to iOS and Android utilizing deep links targeting{' '}
                    <code className="text-blue-300">dealflow://founder/:id</code> or testing live web preview via{' '}
                    <code className="text-blue-300">flutter.org/demo/dealflow-vc</code>.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 pt-1">
                    <li>Zero-cost Google Web API & token free-tier token caching</li>
                    <li>Sourcing Track 1 & Due-Diligence Track 2 real-time syncing</li>
                    <li>Automated 100% composite score calculation</li>
                  </ul>
                </div>

                {/* Direct verified links */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    Verified Live Production URLs:
                  </p>
                  <a
                    href="https://ais-pre-gvialmdiot7cqpybfmftev-184925551349.us-east5.run.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 rounded-xl bg-slate-950 border border-slate-800 text-blue-300 text-[11px] font-mono hover:text-white transition-colors truncate"
                  >
                    https://ais-pre-gvialmdiot7cqpybfmftev-184925551349.us-east5.run.app/
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/60 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>Built for NYC VC Hackathon 2026</span>
            <span>•</span>
            <a
              href={CSE_CONFIG.hackathonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Luma Event
            </a>
            <span>•</span>
            <a
              href={CSE_CONFIG.devpostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              Devpost Software
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span>Custom Search Engine: <code className="text-slate-300">{CSE_CONFIG.cx}</code></span>
            <span>•</span>
            <span>Free Tier: 100/100 Queries Active</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FounderDetailModal
        founder={selectedFounder}
        onClose={() => setSelectedFounder(null)}
        onToggleStar={handleToggleStar}
        onRunCSESearch={handleRunCSESearch}
        onOpenScheduleModal={(f) => {
          setSelectedScheduleFounderId(f.id);
          setIsScheduleModalOpen(true);
        }}
        onOpenSocialModal={(f) => {
          setSelectedSocialFounder(f);
          setIsSocialModalOpen(true);
        }}
        onOpenTechModal={(f) => {
          setSelectedTechFounder(f);
          setIsTechModalOpen(true);
        }}
      />

      <AddFounderModal
        isOpen={isAddFounderModalOpen}
        onClose={() => setIsAddFounderModalOpen(false)}
        onAddFounder={handleAddFounder}
      />

      <ShareAndMobileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        founders={founders}
      />

      <FreeTierMonitorModal
        isOpen={isFreeTierModalOpen}
        onClose={() => setIsFreeTierModalOpen(false)}
        user={user}
        onUpdateUser={(updated) => {
          setUser((prev) => {
            const next = { ...prev, ...updated };
            try {
              localStorage.setItem('dealflow_user_profile', JSON.stringify(next));
            } catch (e) {}
            return next;
          });
        }}
      />

      <GoogleOAuthModal
        isOpen={isGoogleOAuthModalOpen}
        onClose={() => setIsGoogleOAuthModalOpen(false)}
        user={user}
        onLoginSuccess={handleOAuthLoginSuccess}
        onLogout={handleLogout}
        notificationPermission={notificationPermission}
        onPermissionChange={setNotificationPermission}
      />

      {/* Calendar Video Conference Scheduler Modal */}
      <CalendarMeetModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        founders={founders}
        selectedFounderId={selectedScheduleFounderId}
        onScheduleMeeting={handleScheduleMeeting}
      />

      {/* Founder Social Outreach Modal */}
      <SocialConnectModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
        founder={selectedSocialFounder}
        onSocialConnected={handleSocialConnected}
      />

      {/* Required 4 Technologies & MCP Agent Monitor Modal */}
      <TechStackModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
        founder={selectedTechFounder}
      />
    </div>
  );
}
