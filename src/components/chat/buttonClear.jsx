export default function ClearThreads({ className, ...props }) {
  return (
    <button
      className="rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-600 font-semibold text-zinc-100 hover:bg-zinc-400 active:bg-zinc-800 active:text-zinc-100/70"
      {...props}
    />
  );
}
