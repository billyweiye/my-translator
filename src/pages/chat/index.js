import ChatBox from "@/components/chat/chatboxes";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 h-screen w-screen ">
       <Header />
      <section className="flex justify-center">
        <div className="flex fel-grow	w-2/3">
          <ChatBox />
        </div>
      </section>
    </div>
  );
}
