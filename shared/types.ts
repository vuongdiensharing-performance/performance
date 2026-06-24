// shared/types.ts

export interface AdSpendData {
  campaignName: string;
  spend: number;
  currency: string;
  date: string;
}

export interface LeadData {
  campaignName: string;
  leads: number;
  qualifiedLeads: number;
}

export interface CampaignMetrics {
  campaignName: string;
  spend: number;
  leads: number;
  cpa: number; // Spend / Leads
  roas: number; // Revenue / Spend
  isHealthy: boolean; // Dựa trên hằng số KPI
}
