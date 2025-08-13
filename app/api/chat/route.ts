import { convertToModelMessages, UIMessage } from 'ai';
import { Agent, formatCost } from 'ai-sdk-v5-agent-toolkit';

import '@/lib/ai/agents';

export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  const { messages }: { messages: UIMessage[] } = body;

  const agentId =
    body.agent || req.headers.get('x-agent-id') || 'simpleAssistant';

  const agent = Agent.getAgent(agentId) || Agent.getAgent('simpleAssistant');

  if (!agent) {
    return new Response('No agents available', { status: 500 });
  }

  const modelMessages = convertToModelMessages(messages);

  const result = agent.stream({
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ messages: finalMessages }) => {
      const costs = agent.costs;
      console.log('Cost tracking result:', costs ? `${costs.length} entries` : 'none');
      if (costs && costs.length > 0) {
        console.log('\n=== Cost Breakdown ===');
        costs.forEach(entry => {
          if (entry.modelName === 'Total') {
            console.log(`\n📊 TOTAL COSTS:`);
            console.log(`  Input: ${entry.input.tokens} tokens = ${formatCost(entry.input.cost)}`);
            console.log(`  Output: ${entry.output.tokens} tokens = ${formatCost(entry.output.cost)}`);
            if (entry.cached.tokens > 0) {
              console.log(`  Cached: ${entry.cached.tokens} tokens = ${formatCost(entry.cached.cost)}`);
            }
            console.log(`  💰 Total: ${entry.total.tokens} tokens = ${formatCost(entry.total.cost)}`);
          } else {
            console.log(`\nModel: ${entry.modelName}`);
            console.log(`  Input: ${entry.input.tokens} tokens = ${formatCost(entry.input.cost)}`);
            console.log(`  Output: ${entry.output.tokens} tokens = ${formatCost(entry.output.cost)}`);
            if (entry.cached.tokens > 0) {
              console.log(`  Cached: ${entry.cached.tokens} tokens = ${formatCost(entry.cached.cost)}`);
            }
            console.log(`  Subtotal: ${formatCost(entry.total.cost)}`);
          }
        });
        console.log('=====================\n');
      }
    },
  });
}
