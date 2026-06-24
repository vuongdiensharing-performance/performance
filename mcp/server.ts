// mcp/server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Import logic từ tầng CLI
import { generateUtmLink } from "../cli/utm-generator.js";
import { cleanAndCalculateMetrics } from "../cli/data-cleaner.js";

// Khởi tạo MCP Server
const server = new Server(
  {
    name: "performance-marketing-brain",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// BƯỚC 1: Khai báo danh sách các Tools cho Claude
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_utm",
        description: "Tạo link tracking UTM chuẩn hóa cho các chiến dịch quảng cáo giáo dục (TOFU/MOFU).",
        inputSchema: {
          type: "object",
          properties: {
            baseUrl: { type: "string", description: "URL đích (Landing Page)" },
            source: { type: "string", enum: ["facebook", "google", "tiktok", "email"] },
            medium: { type: "string", enum: ["cpc", "cpm", "organic", "newsletter"] },
            campaign: { type: "string", description: "Tên chiến dịch, ví dụ: davinci-resolve-basic" },
          },
          required: ["baseUrl", "source", "medium", "campaign"],
        },
      },
      {
        name: "analyze_roas_cpa",
        description: "Làm sạch dữ liệu thô từ Ads Manager và tự động tính toán CPA, ROAS để đánh giá hiệu quả chiến dịch.",
        inputSchema: {
          type: "object",
          properties: {
            rawData: {
              type: "array",
              description: "Mảng dữ liệu thô copy từ Ads Manager chứa spend, leads, purchases, revenue.",
              items: {
                type: "object",
                properties: {
                  campaign_name: { type: "string" },
                  spend: { type: "string" },
                  leads: { type: "string" },
                  purchases: { type: "string" },
                  revenue: { type: "string" },
                }
              }
            }
          },
          required: ["rawData"],
        },
      }
    ],
  };
});

// BƯỚC 2: Xử lý thực thi khi Claude gọi Tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "generate_utm") {
      const url = generateUtmLink(args as any);
      return {
        content: [{ type: "text", text: `Link UTM đã được tạo chuẩn: ${url}` }],
      };
    }

    if (name === "analyze_roas_cpa") {
      const cleanedData = cleanAndCalculateMetrics((args as any).rawData);
      return {
        content: [{ 
          type: "text", 
          text: `Dữ liệu đã được làm sạch và tính toán metrics:\n${JSON.stringify(cleanedData, null, 2)}` 
        }],
      };
    }

    throw new Error(`Tool không tồn tại: ${name}`);
  } catch (error: any) {
    return {
      content: [{ type: "text", text: `Lỗi khi thực thi tool: ${error.message}` }],
      isError: true,
    };
  }
});

// BƯỚC 3: Khởi động Server qua giao thức Stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Performance Marketing MCP Server đang chạy...");
}

main().catch((error) => {
  console.error("Lỗi khởi động server:", error);
  process.exit(1);
});
