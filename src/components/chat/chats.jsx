// util helper to convert new lines to <br /> tags
const convertNewLines = (text) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

export default function Chats(props) {
  if (!props.content) {
    return null
  }
  const formatteMessage = convertNewLines(props.content)

  return (
    <div
      className={
        props.role != 'assistant' ? 'float-right clear-both' : 'float-left clear-both'
      }
    >
      <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-1 gap-4">
            <p className="font-large text-xxl text-gray-900">
              <a href="#" className="hover:underline">
                {props.role == 'assistant' ? 'AI' : 'You'}
              </a>
            </p>
            <p
              className="{{
                props.role == 'assistant' ? 'font-semibold ' : 'font-semibold  text-gray-400'
              }}"
            >
              {formatteMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
