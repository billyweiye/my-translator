import Head from "next/head";
import Header from "@/components/Header";

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

      <div className="mt-16 flex flex-col items-center gap-4">
        <h1 className="md:display h1 w-full px-4 text-center font-mono md:w-[802px] md:px-0 ">
          Wander,Ponder,let <span className="text-sunset">curiosity guide</span>
        </h1>

        <p className="body-xl mt-10 px-4 font-mono text-center text-slate-300 md:w-[572px] md:px-0">
        Unlock the <span className="text-sunrise">AI</span> wonders!  
          <span>Explore Create Excel</span>
        </p>
      </div>
    </>
  );
}
