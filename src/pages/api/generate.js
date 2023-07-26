
// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import { Configuration, OpenAIApi } from "openai";


export const config = {
  runtime: 'edge',
}

// export default async function handler(req) {
//   return new Response(JSON.stringify({ name: 'John Doe' }))
// }



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req) {
  console.log("ok");

  const body = await req.json()

  var recordHistory = body.records;
  var rounds = 3;
  if (!body.activateStatus) {
    if (body.records.slice(-1)[0].content.replace(/\s+/g, "").toLowerCase() === "startbullshitting") {
      recordHistory.push({ role: "assistant", content: "I'm activated! Let's Chat!" })
      return new Response(JSON.stringify({ activate: true, result: recordHistory }));
    }
    else {
      recordHistory.push({ role: "assistant", content: "Please activate me first!" })
      return new Response(JSON.stringify({ activate: false, result: recordHistory }));
    }
  }
  else {
    if (!configuration.apiKey) {
      return new Error(JSON.stringify({
        error: {
          message:
            "OpenAI API key not configured, please follow instructions in README.md"
        }
      }));
    }

    var systemPrompt = {
      role: "system", content: ""
    };
    //  var mesgs = new Array;
    //  mesgs.push(systemPrompt);
    //  mesgs.concat(recordHistory.slice(-rounds * 2 + 1))

    var mesgs = recordHistory.slice(-rounds * 2 + 1)

    const max_tokens = process.env.MAX_TOKENS;

    try {
      const completion = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: mesgs,
          user: body.user,
          max_tokens: parseInt(max_tokens),
          temperature: 0.6,
        })
      });

      const res=await completion.json()

      recordHistory.push(res.choices[0].message);
      return new Response(JSON.stringify({ result: recordHistory }));
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        return new Error(JSON.stringify(error.response.data));
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        return new Error(JSON.stringify({
          error: {
            message: "An error occurred during your request."
          }
        }));
      }
    }
  }
}
