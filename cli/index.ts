// cli/index.ts
import { Command } from 'commander';
import { generateUtmLink } from './utm-generator';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();

// Helper để đọc context
const getProductContext = () => {
  const contextPath = path.join(process.cwd(), '.agents', 'product-marketing.md');
  return fs.existsSync(contextPath) ? fs.readFileSync(contextPath, 'utf-8') : 'No context found.';
};

// ... giữ lại phần command 'utm' hiện có ...

// THÊM MỚI COMMAND NURTURE
program.command('nurture')
  .description('Tạo email chăm sóc lead dựa trên Product Context')
  .requiredOption('-t, --target <target>', 'Đối tượng/Stage lead (vd: new-lead, sql)')
  .action((options) => {
    const context = getProductContext();
    console.log(`\n🔍 Đang đọc context từ .agents/product-marketing.md...`);
    
    // Ở đây bro có thể kết nối với LLM API (OpenAI/Anthropic) 
    // hoặc đơn giản là in ra hướng dẫn để bro copy cho AI
    console.log(`\n📝 Gợi ý kịch bản cho stage: ${options.target}`);
    console.log(`-----------------------------------`);
    console.log(`Dựa trên context: \n${context.substring(0, 200)}...`); 
    console.log(`\n(Bro hãy dán nội dung trên vào ChatGPT với lệnh: "Viết email chăm sóc lead stage ${options.target} dựa trên bối cảnh này")`);
  });

program.parse(process.argv);
