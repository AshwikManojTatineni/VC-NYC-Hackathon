import React, { useState } from 'react';
import {
  X,
  Calendar,
  Video,
  ExternalLink,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  User,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { Founder, CalendarMeeting } from '../types';

interface CalendarMeetModalProps {
  isOpen: boolean;
  onClose: () => void;
  founders: Founder[];
  selectedFounderId?: string;
  onScheduleMeeting: (meeting: CalendarMeeting) => void;
}

export const CalendarMeetModal: React.FC<CalendarMeetModalProps> = ({
  isOpen,
  onClose,
  founders,
  selectedFounderId,
  onScheduleMeeting,
}) => {
  if (!isOpen) return null;

  const initialFounder =
    founders.find((f) => f.id === selectedFounderId) || founders[0] || null;

  const [targetFounderId, setTargetFounderId] = useState(initialFounder?.id || '');
  const [meetingTitle, setMeetingTitle] = useState(
    initialFounder ? `VC Deep Dive: ${initialFounder.startup} (NYC Hackathon)` : 'VC Founder First Look Meeting'
  );
  const [meetingDate, setMeetingDate] = useState('2026-10-26');
  const [meetingTime, setMeetingTime] = useState('14:30');
  const [duration, setDuration] = useState('30');
  const [agenda, setAgenda] = useState(
    'Discuss Track 1 sourcing signals, review akta.pro diligence brief, and structure Roundtable. CP syndicate allocation.'
  );
  const [meetingSuccess, setMeetingSuccess] = useState<CalendarMeeting | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeFounder = founders.find((f) => f.id === targetFounderId) || initialFounder;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFounder) return;

    // Generate real Google Calendar URL template
    const startIso = `${meetingDate.replace(/-/g, '')}T${meetingTime.replace(/:/g, '')}00Z`;
    // Add 30 or 45 mins
    const endMinutes = (parseInt(meetingTime.split(':')[1]) + parseInt(duration)) % 60;
    const endHour =
      parseInt(meetingTime.split(':')[0]) +
      Math.floor((parseInt(meetingTime.split(':')[1]) + parseInt(duration)) / 60);
    const endIso = `${meetingDate.replace(/-/g, '')}T${String(endHour).padStart(2, '0')}${String(
      endMinutes
    ).padStart(2, '0')}00Z`;

    const meetCode = `vc-hack-${activeFounder.startup.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Math.floor(
      Math.random() * 900 + 100
    )}`;
    const googleMeetUrl = `https://meet.google.com/${meetCode}`;

    const calendarTemplateUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      meetingTitle
    )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
      `${agenda}\n\nGoogle Meet Link: ${googleMeetUrl}\nFounder: ${activeFounder.name} (${activeFounder.startup})\nPowered by DealFlow 100% Ranker`
    )}&add=${encodeURIComponent(activeFounder.socials?.linkedin || 'founder@dealflow.vc')}`;

    const newMeeting: CalendarMeeting = {
      id: `meet-${Date.now()}`,
      founderId: activeFounder.id,
      founderName: activeFounder.name,
      startup: activeFounder.startup,
      title: meetingTitle,
      date: meetingDate,
      time: `${meetingTime} EST (${duration}m)`,
      agenda,
      googleMeetUrl,
      googleCalendarUrl: calendarTemplateUrl,
      status: 'scheduled',
      xpAwarded: 250,
      createdAt: 'Just now',
    };

    onScheduleMeeting(newMeeting);
    setMeetingSuccess(newMeeting);
  };

  const handleCopyMeet = () => {
    if (!meetingSuccess) return;
    navigator.clipboard.writeText(meetingSuccess.googleMeetUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-white space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Video className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold">Schedule Google Calendar Video Conference</h3>
            </div>
            <p className="text-xs text-slate-400">
              Win founder access & earn <strong className="text-yellow-400 font-bold">+250 VC XP</strong> by booking directly into Google Calendar & Google Meet
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {meetingSuccess ? (
          /* Confirmation State */
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-blue-950/40 p-5 rounded-2xl border border-emerald-500/40 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Conference Booked • First Look Rights Unlocked!
              </span>
              <h4 className="text-lg font-extrabold text-white">{meetingSuccess.title}</h4>
              <p className="text-xs text-slate-300">
                Confirmed with <strong>{meetingSuccess.founderName}</strong> ({meetingSuccess.startup}) for{' '}
                <span className="text-white font-mono">{meetingSuccess.date} @ {meetingSuccess.time}</span>
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-bold mt-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>+250 XP Awarded to your VC Syndicate Level</span>
              </div>
            </div>

            {/* Google Meet & Calendar Links */}
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-blue-400" />
                    Google Meet Video Conference URL:
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    Instant Room Ready
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-blue-300">
                  <span className="truncate">{meetingSuccess.googleMeetUrl}</span>
                  <button
                    onClick={handleCopyMeet}
                    className="ml-2 text-slate-300 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={meetingSuccess.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Open in Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={meetingSuccess.googleMeetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Google Meet Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close & View Timeline
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Founder Selector */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Founder / Project</label>
              <select
                value={targetFounderId}
                onChange={(e) => {
                  setTargetFounderId(e.target.value);
                  const f = founders.find((item) => item.id === e.target.value);
                  if (f) {
                    setMeetingTitle(`VC Deep Dive: ${f.startup} (NYC Hackathon)`);
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {founders.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} — {f.startup} ({f.scores.totalScore}% Score • {f.askAmount})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Meeting Title</label>
              <input
                type="text"
                required
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Time (EST)</label>
                <input
                  type="time"
                  required
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white cursor-pointer"
                >
                  <option value="30">30 Mins (First Look)</option>
                  <option value="45">45 Mins (Diligence)</option>
                  <option value="60">60 Mins (Term Sheet)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Agenda & Technology Focus</label>
              <textarea
                rows={3}
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder="Include topics like Block Convey MCP agent telemetry, akta.pro moat analysis, and Roundtable CP syndicate allocations..."
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-slate-300">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-yellow-400" />
                Gamified XP Rewards:
              </span>
              <p className="text-[11px] text-slate-400">
                Scheduling unlocks <strong>+250 XP</strong>, advances your Syndicate Level, and fast-tracks founder direct messaging access.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm & Generate Google Calendar Meet</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
