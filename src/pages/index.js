
import Head from 'next/head';
import Header  from '@/components/Header';

export default function Home() {


  return (
    <>
      <Head>
        <title>ZAi ZAi</title>
        <meta
          name="description"
          content="Use AI to translate code from one language to another."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </>

  );
}
