// cli/data-cleaner.ts

export interface RawAdData {
  campaign_name: string;
  spend: string | number;
  leads: string | number;
  purchases: string | number;
  revenue: string | number;
}

export interface CleanedData {
  campaign: string;
  spend: number;
  leads: number;
  purchases: number;
  cpa: number;
  roas: number;
}

export function cleanAndCalculateMetrics(rawData: RawAdData[]): CleanedData[] {
  return rawData.map(row => {
    // Parse chuỗi tiền tệ hoặc số lượng thành số thực
    const spend = Number(row.spend?.toString().replace(/[^0-9.-]+/g, "")) || 0;
    const leads = Number(row.leads) || 0;
    const purchases = Number(row.purchases) || 0;
    const revenue = Number(row.revenue?.toString().replace(/[^0-9.-]+/g, "")) || 0;

    // Tự động tính toán các chỉ số Performance cốt lõi
    const cpa = leads > 0 ? spend / leads : 0;
    const roas = spend > 0 ? revenue / spend : 0;

    return {
      campaign: row.campaign_name.toLowerCase(),
      spend,
      leads,
      purchases,
      cpa: Number(cpa.toFixed(2)),
      roas: Number(roas.toFixed(2))
    };
  });
}
