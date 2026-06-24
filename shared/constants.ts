// shared/constants.ts

export const EDUCATION_KPI = {
  // Ngưỡng CPA tối đa cho khóa học (Ví dụ: dưới 200k/lead là tốt)
  TARGET_CPA_THRESHOLD: 200000,
  
  // ROAS tối thiểu cần đạt để duy trì campaign
  ROAS_MIN_LIMIT: 3.5,
  
  // Tỷ lệ chuyển đổi tối thiểu từ Lead sang Qualified Lead
  QUALIFIED_LEAD_RATIO: 0.25,
};

export const SOURCE_CONFIG = {
  ALLOWED_SOURCES: ['facebook', 'google', 'tiktok', 'email'],
  DEFAULT_CURRENCY: 'VND'
};
