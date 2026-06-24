// cli/utm-generator.ts

export interface UtmParams {
  baseUrl: string;
  source: 'facebook' | 'google' | 'tiktok' | 'email';
  medium: 'cpc' | 'cpm' | 'organic' | 'newsletter';
  campaign: string; // VD: davinci-resolve-basic, phoenix-art-summer
  content?: string; // Tên ad/creative
  term?: string;    // Keyword (nếu chạy search)
}

export function generateUtmLink(params: UtmParams): string {
  // Logic ép chuẩn định dạng: lowercase và thay space bằng dấu gạch ngang
  const sanitize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

  const url = new URL(params.baseUrl);
  url.searchParams.append('utm_source', sanitize(params.source));
  url.searchParams.append('utm_medium', sanitize(params.medium));
  url.searchParams.append('utm_campaign', sanitize(params.campaign));
  
  if (params.content) url.searchParams.append('utm_content', sanitize(params.content));
  if (params.term) url.searchParams.append('utm_term', sanitize(params.term));

  return url.toString();
}

// Chạy test nội bộ nếu gọi trực tiếp file
if (require.main === module) {
  const testLink = generateUtmLink({
    baseUrl: 'https://example.edu.vn/landing-page',
    source: 'facebook',
    medium: 'cpc',
    campaign: 'DaVinci Resolve Advanced'
  });
  console.log(`Generated Link: ${testLink}`);
}
