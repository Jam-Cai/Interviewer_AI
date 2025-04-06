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
      code = args[2]

      result = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: 
            `You are a technical programming interviewer. Talk with the goal of evaluating the candidate's technical skill, but 
            dont explictily state this goal. 
            If the user is asking a question, answer their question without giving away the answer.
            Also guide the user towards the answer as if you were testing their problem solving skills.
            Always refer to the user in the second person.
            Please base your responses off of the following conversation history so far,
            which will include the coding question: ${history}\n
            Here is the candidate's solution:\n${code}`
          }
        ]
      })

      // respond to interview question
    } else if (type == "answer-question") {
      answer = args[2]
      highlight = args[3]
      code = args[4]

      let codePrompt

      if (code == undefined || code.trim === '') {
        codePrompt = "The candidate has not yet entered any code. You should prompt them to do so."
      } else {
        codePrompt = `This is all the code that the candidate has written so far: ${code}`
      }

      // if the user did not highlight any text
      if (highlight == undefined) {
        result = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          store: false,
          messages: [
            {
              role: 'user',
              content: 
              `You are a technical programming interviewer. Talk with the goal of evaluating the candidate's technical skill,
              but dont explictily state this goal.
              If the user is asking a question, answer their question without giving away the answer.
              Also guide the user towards the answer as if you were testing their problem solving skills.
              Always refer to the user in the second person.
              Please respond based on this conversation history: ${history}\n
              ${codePrompt}\n
              Here's what the candidate just said in response to your question: ${answer}`
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
              `You are a technical programming interviewer. Talk with the goal of evaluating the candidate's technical skill,
              but dont explictily state this goal.
              If the user is asking a question, answer their question without giving away the answer.
              Also guide the user towards the answer as if you were testing their problem solving skills.
              Always refer to the user in the second person.
              Please respond based on this conversation history: ${history}\n
              ${codePrompt}\n
              The candidate has highlighted some part of their code. You can decide if you want to reference this if it is relevant: 
              ${highlight}\n
              Here's what the candidate just said in response to your question: ${answer}`
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
              `You are a technical programming interviewer. Talk with the goal of evaluating the candidate's technical skill,
              but dont explictily state this goal. The interview is now over, so you should concisely summarize how it went and end it. 
              After this, there will be no more conversation between the candidate and you.
              Always refer to the user in the second person.
              Please base your responses off of the following conversation history of the interview: ${history}
              If there is nothing to evaluate or the candidate didn't do well, do not pretend they did. Do not be rude, but 
              exclusively be honest`
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
              `You are a technical programming interviewer. Talk with the goal of evaluating the candidate's technical skill, 
              but dont explictily state this goal. You will start the interview by yourself as the interviewer named MeetCode. 
              Introduce the coding question concisely. After introductions, focus only on the coding question.
              Ask the candidate to start coding, and ask the candidate to explain as they code when relevant.
              Mention that if the user wishes to talk to you, they should unmute, and that you will respond ONCE they mute, and that you can
              see any highlighted code once they hit mute.
              Always refer to the user in the second person.
              Here is the question:
              \nTitle: ${title}\nExplanation: ${explanation}\nConstraints: ${constraints}\n`
            }
          ]
        })

      }
      else {console.log("assumed to be a system request, but no valid type")}

    }
    return result.choices[0].message
  }

  module.exports = { getAIResponse }