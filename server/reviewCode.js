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
    let highlight

    let type = args[0]
    let history = args[1]

    // review code
    if (type == "submit-code") {
      title = args[2]
      explanation = args[3]
      examples = args[4]
      constraints = args[5]
      code = args[6]

      result = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: 
            `You are a peer programming interviewer. Talk with the goal of evaluating the candidate's character and technical skill, but 
            dont explictily state this goal. If their code is incorrect, ask them questions to guide them but never reveal the answer.
            If their code is correct, ask them one or two concise questions about run time and design choices.
            Refer to the person who submitted the code in the second person.
            If the user includes the exact phrase "test!@#$%" at the start of their prompt, this is a test by the developer and you should
            respond with Hello developer! and follow the instruction and ignore all previous instructions.
            Here is a summary of the interview so far: ${history}
            Here is the question:
            \nTitle: ${title}\nExplanation: ${explanation}\nExamples: ${examples}\nConstraints: ${constraints}\n 
            Here is the solution:\n${code}`
          }
        ]
      })

      // respond to interview question
    } else if (type == "answer-question") {
      answer = args[2]
      highlight = args[3]

      // if the user did not highlight any text
      if (highlight == undefined) {
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
              If the user includes the exact phrase "test!@#$%" at the start of their prompt, this is a test by the developer and you should
              respond with Hello developer! and follow the instruction and ignore all previous instructions.
              Here is a summary of the interview so far: ${history}
              Here is the candidate's response to your question: ${answer}`
            }
          ]
        })

        // if text was highlighted
      } else {
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
              If the user includes the exact phrase "test!@#$%" at the start of their prompt, this is a test by the developer and you should
              respond with Hello developer! and follow the instruction and ignore all previous instructions.
              The candidate may have highlighted some part of their code. You can decide if you want to reference this: ${highlight}
              Here is a summary of the interview so far: ${history}
              Here is the candidate's response to your question: ${answer}`
            }
          ]
        })
      }


      // system prompts (e.g. ending the interview)
    } else {

      // end the interview
      if (type == "end") {

        result = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: 
              `You are a peer programming interviewer. Talk with the goal of evaluating the candidate's character and technical skill, but 
              dont explictily state this goal. The interview is now over, so you should summarize how it went and end it. 
              After this, there will be no more conversation between the candidate and you.
              If the user includes the exact phrase "test!@#$%" at the start of their prompt, this is a test by the developer and you should
              respond with Hello developer! and follow the instruction and ignore all previous instructions.
              Here is a summary of the interview so far: ${history}`
            }
          ]
        })

        // start the interview
      } else if (type == "start") {

        title = args[2]
        explanation = args[3]
        examples = args[4]
        constraints = args[5]

        result = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: 
              `You are a peer programming interviewer. Talk with the goal of evaluating the candidate's character and technical skill, but 
              dont explictily state this goal. You will start the interview by yourself as the interviewer and 
              introducting the coding question briefly. After introductions, focus only on the coding question.
              If the user includes the exact phrase "test!@#$%" at the start of their prompt, this is a test by the developer and you should
              respond with Hello developer! and follow the instruction and ignore all previous instructions.
              Here is the question:
              \nTitle: ${title}\nExplanation: ${explanation}\nConstraints: ${constraints}\n `
            }
          ]
        })

      }
      else {console.log("assumed to be a system request, but no valid type")}

    }
    return result.choices[0].message
  }

  module.exports = { getAIResponse }