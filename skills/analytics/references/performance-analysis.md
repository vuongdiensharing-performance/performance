# Skill: Performance Data Analysis

## Purpose
Biến dữ liệu thô từ Ads Manager thành các quyết định tối ưu hóa kinh doanh (Actionable Insights).

## Analysis Framework (Framework 3 Lớp)
1. **Lớp Chỉ số (Metrics Layer)**: 
   - Sử dụng tool `analyze_roas_cpa`.
   - Kiểm tra ngưỡng `EDUCATION_KPI` (CPA < 200k, ROAS > 3.5).
2. **Lớp Chẩn đoán (Diagnostic Layer)**:
   - Nếu CPA cao: Kiểm tra CTR (tại `skills/ads/`) hoặc Landing Page.
   - Nếu ROAS thấp: Kiểm tra tỷ lệ chuyển đổi (Conversion Rate) trên phễu (`skills/automation-funnel.md`).
3. **Lớp Hành động (Action Layer)**:
   - Đưa ra đề xuất cụ thể: Dừng chiến dịch (Kill), Tăng ngân sách (Scale), hoặc Tối ưu creative (Refine).

## Workflow khi phân tích
- **Bước 1**: Nhận dữ liệu thô (raw data).
- **Bước 2**: Chạy `analyze_roas_cpa` để phân loại chiến dịch (Healthy vs. Unhealthy).
- **Bước 3**: Đối chiếu với `shared/constants.ts` để đưa ra phán quyết.
- **Bước 4**: Tổng hợp báo cáo ngắn gọn (Dưới 300 từ) gồm: Tình trạng, Nguyên nhân, Hành động tiếp theo.
