import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

// export async function POST(req) {
//   const { prompt } = await req.json();

//   // Ask OpenAI for a streaming completion given the prompt
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     stream: true,
//     temperature: 0.6,
//     prompt: `Create three slogans for a business with unique features.

// Business: Bookstore with cats
// Slogans: "Purr-fect Pages", "Books and Whiskers", "Novels and Nuzzles"
// Business: Gym with rock climbing
// Slogans: "Peak Performance", "Reach New Heights", "Climb Your Way Fit"
// Business: ${prompt}
// Slogans:`,
//   });
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }


import endent from 'endent';
const { createParser } = require('eventsource-parser');


const createPrompt = (inputLanguage, outputLanguage, inputCode) => {
  if (inputLanguage === 'Natural Language') {
    return endent`
    You are an expert programmer in all programming languages. Translate the natural language to "${outputLanguage}" code. Do not include \`\`\`.

    Example translating from natural language to JavaScript:

    Natural language:
    Print the numbers 0 to 9.

    JavaScript code:
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }

    Natural language:
    ${inputCode}

    ${outputLanguage} code (no \`\`\`):
    `;
  } else if (outputLanguage === 'Natural Language') {
    return endent`
      You are an expert programmer in all programming languages. Translate the "${inputLanguage}" code to natural language in plain English that the average adult could understand. Respond as bullet points starting with -.
  
      Example translating from JavaScript to natural language:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Natural language:
      Print the numbers 0 to 9.
      
      ${inputLanguage} code:
      ${inputCode}

      Natural language:
     `;
  } else {
    return endent`
      You are an expert programmer in all programming languages. Translate the "${inputLanguage}" code to "${outputLanguage}" code. Do not include \`\`\`.
  
      Example translating from JavaScript to Python:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Python code:
      for i in range(10):
        print(i)
      
      ${inputLanguage} code:
      ${inputCode}

      ${outputLanguage} code (no \`\`\`):
     `;
  }
};

export default async function AIStream(inputLanguage, outputLanguage, inputCode, model) {
  const prompt = createPrompt(inputLanguage, outputLanguage, inputCode);

  const system = { role: 'system', content: prompt };

  console.log(system);

  const res = await openai.createChatCompletion({
    model,
    messages: [system],
    temperature: 0,
    stream: true,
  })

  // const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${key || process.env.OPENAI_API_KEY}`,
  //   },
  //   method: 'POST',
  //   body: JSON.stringify({
  //     model,
  //     messages: [system],
  //     temperature: 0,
  //     stream: true,
  //   }),
  // });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenAI API returned an error: ${decoder.decode(result?.value) || statusText
      }`,
    );
  }

  // // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(res);
  // // Respond with the stream
  // return new StreamingTextResponse(stream);

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};