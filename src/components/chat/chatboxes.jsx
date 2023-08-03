import { useState, useEffect } from "react";
import Button from "./button";
import Chats from "./chats";
import { LoadingChatLine } from "./chats";
import ClearThread from "./buttonClear";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "nextjs-ai-chat-gpt3";

export default function ChatBox() {
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activated, setActive] = useState(false);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  function handleChange(event) {
    setPrompt(event.target.value);
    //  console.log(event.target.value);
  }

  async function handleSubmitApi(input) {
    //  event.preventDefault();

    if (loading) {
      alert("Please wait for the last response!");
      return;
    } else if (input) {
      setLoading(true);
      history.push({ role: "user", content: input });
    } else return;

    try {
      const controller = new AbortController();

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          activateStatus: activated,
          records: history,
          user: cookie[COOKIE_NAME],
        }),
      });

      if (!activated) {
        const data = await response.json();
        console.log(data);
        if (data.activate) {
          setHistory((prevHistory) => [...prevHistory, data.result]);
        } else {
          setHistory((prevHistory) => [...prevHistory, data.result]);
        }
        setLoading(false);
        setActive(true);
      } else {
        if (!response.ok) {
          setLoading(false);
          alert("Something went wrong.");
          return;
        }

        const data = response.body;

        if (!data) {
          setLoading(false);
          alert("Something went wrong.");
          return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let code = "";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);

          code += chunkValue;

          setLoading(false);

          setHistory((prevHistory) => {
            if (prevHistory.slice(-1)[0].role === "user") {
              return [
                ...prevHistory,
                {
                  role: "assistant",
                  content: code,
                },
              ];
            } else {
              return [
                ...prevHistory.slice(0, -1),
                {
                  role: "assistant",
                  content: code,
                },
              ];
            }
          });
        }
      }
    } catch (error) {
      // Consider implementing your own error handling logic here
      //console.error(error);
      alert(error);
    }
  }

  return (
    <div class="h-screen w-full flex flex-col ">
      <div className="rounded-xl h-1/3 border-zinc-100  border-2 mt-6">
        {history.map((props, index) => (
          <Chats key={index} role={props.role} content={props.content} />
        ))}
      </div>
      <div className="flex flex-grow items-end ">
        <div className="grid grid-cols-6 gap-3 w-full mb-6">
          <div className="justify-self-end	">
            <ClearThread
              type="submit"
              className="mr-4 flex-none"
              onClick={() => {
                setHistory([]);
                setPrompt("");
              }}
            >
              {" "}
              Clear{" "}
            </ClearThread>
          </div>
          <div className="col-span-4 justify-stretch">
            <input
              type="text"
              aria-label="chat input"
              required
              className="w-full rounded-md border border-zinc-900/10 bg-white py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
              value={prompt}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitApi(prompt);
                  setPrompt("");
                }
              }}
            />
          </div>
          <div className="justify-self-start">
            <Button
              type="submit"
              className="ml-4 flex-none"
              onClick={() => {
                handleSubmitApi(prompt);
                setPrompt("");
              }}
            >
              Say
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
