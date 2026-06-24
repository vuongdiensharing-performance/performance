# Skill: Media Buying & Performance Optimization

## Purpose
Drive growth through sharp advertising strategies, ensuring traffic quality meets sustainable revenue goals.

## Core Metrics & KPIs
When auditing or planning a campaign, the Agent must adhere to the following benchmarks (defined in `shared/constants.ts`):

- **TARGET_CPA_THRESHOLD**: Maximum cost per lead allowed to maintain profitability.
- **ROAS_MIN_LIMIT**: Minimum return on ad spend required for campaign health.

## Media Buying Workflow
1. **Strategic Planning**: Define the target audience and entry point (TOFU/MOFU) based on educational industry standards.
2. **Setup**: Always generate UTM links using the `generate_utm` tool to ensure granular tracking.
3. **Execution**: Monitor performance continuously. Do not rely solely on impressions.
4. **Optimization**: 
    - Use the `analyze_roas_cpa` tool to process raw data.
    - Evaluate campaign health (`isHealthy` flag) based on the defined KPIs.
    - If `isHealthy` is false, identify the bottleneck (CPA too high or ROAS too low).

## Instruction for AI Agents
When managing or reviewing campaigns:
- **Prioritize Data over Intuition**: Base all recommendations on the output of the `analyze_roas_cpa` tool.
- **Continuous Improvement**: If a campaign fails to meet the `EDUCATION_KPI`, provide actionable steps to reduce CPA or improve conversion rates.
- **Maintain Consistency**: Ensure all tracking parameters follow the structure established in `shared/types.ts`.
