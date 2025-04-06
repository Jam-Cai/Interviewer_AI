require('dotenv').config()
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
})

async function summarize(history) {

  const result = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    store: false,
    messages: [
      {
        role: 'user',
        content:
          `You will be given an array of JSON objects representing a peer programming interview between a user and an AI.
          Please summarize their conversation history as concisely as possible without sacrificing understanding.
          If the user submits code, you MUST preserve their exact code in your summary.
          You must also preserve enough information about the coding question for the AI to give a good interview.
          Make sure the summary is clear enough for an AI to understand the context.
          The history: ${JSON.stringify(history)}`
      }
    ]
  })

  // return the string that the AI returns
  return result.choices[0].message.content
}

module.exports = { summarize }