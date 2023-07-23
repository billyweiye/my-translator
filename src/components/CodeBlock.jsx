import { StreamLanguage } from '@codemirror/language';
import { python } from '@codemirror/legacy-modes/mode/python';
import { bbedit  } from '@uiw/codemirror-theme-bbedit';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';



const CodeBlock = ({
  code,
  editable = false,
  onChange = () => { },
}) => {
  const [copyText, setCopyText] = useState('Copy');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);


  return (
    <div className="relative mt-4 border-2 h-">
      <button
        className="absolute right-0 top-0 z-10 rounded border-2 hover:bg-klein-blue p-1 text-xs hover:text-slate-100 bg-white text-klein-blue active:bg-blue-700"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
        {copyText}
      </button>
      <div className="max-h-500 overflow-y-auto">

        <CodeMirror
          editable={editable}
          value={code}
          minHeight="200px"
          maxHeight="500px"
          extensions={[StreamLanguage.define(python)]}
          theme={bbedit}
          onChange={(value) => onChange(value)}
        />
      </div>
    </div>
  );
};

// Note: In JavaScript, we do not explicitly define the component as a React functional component (FC).
// We can directly use the component without the `FC<Props>` type.

export { CodeBlock };
