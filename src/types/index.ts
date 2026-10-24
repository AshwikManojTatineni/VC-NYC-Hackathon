export type TrackType = 'sourcing' | 'due-diligence' | 'both';

export interface ScoreBreakdown {
  domainDepth: number; // Max 25%
  tractionVelocity: number; // Max 25%
  marketTAM: number; // Max 20%
  cseSignals: number; // Max 15% (Google Custom Search Engine web signal & citations)
  dueDiligence: number; // Max 15% (Audit, legal & team integrity)
  totalScore: number; // 100% total
}

export interface ScoreHistoryPoint {
  date: string;
  stage: string;
  totalScore: number;
  domainDepth: number;
  tractionVelocity: number;
  marketTAM: number;
  cseSignals: number;
  dueDiligence: number;
}

export interface SocialLinks {
  linkedin: string;
  twitter: string;
  github: string;
  warpcast?: string;
}

// 4 Required Technologies for every project in the hackathon
export interface RequiredTechStack {
  nicrronNinoo: {
    status: 'connected' | 'syncing' | 'active';
    telemetryVersion: string;
    lastPing: string;
    agentSyncRate: string;
  };
  prismBlockConvey: {
    status: 'active' | 'monitoring' | 'healthy';
    url: string; // prism.blockconvey.com
    mcpToolsCount: number;
    agentLatencyMs: number;
    activeMcpServer: string;
  };
  aktaProWokelo: {
    status: 'generated' | 'ready' | 'analyzing';
    url: string; // akta.pro
    investmentMemoScore: number;
    moatAnalysis: string;
  };
  roundtableCP: {
    status: 'open' | 'syndicating' | 'committed';
    spvPoolName: string;
    allocationTarget: string;
    committedPercent: number;
    quorumStatus: string;
  };
}

export interface CalendarMeeting {
  id: string;
  founderId: string;
  founderName: string;
  startup: string;
  title: string;
  date: string;
  time: string;
  agenda: string;
  googleMeetUrl: string;
  googleCalendarUrl: string;
  status: 'scheduled' | 'confirmed' | 'completed';
  xpAwarded: number;
  createdAt: string;
}

export interface VCQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  category: 'meetings' | 'social' | 'diligence' | 'mcp';
  progress: number;
  target: number;
  iconName: string;
}

export interface VCBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export interface Founder {
  id: string;
  name: string;
  avatar: string;
  role: string;
  startup: string;
  tagline: string;
  track: TrackType;
  location: string;
  fundingStage: string;
  askAmount: string;
  scores: ScoreBreakdown;
  history?: ScoreHistoryPoint[];
  cseQuery: string;
  cseFoundSnippets: number;
  devpostUrl: string;
  lumaHackathonUrl: string;
  socials: SocialLinks;
  techStack: RequiredTechStack;
  tags: string[];
  keyHighlights: string[];
  redFlags: string[];
  verifiedDueDiligence: boolean;
  notes?: string;
  starred?: boolean;
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  track: 'Track 1 (Sourcing)' | 'Track 2 (Due Diligence)' | 'Devpost' | 'CSE Signal' | 'Calendar Meet' | 'Syndicate Quest';
  founderName?: string;
  founderId?: string;
  scoreImpact?: number;
  xpEarned?: number;
  read: boolean;
  severity: 'info' | 'success' | 'warning' | 'urgent';
  sourceUrl: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: 'VC Partner' | 'Venture Scout' | 'Angel Investor' | 'Hackathon Judge' | 'Founder';
  bio: string;
  startup: string;
  tagline: string;
  track: TrackType;
  personalFounderScore: ScoreBreakdown;
  rankingPosition: number;
  // Daily webapp Google free tier requests usage / total
  dailyRequestsUsed: number;
  dailyRequestsTotal: number;
  // Google token Free tier daily token usage / total
  dailyTokensUsed: number;
  dailyTokensTotal: number;
  freeTierQueriesRemaining: number;
  freeTierQueriesTotal: number;
  freeTierTokenActive: boolean;
  googleConnected: boolean;
  // Gamification & VC Syndicate Metrics
  vcXP: number;
  vcLevel: number;
  meetingsScheduledCount: number;
  socialConnectsCount: number;
  quests: VCQuest[];
  badges: VCBadge[];
  scheduledMeetings: CalendarMeeting[];
}
