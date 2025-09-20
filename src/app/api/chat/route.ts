import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { frontendTools } from '@assistant-ui/react-ai-sdk'
import { convertToModelMessages, streamText } from 'ai'

export const maxDuration = 30

const openrouter = createOpenAICompatible({
  apiKey: process.env.REDPILL_API_KEY,
  baseURL: 'https://api.redpill.ai/v1',
  name: 'redpill',
})

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json()

  const result = streamText({
    model: openrouter.chatModel('phala/gpt-oss-120b'),
    messages: convertToModelMessages(messages),
    system,
    tools: {
      ...frontendTools(tools),
      // add backend tools here
    },
  })

  return result.toUIMessageStreamResponse()
}
