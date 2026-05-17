import { createContext, useState, useEffect } from "react";
import assets from "../assets/assets";

export const Context = createContext();

const ContextProvider = ({ children }) => {
const [selectlang, setSelectlang] = useState("");  // Selected programming language
const [code, setCode] = useState("");  // Monaco editor code storage
const [errorinput, setErrorinput] = useState("");  // Error input state
const [fixedCode, setFixedCode] = useState(""); // Store fixed code from AI response
const [feedback, setFeedback] = useState("");  // Feedback message
const [response, setResponse] = useState({});  // AI response state
const [copyimg, setCopyimg] = useState(assets.Copy); // Copy button image toggle
const [loading, setLoading] = useState(false); // Loading state for async operations
const [output, setOutput] = useState(""); // Output from code execution
const [runLoading, setRunLoading] = useState(false); // Loading state for code execution

// Monaco editor onChange for input panel
const handleeditorchange_input = (value) => {
  setCode(value || "");
};
// Monaco editor onChange for output panel
const handleeditorchange_output = (value) => {
  setFixedCode(value || "");
};

// Debug feedback changes
useEffect(() => {
  if (feedback) {
    console.log(feedback);
  }
}, [feedback]);

// Handle bug fixing
const handlefixbug = () => {
  if (!selectlang) {
    return setFeedback("Please select a language");
  }
  if (!code?.trim()) {
    return setFeedback("Please enter your code");
  }
  if (!errorinput.trim()) {
    return setFeedback("Please enter your error message");
  }
  askAI();
};

// Fetch AI response
async function askAI() {
  try {
    setLoading(true);   // start loading

    const inputdata = `
      1. Detect the programming language from ${code}.
      2. Read ${code} and ${errorinput}.
      3. Identify the bug, fix it, and optimize the code.
      4. Add a short, simple and easy to understand human written comment next to the fixed error line explaining the bug.
      5. Return only the optimized fixed code.
      6. Output only valid JSON.
      7. Do not add extra text like "answer:".
      Format:
      {
        "programming_language": "Detected programming language here",
        "fixed_code_only": "optimized fixed code here, with short comment next to the fixed error line"
      }`;

    const res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputdata,
      }),
    });

    const data = await res.json();
    const parsedResponse = JSON.parse(data.answer);
    setTimeout(() => {
      if (parsedResponse.programming_language.toLowerCase() !== selectlang.toLowerCase()) {
        return setFeedback(`selected language is ${selectlang} but the code is in ${parsedResponse.programming_language}`);
      }
    }, 1000);

    
    setResponse(parsedResponse);
    setFixedCode(parsedResponse.fixed_code_only);
    setFeedback("Bug fixed successfully!");
} 
catch (err) {
    console.error(err);
    setFeedback("Something went wrong");
  }
  finally {
    setLoading(false);   // stop loading
  }
}

// RESET ALL STATES
const newSession = (e)=>{
  e.preventDefault();
  setSelectlang("");
  setCode("");
  setErrorinput("");
  setFeedback("");
  setResponse({});
  setFixedCode("");
  setOutput("");
}

const langMap = {
  javascript: 63,
  python: 71,
  java: 62
}; // Mapping of languages to Judge0 API language IDs

const runCode = async () => {
  setRunLoading(true);
  const response = await fetch(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_code: fixedCode,
        language_id: langMap[selectlang] || 63
      })
    }
  );

  const data = await response.json();

  setOutput(
    data.stdout ||
    data.stderr ||
    data.compile_output ||
    "No output"
  );
  setRunLoading(false);
};

// Handle code copy to clipboard
const handleCopy = () => {
  navigator.clipboard.writeText(fixedCode);
  setTimeout(()=>{
    setCopyimg(assets.Double_tick)
  },500)
  setTimeout(()=>{ 
    setCopyimg(assets.Copy)
   },1000)
};

// Global context values
const contextValue = {
  selectlang,
  setSelectlang,
  code,
  fixedCode,
  errorinput,
  setErrorinput,
  feedback,
  response,
  handlefixbug,
  handleeditorchange_input,
  handleeditorchange_output,
  newSession,
  handleCopy,
  copyimg,
  loading,
  runLoading,
  output,
  runCode,
};

return (
  <Context.Provider value={contextValue}>
    {children}
  </Context.Provider>
);
};

export default ContextProvider;