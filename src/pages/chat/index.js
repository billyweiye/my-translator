
import ChatBox from "@/components/chat/chatboxes";


export default function Home() {
  return (
    <div className="flex flex-col gap-12">

      <section className="h-screen w-screen flex justify-center items-center gap-3">
        <div className="lg:w-2/3">
          <ChatBox />
        </div>
      </section>
    </div>
  );
}
