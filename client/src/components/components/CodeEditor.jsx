import React, { useState } from "react";
import axios from "axios";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Play } from "lucide-react";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [selectedText, setSelectedText] = useState("");

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "javascript": return javascript();
      case "python": return python();
      case "cpp": return cpp();
      case "java": return java();
      default: return javascript();
    }
  };

  const getPistonLanguage = () => {
    switch (language) {
      case "javascript": return "node";
      case "python": return "python3";
      case "cpp": return "cpp";
      case "java": return "java";
      default: return "node";
    }
  };

  const compileCode = async () => {
    setOutput("Running...");
    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: getPistonLanguage(),
        version: "*",
        files: [{ content: code }],
        stdin: "",
      });
      setOutput(response.data.run.stdout || response.data.run.stderr);
    } catch (error) {
      console.error("Compilation Error:", error);
      setOutput("Error compiling code. Please check API or code format.");
    }
  };

  return (
    <div className="w-full p-6 pl-7 h-screen flex flex-col bg-(--background) text-white">
    
      {/* Header */}
      <div className="flex justify-between items-center border-b border-(--code-stroke) pb-3">
        <h1 className="text-lg font-semibold">Code Editor</h1>
        <div className="border border-(--code-stroke) pr-2 pl-1 py-1 rounded-sm">
          <select
            className="bg-transparent text-sm outline-none cursor-pointer px-1 pr-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
      </div>

      {/* Code Editor Wrapper */}
      <div className="mt-3 relative flex-1 border border-(--code-stroke) rounded-sm overflow-hidden">
        <CodeMirror
          value={code}
          className="w-full h-full text-sm"
          height="100%"
          theme={vscodeDark}
          extensions={[getLanguageExtension(), basicSetup, EditorView.lineWrapping]}
          onChange={handleCodeChange}
          // text highlighting
          onUpdate={(viewUpdate) => {
            const { state } = viewUpdate.view;
            const selection = state.selection.main;

            const fromLine = state.doc.lineAt(selection.from);
            const toLine = state.doc.lineAt(selection.to);

            let selectedLines = [];

            for (let lineNumber = fromLine.number; lineNumber <= toLine.number; lineNumber++) {
              const line = state.doc.line(lineNumber);
              
              // Determine the selection range within the line
              const lineStart = line.from;
              const lineEnd = line.to;

              const selectionStart = Math.max(selection.from, lineStart);
              const selectionEnd = Math.min(selection.to, lineEnd);

              // Extract before, highlighted, and after parts
              const before = state.sliceDoc(lineStart, selectionStart);
              const highlighted = state.sliceDoc(selectionStart, selectionEnd);
              const after = state.sliceDoc(selectionEnd, lineEnd);

              // Only include the line if there's highlighted text
              if (highlighted.trim().length > 0) {
                selectedLines.push(`${line.number}: ${before}<highlighted>${highlighted}</highlighted>${after}`);
              }
            }

            setSelectedText(selectedLines.join("\n"));
          }}
        />

        {/* Floating Run Button */}
        <button
          onClick={compileCode}
          className="outline-none absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center bg-green-600 rounded-full hover:bg-green-500 transition-shadow shadow-md hover:shadow-lg cursor-pointer"
        >
          <Play size={18} />
        </button>
      </div>

      {/* Output Section */}
      <div className="mt-4 bg-(--code-fill) p-3 rounded-sm border border-(--code-stroke) max-h-40 overflow-y-auto">
        <h3 className="text-[14px] font-bold text-(--code-text)">Output:</h3>
        <pre className="text-[13px] text-(--code-text) font-thin whitespace-pre-wrap">{output}</pre>
      </div>

      {/* DELETE LATER -> Demo Selected */}
      {/* <div className="mt-4 bg-gray-800 p-3 rounded-sm border border-gray-600 max-h-20 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-300">Selected Text:</h3>
        <pre className="text-sm text-gray-300 whitespace-pre-wrap">{selectedText || "No selection"}</pre>
      </div> */}
    </div>
  );
}

export default CodeEditor;
