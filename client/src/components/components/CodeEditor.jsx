import React, { useState } from "react";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

function CodeEditor() {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("cpp");

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      case "cpp":
        return cpp();
      case "java":
        return java();
      default:
        return javascript();
    }
  };

  return (
    <div className="w-full p-10 pr-8 pb-8 h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-[15px] border-l-4 leading-[1.15] pl-3 mb-auto">Code Editor</h1>
        <select
          className="text-[14px] pr-1 border-b-2 mt-[-2px] pb-1 border-(--code-stroke) outline-none"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
      

      {/* Code Editor */}
      <div className="mt-5 bg-(--code-fill) border-(--code-stroke) border-3 flex-1 flex overflow-y-auto" style={{ "scrollbar-color": "var(--code-stroke) var(--background)" }}>
        <CodeMirror
          value={code}
          className="w-full h-full text-black text-sm"
          height="100%"
          theme={vscodeDark}
          extensions={[getLanguageExtension(), basicSetup, EditorView.lineWrapping]}
          onChange={handleCodeChange}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
