import React from 'react';
import {
  Award,
  Video,
  Calendar,
  Sparkles,
  Share2,
  Users,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  ShieldAlert,
  MessageCircle,
  Zap,
  Plus,
  Play,
  Clock
} from 'lucide-react';
import { UserProfile, VCQuest, VCBadge, CalendarMeeting, Founder } from '../types';

interface GamificationDashboardProps {
  user: UserProfile;
  founders: Founder[];
  onOpenScheduleModal: (founderId?: string) => void;
  onOpenSocialModal: (founder: Founder) => void;
  onOpenTechModal: (founder: Founder) => void;
  onClaimQuest?: (questId: string) => void;
}

export const GamificationDashboard: React.FC<GamificationDashboardProps> = ({
  user,
  founders,
  onOpenScheduleModal,
  onOpenSocialModal,
  onOpenTechModal,
  onClaimQuest,
}) => {
  const xpForNextLevel = user.vcLevel * 1000;
  const currentLevelProgress = user.vcXP % 1000;
  const progressPercent = Math.min(100, Math.round((currentLevelProgress / 1000) * 100));

  const getLevelTitle = (lvl: number) => {
    switch (lvl) {
      case 1:
        return 'Scout Initiate';
      case 2:
        return 'Lead Diligence Analyst';
      case 3:
        return 'Syndicate Principal';
      case 4:
        return 'Venture Partner';
      default:
        return 'Unicorn Kingmaker';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero: Level, XP, and Conference Win Streak */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-purple-950/60 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              VC Syndicate Gamification: Win by Setting Google Calendar Video Conferences
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Level {user.vcLevel} {getLevelTitle(user.vcLevel)}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Connect directly with high-scoring founders across social networks, verify Block Convey MCP telemetry, and win priority syndicate allocation rights by booking confirmed Google Calendar video conferences.
            </p>
          </div>

          {/* XP & Level Card */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-purple-500/30 flex flex-col justify-center min-w-[240px] space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Total Syndicate XP
              </span>
              <span className="text-base font-extrabold text-yellow-400 font-mono">
                {user.vcXP.toLocaleString()} XP
              </span>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{currentLevelProgress} XP in Level {user.vcLevel}</span>
                <span>{1000 - currentLevelProgress} XP to Level {user.vcLevel + 1}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenScheduleModal()}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
            >
              <Video className="w-4 h-4 text-emerald-300" />
              <span>Schedule Google Calendar Meet (+250 XP)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gamification Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs flex items-center gap-1.5">
            <Video className="w-4 h-4 text-emerald-400" />
            Google Meets Booked
          </span>
          <p className="text-2xl font-black text-white font-mono">{user.scheduledMeetings.length}</p>
          <span className="text-[10px] text-emerald-400 font-medium">First Look Rights Active</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs flex items-center gap-1.5">
            <Share2 className="w-4 h-4 text-purple-400" />
            Founder Social Intros
          </span>
          <p className="text-2xl font-black text-white font-mono">{user.socialConnectsCount || 3}</p>
          <span className="text-[10px] text-purple-400 font-medium">LinkedIn / X / Warpcast</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs flex items-center gap-1.5">
            <Award className="w-4 h-4 text-yellow-400" />
            Badges Unlocked
          </span>
          <p className="text-2xl font-black text-white font-mono">
            {user.badges.filter((b) => b.unlocked).length} / {user.badges.length}
          </p>
          <span className="text-[10px] text-yellow-400 font-medium">Gold Tier Syndicate</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
          <span className="text-slate-400 text-xs flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-400" />
            Roundtable SPV Allocation
          </span>
          <p className="text-2xl font-black text-white font-mono">$250K</p>
          <span className="text-[10px] text-blue-400 font-medium">Unlocked Co-Investment</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Scheduled Google Calendar Video Conferences */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="space-y-0.5">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Google Calendar Video Conferences Timeline
              </h3>
              <p className="text-xs text-slate-400">
                Win deal access by securing video meetings with high-scoring founders
              </p>
            </div>

            <button
              onClick={() => onOpenScheduleModal()}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book Call</span>
            </button>
          </div>

          <div className="space-y-3">
            {user.scheduledMeetings.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <Video className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">No video conferences scheduled yet.</p>
                <button
                  onClick={() => onOpenScheduleModal()}
                  className="text-xs text-blue-400 hover:underline font-semibold"
                >
                  Schedule your first Google Calendar conference to earn +250 XP
                </button>
              </div>
            ) : (
              user.scheduledMeetings.map((meet) => (
                <div
                  key={meet.id}
                  className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{meet.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                          Confirmed
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        With <strong>{meet.founderName}</strong> ({meet.startup})
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                      +{meet.xpAwarded} XP
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {meet.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {meet.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <a
                      href={meet.googleMeetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Google Meet</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={meet.googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors border border-slate-700"
                    >
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>Google Calendar</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Active VC Quests & Bounties */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="space-y-0.5">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Active VC Quests & XP Bounties
              </h3>
              <p className="text-xs text-slate-400">
                Complete quests to unlock syndicate allocation tiers
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              {user.quests.filter((q) => q.completed).length} / {user.quests.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {user.quests.map((quest) => (
              <div
                key={quest.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  quest.completed
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {quest.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                      )}
                      <h4 className="text-xs font-bold text-white">{quest.title}</h4>
                      {quest.completed && (
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          Done
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed pl-6">
                      {quest.description}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-yellow-400">
                      +{quest.xpReward} XP
                    </span>
                  </div>
                </div>

                {!quest.completed && (
                  <div className="pt-2 pl-6 flex items-center justify-between">
                    <div className="w-2/3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {quest.progress} / {quest.target}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unlocked Badges & Trophies Ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              Syndicate Badges & Achievement Trophies
            </h3>
            <p className="text-xs text-slate-400">
              Unlocked via Google Meet video conference cadence, social network outreach, and Block Convey MCP audits
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border text-center space-y-1.5 transition-all ${
                badge.unlocked
                  ? 'bg-slate-950 border-yellow-500/30 shadow-lg shadow-yellow-500/5'
                  : 'bg-slate-950/40 border-slate-800 opacity-50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-lg ${
                  badge.unlocked
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-slate-800 text-slate-600 border border-slate-700'
                }`}
              >
                {badge.icon === 'Calendar' && <Calendar className="w-5 h-5 text-emerald-400" />}
                {badge.icon === 'MessageCircle' && <MessageCircle className="w-5 h-5 text-purple-400" />}
                {badge.icon === 'ShieldAlert' && <ShieldAlert className="w-5 h-5 text-blue-400" />}
                {badge.icon === 'Award' && <Award className="w-5 h-5 text-yellow-400" />}
                {badge.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5 text-indigo-400" />}
              </div>

              <h4 className="text-xs font-bold text-white">{badge.title}</h4>
              <p className="text-[10px] text-slate-400 leading-tight">{badge.description}</p>
              {badge.unlocked && (
                <span className="inline-block text-[9px] text-emerald-400 font-mono">
                  Unlocked: {badge.unlockedAt}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access to Required Project Technologies */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Required Project Tech & Agent Telemetry Quick Access
            </h3>
            <p className="text-xs text-slate-400">
              Auditing tools required for every hackathon project: NicrronNinoo, prism.blockconvey.com (MCP monitor), akta.pro by Wokelo AI, and Roundtable. CP
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {founders.slice(0, 4).map((f) => (
            <div
              key={f.id}
              className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white truncate">{f.startup}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  {f.scores.totalScore}%
                </span>
              </div>
              <div className="flex flex-wrap gap-1 text-[10px]">
                <button
                  onClick={() => onOpenTechModal(f)}
                  className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer"
                >
                  Block Convey MCP
                </button>
                <button
                  onClick={() => onOpenTechModal(f)}
                  className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 cursor-pointer"
                >
                  Akta.pro Memo
                </button>
                <button
                  onClick={() => onOpenSocialModal(f)}
                  className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 cursor-pointer"
                >
                  Social DM
                </button>
                <button
                  onClick={() => onOpenScheduleModal(f.id)}
                  className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 cursor-pointer"
                >
                  Book Meet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
