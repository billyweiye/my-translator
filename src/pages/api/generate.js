
// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream } from "ai";

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




async function AIStream(mesgs,user,max_tokens
) {
      const res = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        stream: true,
        messages: mesgs,
        temperature: 0.6,
        user: user,
        max_tokens: parseInt(max_tokens),
      });

     
      const decoder = new TextDecoder();

      console.log(res.status);

      if (res.status !== 200) {
        const statusText = res.statusText;
        const result = await res.body?.getReader().read();
        throw new Error(
          `OpenAI API returned an error: ${
            decoder.decode(result?.value) || statusText
          }`
        );
      }
    
      // Convert the response into a friendly text-stream
      const stream = OpenAIStream(res);

    
      return stream;
}


export default async function handler(req) {
  console.log("ok");

  const body = await req.json()

  var recordHistory = body.records;
  var rounds = 3;
  if (!body.activateStatus) {
    if (body.records.slice(-1)[0].content.replace(/\s+/g, "").toLowerCase() === "startbullshitting") {
    //  recordHistory.push({ role: "assistant", content: "I'm activated! Let's Chat!" })
      return new Response(JSON.stringify({ activate: true, result: { role: "assistant", content: "I'm activated! Let's Chat!" } }));
    }
    else {
    //  recordHistory.push({ role: "assistant", content: "Please activate me first!" })
      return new Response(JSON.stringify({ activate: false, result: { role: "assistant", content: "Please activate me first!" } }));
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

    //const max_tokens = process.env.MAX_TOKENS;
    const max_tokens = 200;

    try {
      // Convert the response into a friendly text-stream
      const stream = await AIStream(mesgs,body.user,max_tokens)

   //   console.log(stream)

    
      return new Response(stream);
    
      // const res=await completion.json()

      // recordHistory.push(res.choices[0].message);
      // return new Response(JSON.stringify({ result: recordHistory }));
    } catch (error) {
      console.error(error);
      return new Response('Error', { status: 500 });
    }
  }
}
