import Header  from '@/components/Header';
import { CodeBlock } from '@/components/CodeBlock';
import { LanguageSelect } from '@/components/LanguageSelect';
import { TextBlock } from '@/components/TextBlock';
import { SwapLanguage } from '@/components/SwapLanguage';
import { TranslateButton } from '@/components/TranslateButton';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState('JavaScript');
  const [outputLanguage, setOutputLanguage] = useState('Python');
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  // const [model, setModel] = useState('gpt-3.5-turbo');
  const [loading, setLoading] = useState(false);
  const [hasTranslated, setHasTranslated] = useState(false);

  const model = 'gpt-3.5-turbo';
  const handleTranslate = async () => {
    const maxCodeLength = 3000;

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const body = {
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
  };

  const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };



  useEffect(() => {
    if (hasTranslated) {
      handleTranslate();
    }
  }, [outputLanguage]);


  return (
    <div class='h-screen'>
      <Head>
        <title>Code Translator</title>
        <meta
          name="description"
          content="Use AI to translate code from one language to another."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class='h-fit'>
      <Header />
      </div>
      
      
      <div class='h-full bg-gray-100'>
      <div className="flex flex-col items-center  px-4 pb-20 text-gray-800">



        <div className="mt-2 flex items-center space-x-2">
          {/* <ModelSelect model={model} onChange={(value) => setModel(value)} /> */}

          {/* <TranslateButton loading={loading} handleTranslate={handleTranslate} /> */}
        </div>


        <div className="mt-8 w-2/3 ">
          <div class="grid grid-cols-8 gap-2 ">
            <div className="col-span-3 justify-center">

              <div className="flex">
                <LanguageSelect
                  language={inputLanguage}
                  onChange={(value) => {
                    setInputLanguage(value);
                    setHasTranslated(false);
                    setInputCode('');
                    setOutputCode('');
                  }}
                />
                <div class='ml-auto'>
                  <TranslateButton loading={loading} handleTranslate={handleTranslate} />
                </div>
              </div>

              <div>
                {inputLanguage === 'Natural Language' ? (
                  <TextBlock
                    text={inputCode}
                    editable={!loading}
                    onChange={(value) => {
                      setInputCode(value);
                      setHasTranslated(false);
                    }}
                  />
                ) : (
                  <CodeBlock
                    code={inputCode}
                    editable={!loading}
                    onChange={(value) => {
                      setInputCode(value);
                      setHasTranslated(false);
                    }}
                  />
                )}
              </div>
            </div>

            <div class="flex-col col-span-2 justify-self-center		">
              <SwapLanguage initInputLanguage={inputLanguage}
                initOutputLanguage={outputLanguage}
                setInputLanguage={setInputLanguage}
                setOutputLanguage={setOutputLanguage} />
            </div>

            <div className="col-span-3 justify-center ">

              <div className="relative">
                <LanguageSelect
                  language={outputLanguage}
                  onChange={(value) => {
                    setOutputLanguage(value);
                    setOutputCode('');
                  }}
                />
                {outputLanguage === 'Natural Language' ? (
                  <TextBlock text={outputCode} />
                ) : (
                  <CodeBlock code={outputCode} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

  );
}
