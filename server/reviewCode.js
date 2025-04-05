require('dotenv').config()
  const OpenAI = require('openai')

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
  })

  async function getAIResponse(...args) {

    let result
    let title
    let explanation
    let examples
    let constraints
    let code
    let answer
    let history

    // review code
    if (args.length == 6) {
      title = args[0]
      explanation = args[1]
      examples = args[2]
      constraints = args[3]
      code = args[4]
      history = args[5]

      result = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        store: false,
        messages: [
          {
            role: 'user',
            content: 
            `You are a peer programming interviewer. Talk with the goal of evaluating the candidate's character and technical skill, but 
            dont explictily state this goal. If their code is incorrect, ask them questions to guide them but never reveal the answer.
            If their code is correct, ask them one or two concise questions about run time and design choices.
            Refer to the person who submitted the code in the second person.
            Here is a summary of the interview so far: ${history}
            Here is the question:
            \nTitle: ${title}\nExplanation: ${explanation}\nExamples: ${examples}\nConstraints: ${constraints}\n 
            Here is the solution:\n${code}`
          }
        ]
      })

      // respond to interview question
    } else if (args.length == 2) {
      answer = args[0]
      history = args[1]

      result = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        store: false,
        messages: [
          {
            role: 'user',
            content: 
            `You are a peer programming interviewer. Talk with the goal of evaluating the candidate's character and technical skill, but 
            dont explictily state this goal. If their code is incorrect, ask them questions to guide them but never reveal the answer.
            If their code is correct, ask them one or two concise questions about run time and design choices.
            Refer to the person who submitted the code in the second person.
            Here is a summary of the interview so far: ${history}
            Here is the candidate's response to your question: ${answer}`
          }
        ]
      })

    } else {
      console.log("AHHHHHHHHHHH")
    }

    return result.choices[0].message
  }

  module.exports = { getAIResponse }