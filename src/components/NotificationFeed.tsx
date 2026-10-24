import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  ExternalLink,
  Filter,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Globe,
  PlusCircle,
  Clock,
  Award,
  AlertTriangle,
  ArrowDownRight,
  CheckCircle2,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { NotificationItem } from '../types';
import { CSE_CONFIG } from '../data/mockData';

interface NotificationFeedProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
  onClearAll?: () => void;
  onSelectFounderById?: (founderId: string) => void;
  onProcessSourcingBatch: () => void;
  onProcessDueDiligenceBatch: () => void;
  onSimulateRankingChange: () => void;
  notificationPermission?: NotificationPermission;
  onRequestNotificationPermission?: () => void;
}

export const NotificationFeed: React.FC<NotificationFeedProps> = ({
  notifications,
  onMarkAllRead,
  onMarkRead,
  onClearAll,
  onSelectFounderById,
  onProcessSourcingBatch,
  onProcessDueDiligenceBatch,
  onSimulateRankingChange,
  notificationPermission,
  onRequestNotificationPermission,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'ranking' | 'sourcing' | 'dd' | 'devpost'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'ranking') {
      return (
        n.title.toLowerCase().includes('rank') ||
        n.title.toLowerCase().includes('score') ||
        Boolean(n.scoreImpact)
      );
    }
    if (filterCategory === 'sourcing') return n.track === 'Track 1 (Sourcing)';
    if (filterCategory === 'dd') return n.track === 'Track 2 (Due Diligence)';
    if (filterCategory === 'devpost') return n.track === 'Devpost';
    return true;
  });

  const getSeverityBadge = (sev: NotificationItem['severity']) => {
    switch (sev) {
      case 'success':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'warning':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'urgent':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  const getTrackIcon = (track: NotificationItem['track'], title: string) => {
    if (title.toLowerCase().includes('ranking') || title.toLowerCase().includes('score')) {
      return <Award className="w-4 h-4 text-yellow-400" />;
    }
    switch (track) {
      case 'Track 1 (Sourcing)':
        return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case 'Track 2 (Due Diligence)':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'CSE Signal':
        return <Globe className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner & Processing Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Bell className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">Deal-Flow & Founder Ranking Notification Stream</h2>
                <p className="text-xs text-slate-400">
                  Chronological feed triggered when new data is processed from Track 1 (Sourcing), Track 2 (Due Diligence), or ranking shifts
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onRequestNotificationPermission && (
              <button
                onClick={onRequestNotificationPermission}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  notificationPermission === 'granted'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-purple-600 hover:bg-purple-500 text-white border-purple-500 animate-pulse'
                }`}
              >
                <Bell className="w-3.5 h-3.5 text-yellow-300" />
                <span>
                  {notificationPermission === 'granted'
                    ? 'Browser Notifications Active'
                    : 'Turn on Browser Notifications'}
                </span>
              </button>
            )}

            <button
              onClick={onMarkAllRead}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mark All Read</span>
            </button>

            {onClearAll && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Clear all notifications"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            <a
              href={CSE_CONFIG.devpostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
            >
              <span>Devpost Track Workspace</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Action Triggers: Process Sourcing or Due Diligence */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="text-xs text-slate-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className="font-semibold">Simulate Real-time Track Data Ingestion:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onProcessSourcingBatch}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>+ Process Track 1 Sourcing Data</span>
            </button>

            <button
              onClick={onProcessDueDiligenceBatch}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Process Track 2 DD Data</span>
            </button>

            <button
              onClick={onSimulateRankingChange}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-yellow-400" />
              <span>Trigger Ranking Shift</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
        <span className="text-xs font-semibold text-slate-400 px-2 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter Feed:
        </span>
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            filterCategory === 'all'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All Feeds ({notifications.length})
        </button>
        <button
          onClick={() => setFilterCategory('ranking')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            filterCategory === 'ranking'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          🏆 Ranking Changes
        </button>
        <button
          onClick={() => setFilterCategory('sourcing')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            filterCategory === 'sourcing'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          🔍 Track 1: Sourcing
        </button>
        <button
          onClick={() => setFilterCategory('dd')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            filterCategory === 'dd'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          🛡️ Track 2: Due Diligence
        </button>
        <button
          onClick={() => setFilterCategory('devpost')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            filterCategory === 'devpost'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          💻 Devpost Workspace
        </button>
      </div>

      {/* Chronological Notification Stream */}
      <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-800/80 before:hidden sm:before:block">
        {filteredNotifs.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center space-y-2">
            <p className="text-slate-400 text-sm">No notifications found for this filter.</p>
            <button
              onClick={() => setFilterCategory('all')}
              className="text-xs text-blue-400 hover:underline"
            >
              Reset to view all notifications
            </button>
          </div>
        ) : (
          filteredNotifs.map((item, index) => {
            const isRankingShift =
              item.title.toLowerCase().includes('rank') ||
              item.title.toLowerCase().includes('score') ||
              Boolean(item.scoreImpact);

            return (
              <div
                key={item.id}
                onClick={() => onMarkRead(item.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative ${
                  item.read
                    ? 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-800/50'
                    : 'bg-slate-900 border-blue-500/50 shadow-lg shadow-blue-500/10 hover:border-blue-400'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    {/* Icon Node */}
                    <div className="pt-0.5 shrink-0">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shadow-inner">
                        {getTrackIcon(item.track, item.title)}
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-1">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${getSeverityBadge(
                            item.severity
                          )}`}
                        >
                          {item.track}
                        </span>

                        {isRankingShift && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 flex items-center gap-1">
                            <Award className="w-3 h-3 text-yellow-400" />
                            Ranking Event
                          </span>
                        )}

                        <h4 className="text-sm font-bold text-white hover:text-blue-300 transition-colors">
                          {item.title}
                        </h4>

                        {!item.read && (
                          <span
                            className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-500/20 animate-pulse"
                            title="Unread alert"
                          />
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                      {/* Footer Metadata */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {item.timestamp}
                        </span>

                        {item.scoreImpact !== undefined && item.scoreImpact !== 0 && (
                          <span
                            className={`font-semibold flex items-center gap-0.5 px-2 py-0.5 rounded ${
                              item.scoreImpact > 0
                                ? 'text-emerald-300 bg-emerald-500/10'
                                : 'text-rose-300 bg-rose-500/10'
                            }`}
                          >
                            {item.scoreImpact > 0 ? (
                              <TrendingUp className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 text-rose-400" />
                            )}
                            Score Delta: {item.scoreImpact > 0 ? `+${item.scoreImpact}%` : `${item.scoreImpact}%`}
                          </span>
                        )}

                        {item.founderName && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.founderId && onSelectFounderById) {
                                onSelectFounderById(item.founderId);
                              }
                            }}
                            className="text-blue-400 hover:text-blue-300 underline font-medium flex items-center gap-1 cursor-pointer"
                          >
                            View candidate: {item.founderName}
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Open source reference"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
