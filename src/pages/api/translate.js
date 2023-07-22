// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import AIStream  from '@/utils/index';

export const runtime = 'edge';

export default async function handler (req)  {
  console.log("ok");
  try {
    const { inputLanguage, outputLanguage, inputCode, model } = await req.json();

    const stream = await AIStream(
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};


