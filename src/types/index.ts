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
  track: 'Track 1 (Sourcing)' | 'Track 2 (Due Diligence)' | 'Devpost' | 'CSE Signal';
  founderName?: string;
  founderId?: string;
  scoreImpact?: number;
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
}

